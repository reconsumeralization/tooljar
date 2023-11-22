```typescript
import mongoose from 'mongoose';

const UsageTrackingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  feature: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  workspaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workspace',
    required: true
  },
  appId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'App',
    required: true
  }
});

const UsageTrackingModel = mongoose.model('UsageTracking', UsageTrackingSchema);

export default UsageTrackingModel;
```
