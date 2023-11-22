
import mongoose from 'mongoose';

const accessControlSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  permissions: {
    app: {
      type: Boolean,
      default: false,
    },
    row: {
      type: Boolean,
      default: false,
    },
    column: {
      type: Boolean,
      default: false,
    },
  },
});

const AccessControl = mongoose.model('AccessControl', accessControlSchema);

export default AccessControl;
