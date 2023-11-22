
import mongoose from 'mongoose';

const collaborationSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Collaboration = mongoose.model('Collaboration', collaborationSchema);

export default Collaboration;
