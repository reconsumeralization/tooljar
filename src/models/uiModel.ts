```typescript
import mongoose from 'mongoose';

const uiSchema = new mongoose.Schema({
  darkMode: {
    type: Boolean,
    default: false,
  },
  theme: {
    type: String,
    default: 'default',
  },
  sidebarNavigation: {
    type: Boolean,
    default: true,
  },
  globalSearch: {
    type: Boolean,
    default: true,
  },
  dragAndDropInterface: {
    type: Boolean,
    default: true,
  },
});

const UIModel = mongoose.model('UI', uiSchema);

class UIModelClass {
  public getUISettings(callback: any) {
    UIModel.find({}, callback);
  }

  public updateUISettings(newSettings: any, callback: any) {
    UIModel.findOneAndUpdate({}, newSettings, { new: true }, callback);
  }
}

export const uiModel = new UIModelClass();
```
