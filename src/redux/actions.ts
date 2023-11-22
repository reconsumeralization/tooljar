```typescript
// src/redux/actions.ts

// Define action types
export const ActionTypes = {
  SET_AUDIT_LOGS: 'SET_AUDIT_LOGS',
  SET_WORKSPACES: 'SET_WORKSPACES',
  SET_APPS: 'SET_APPS',
  SET_SEARCH: 'SET_SEARCH',
  SET_IMPORT_EXPORT: 'SET_IMPORT_EXPORT',
  SET_BULK_OPERATIONS: 'SET_BULK_OPERATIONS',
  SET_EMAIL: 'SET_EMAIL',
  SET_TASKS: 'SET_TASKS',
  SET_ACCESS_CONTROL: 'SET_ACCESS_CONTROL',
  SET_USAGE_TRACKING: 'SET_USAGE_TRACKING',
  SET_UI: 'SET_UI',
  SET_COLLABORATION: 'SET_COLLABORATION',
  SET_VERSION_CONTROL: 'SET_VERSION_CONTROL',
  SET_LINK_GENERATOR: 'SET_LINK_GENERATOR',
};

// Define action creators
export function setAuditLogs(auditLogs) {
  return { type: ActionTypes.SET_AUDIT_LOGS, payload: auditLogs };
}

export function setWorkspaces(workspaces) {
  return { type: ActionTypes.SET_WORKSPACES, payload: workspaces };
}

export function setApps(apps) {
  return { type: ActionTypes.SET_APPS, payload: apps };
}

export function setSearch(search) {
  return { type: ActionTypes.SET_SEARCH, payload: search };
}

export function setImportExport(importExport) {
  return { type: ActionTypes.SET_IMPORT_EXPORT, payload: importExport };
}

export function setBulkOperations(bulkOperations) {
  return { type: ActionTypes.SET_BULK_OPERATIONS, payload: bulkOperations };
}

export function setEmail(email) {
  return { type: ActionTypes.SET_EMAIL, payload: email };
}

export function setTasks(tasks) {
  return { type: ActionTypes.SET_TASKS, payload: tasks };
}

export function setAccessControl(accessControl) {
  return { type: ActionTypes.SET_ACCESS_CONTROL, payload: accessControl };
}

export function setUsageTracking(usageTracking) {
  return { type: ActionTypes.SET_USAGE_TRACKING, payload: usageTracking };
}

export function setUI(ui) {
  return { type: ActionTypes.SET_UI, payload: ui };
}

export function setCollaboration(collaboration) {
  return { type: ActionTypes.SET_COLLABORATION, payload: collaboration };
}

export function setVersionControl(versionControl) {
  return { type: ActionTypes.SET_VERSION_CONTROL, payload: versionControl };
}

export function setLinkGenerator(linkGenerator) {
  return { type: ActionTypes.SET_LINK_GENERATOR, payload: linkGenerator };
}
```
