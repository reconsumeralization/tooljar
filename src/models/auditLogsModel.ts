
import mongoose from 'mongoose';

const AuditLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  ip: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  }
});

const AuditLogsModel = mongoose.model('AuditLog', AuditLogSchema);

export default AuditLogsModel;

