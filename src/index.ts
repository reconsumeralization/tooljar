
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import dotenv from 'dotenv';

import auditLogsRoutes from './routes/auditLogsController';
import workspaceRoutes from './routes/workspaceController';
import appRoutes from './routes/appController';
import searchRoutes from './routes/searchController';
import importExportRoutes from './routes/importExportController';
import bulkOperationsRoutes from './routes/bulkOperationsController';
import emailRoutes from './routes/emailController';
import taskRoutes from './routes/taskController';
import accessControlRoutes from './routes/accessControlController';
import usageTrackingRoutes from './routes/usageTrackingController';
import uiRoutes from './routes/uiController';
import collaborationRoutes from './routes/collaborationController';
import versionControlRoutes from './routes/versionControlController';
import linkGeneratorRoutes from './routes/linkGeneratorController';

// Import security middleware
import { apiRateLimiter } from './middleware/rateLimiter';
import { sanitizeRequestBody } from './middleware/validation';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Security middleware - Applied first
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:'],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  noSniff: true,
  xssFilter: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
}));

// CORS configuration - Restrict to specific origins in production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? process.env.ALLOWED_ORIGINS?.split(',') || []
    : '*',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parsing with size limits
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Sanitize data to prevent NoSQL injection
app.use(mongoSanitize({
  replaceWith: '_',
  onSanitize: ({ req, key }) => {
    console.warn(`Sanitized key: ${key} in request from ${req.ip}`);
  }
}));

// Apply request sanitization
app.use(sanitizeRequestBody);

// Apply rate limiting to all API routes
app.use('/api/', apiRateLimiter);

// API Routes
app.use('/api/audit-logs', auditLogsRoutes);
app.use('/api/workspaces', workspaceRoutes);
app.use('/api/apps', appRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/import-export', importExportRoutes);
app.use('/api/bulk-operations', bulkOperationsRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/access-control', accessControlRoutes);
app.use('/api/usage-tracking', usageTrackingRoutes);
app.use('/api/ui', uiRoutes);
app.use('/api/collaboration', collaborationRoutes);
app.use('/api/version-control', versionControlRoutes);
app.use('/api/link-generator', linkGeneratorRoutes);

// 404 handler - Must be after all routes
app.use(notFoundHandler);

// Global error handler - Must be last
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Intooljar server is running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Security features enabled: Helmet, CORS, Rate Limiting, Input Sanitization`);
});

export default app;
