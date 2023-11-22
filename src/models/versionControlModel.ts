```typescript
import mongoose from 'mongoose';

const versionControlSchema = new mongoose.Schema({
  version: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  changes: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  app: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'App',
    required: true,
  },
});

const VersionControlModel = mongoose.model('VersionControl', versionControlSchema);

export default VersionControlModel;
```
