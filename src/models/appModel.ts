```typescript
import mongoose from 'mongoose';

const appSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  workspaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workspace',
    required: true,
  },
  pages: [
    {
      name: String,
      sidebarNavigation: Boolean,
      components: [
        {
          type: String,
          properties: mongoose.Schema.Types.Mixed,
        },
      ],
    },
  ],
  darkMode: {
    type: Boolean,
    default: false,
  },
  globalSearch: Boolean,
  exportImport: Boolean,
  conditionalLogic: Boolean,
  bulkOperations: Boolean,
  emailIntegration: Boolean,
  scheduleTasks: Boolean,
  appTemplates: [String],
  plugins: [String],
  accessControls: [
    {
      app: Boolean,
      row: Boolean,
      column: Boolean,
    },
  ],
  usageTracking: Boolean,
  uiComponentLibraries: [String],
  dragAndDropInterface: Boolean,
  realTimeCollaboration: Boolean,
  roleBasedAccessControl: Boolean,
  versionControl: Boolean,
  shareableLinks: Boolean,
});

const AppModel = mongoose.model('App', appSchema);

export default AppModel;
```
