```typescript
// src/redux/reducers.ts

import { ActionTypes } from './actions';

const initialState = {
  auditLogs: [],
  workspaces: [],
  apps: [],
  search: {},
  importExport: {},
  bulkOperations: {},
  email: {},
  tasks: [],
  accessControl: {},
  usageTracking: {},
  ui: {},
  collaboration: {},
  versionControl: {},
  linkGenerator: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_AUDIT_LOGS:
      return {
        ...state,
        auditLogs: action.payload,
      };
    case ActionTypes.SET_WORKSPACES:
      return {
        ...state,
        workspaces: action.payload,
      };
    case ActionTypes.SET_APPS:
      return {
        ...state,
        apps: action.payload,
      };
    case ActionTypes.SET_SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    case ActionTypes.SET_IMPORT_EXPORT:
      return {
        ...state,
        importExport: action.payload,
      };
    case ActionTypes.SET_BULK_OPERATIONS:
      return {
        ...state,
        bulkOperations: action.payload,
      };
    case ActionTypes.SET_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case ActionTypes.SET_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case ActionTypes.SET_ACCESS_CONTROL:
      return {
        ...state,
        accessControl: action.payload,
      };
    case ActionTypes.SET_USAGE_TRACKING:
      return {
        ...state,
        usageTracking: action.payload,
      };
    case ActionTypes.SET_UI:
      return {
        ...state,
        ui: action.payload,
      };
    case ActionTypes.SET_COLLABORATION:
      return {
        ...state,
        collaboration: action.payload,
      };
    case ActionTypes.SET_VERSION_CONTROL:
      return {
        ...state,
        versionControl: action.payload,
      };
    case ActionTypes.SET_LINK_GENERATOR:
      return {
        ...state,
        linkGenerator: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
```
