# Security Policy

## Overview

This document outlines the security features implemented in this application and provides guidance for reporting security vulnerabilities.

## Implemented Security Features

### 1. Authentication & Authorization

#### JWT Token Authentication
- **Location**: `src/middleware/auth.ts`
- **Features**:
  - Secure JWT token validation
  - Timing-attack resistant token comparison using `crypto.timingSafeEqual()`
  - Token expiration (24-hour default)
  - Proper error handling without information disclosure

#### API Key Authentication
- **Location**: `src/middleware/auth.ts`
- **Features**:
  - Header-based API key authentication (`X-API-Key`)
  - Timing-safe comparison to prevent timing attacks
  - No key exposure in error messages

### 2. Input Validation & Sanitization

#### Request Sanitization
- **Location**: `src/middleware/validation.ts`
- **Protections**:
  - NoSQL injection prevention (MongoDB operator filtering)
  - Prototype pollution protection
  - Null byte removal
  - Control character filtering
  - ObjectId format validation

#### Path Traversal Protection
- **Location**: `src/middleware/validation.ts`
- **Features**:
  - Path traversal pattern detection (`../`, `..\\`)
  - Absolute path restriction
  - Null byte detection in file paths
  - Applied to import/export operations

### 3. Rate Limiting

#### Global Rate Limiting
- **Location**: `src/middleware/rateLimiter.ts`
- **Configuration**:
  - API endpoints: 100 requests per 15 minutes
  - Email sending: 10 emails per hour per IP/recipient
  - Strict limiting for sensitive endpoints: 5 requests per 15 minutes
  - Custom rate limit headers included in responses

### 4. Security Headers

#### Helmet.js Integration
- **Location**: `src/index.ts`
- **Headers Applied**:
  - Content Security Policy (CSP)
  - HTTP Strict Transport Security (HSTS) - 1 year max-age
  - X-Content-Type-Options: nosniff
  - X-Frame-Options: DENY
  - Referrer-Policy: strict-origin-when-cross-origin
  - XSS Filter enabled

### 5. CORS Configuration

#### Production-Ready CORS
- **Location**: `src/index.ts`
- **Features**:
  - Configurable allowed origins via environment variable
  - Wildcard (*) allowed only in development
  - Credentials support enabled
  - Environment-aware configuration

### 6. Error Handling

#### Secure Error Messages
- **Location**: `src/middleware/errorHandler.ts`
- **Protections**:
  - Error message sanitization in production
  - Whitelisted safe error messages
  - Stack traces only in development
  - Centralized error logging
  - No internal implementation details exposed

### 7. Email Security

#### Email Validation
- **Location**: `src/models/emailModel.ts`, `src/controllers/emailController.ts`
- **Features**:
  - Email format validation
  - Subject length limits (200 characters)
  - Message length limits (10,000 characters)
  - Open relay prevention
  - Rate limiting per recipient

### 8. Database Security

#### NoSQL Injection Prevention
- **Packages**: `express-mongo-sanitize`
- **Controllers**: All controllers updated with:
  - ObjectId validation before database queries
  - Input sanitization middleware
  - Mongoose validators enabled
  - Safe query construction

### 9. Data Sanitization

#### Request Body Sanitization
- **Location**: `src/index.ts`
- **Features**:
  - MongoDB operator removal (`$`, `$where`, etc.)
  - Automatic logging of sanitization events
  - Body size limits (10MB)

## Vulnerability Classes Mitigated

| Vulnerability Type | Mitigation Strategy | Location |
|-------------------|---------------------|----------|
| NoSQL Injection | ObjectId validation, input sanitization | All controllers, validation middleware |
| Timing Attacks | crypto.timingSafeEqual() for token comparison | auth.ts:32 |
| Path Traversal | Path validation, pattern detection | validation.ts:87, importExportController.ts:34 |
| Email Injection | Email format validation, rate limiting | emailModel.ts:33, emailController.ts:17 |
| XSS | CSP headers, input sanitization | index.ts:35-52 |
| CSRF | CORS configuration, token validation | index.ts:55-62 |
| Information Disclosure | Error message sanitization | errorHandler.ts:27 |
| Brute Force | Rate limiting on all endpoints | rateLimiter.ts |
| Prototype Pollution | Request body sanitization | validation.ts:67 |
| DoS | Rate limiting, body size limits | index.ts:65 |

