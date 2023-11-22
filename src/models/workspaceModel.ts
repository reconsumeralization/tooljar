```typescript
import mongoose from 'mongoose';

const workspaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // Add other workspace properties here
});

const Workspace = mongoose.model('Workspace', workspaceSchema);

export default Workspace;
```