## Environment Configuration

### Required Environment Variables

```bash
# See .env.example for complete configuration
NODE_ENV=production
JWT_SECRET=<strong_random_secret>
API_KEY=<strong_random_key>
ALLOWED_ORIGINS=<comma_separated_domains>
```

### Generating Secure Secrets

```bash
# Generate JWT secret (64 bytes)
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Generate API key (32 bytes)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Security Best Practices

### For Developers

1. **Never commit sensitive data**
   - Use `.env` for secrets (already in `.gitignore`)
   - Reference `.env.example` for required variables

2. **Always validate user input**
   - Use provided validation middleware
   - Validate ObjectIds before database queries
   - Sanitize file paths before file operations

3. **Use provided error handlers**
   - Wrap async routes with `catchAsync()`
   - Throw `AppError` for operational errors
   - Let global error handler manage responses

4. **Apply authentication middleware**
   ```typescript
   import { authenticateToken } from '../middleware/auth';
   router.get('/protected', authenticateToken, controller.method);
   ```

5. **Test security features**
   - Verify rate limiting works
   - Test error message sanitization
   - Validate input sanitization

### For Production Deployment

1. **Set NODE_ENV=production**
2. **Use strong secrets** (see generation commands above)
3. **Configure ALLOWED_ORIGINS** to specific domains
4. **Enable HTTPS** (required for security headers)
5. **Implement logging** for security events
6. **Regular security updates** for dependencies

## Reporting Security Vulnerabilities

### Responsible Disclosure

If you discover a security vulnerability, please report it responsibly:

1. **Email**: reconsumeralization@gmail.com
2. **Subject**: `[SECURITY] Vulnerability Report - tooljar`
3. **Include**:
   - Vulnerability description
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if available)

### What to Expect

- **Acknowledgment**: Within 48 hours
- **Assessment**: Within 7 days
- **Fix Timeline**: Based on severity
  - Critical: 24-48 hours
  - High: 7 days
  - Medium: 30 days
  - Low: 90 days

### Security Credits

Contributors who report valid security vulnerabilities will be credited in:
- This SECURITY.md file
- Release notes
- Acknowledgments section

## Security Testing

### Recommended Testing Tools

- **Static Analysis**: ESLint with security plugins
- **Dependency Scanning**: `npm audit`
- **OWASP ZAP**: Web application security scanner
- **Burp Suite**: Manual penetration testing

### Running Security Checks

```bash
# Check for vulnerable dependencies
npm audit

# Fix automatically where possible
npm audit fix

# Generate audit report
npm audit --json > audit-report.json
```

## Security Checklist

### Before Production Deployment

- [ ] All environment variables configured with strong values
- [ ] `.env` file not committed to version control
- [ ] HTTPS enabled
- [ ] CORS restricted to specific origins
- [ ] Rate limiting tested and working
- [ ] Error messages sanitized (no stack traces)
- [ ] Database credentials secured
- [ ] Security headers verified
- [ ] Authentication middleware applied to protected routes
- [ ] Input validation on all user inputs
- [ ] `npm audit` shows no high/critical vulnerabilities

## Security Updates Log

### 2025-11-09 - Initial Security Hardening
- ✅ Implemented JWT authentication with timing-attack resistance
- ✅ Added comprehensive input validation and sanitization
- ✅ Implemented rate limiting (API, email, strict)
- ✅ Added security headers (Helmet.js)
- ✅ Fixed NoSQL injection vulnerabilities
- ✅ Added path traversal protection
- ✅ Implemented secure error handling
- ✅ Added email validation and rate limiting
- ✅ Configured production-ready CORS
- ✅ Generated strong JWT and API secrets

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [Helmet.js Documentation](https://helmetjs.github.io/)

## License

This security documentation is part of the tooljar project and follows the same ISC license.
