// src/app/model/Session.js
import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  session_token: {
    type: String,
    required: true
  },
  expired_at: {
    type: Date,
    required: true
  }
});

// const Session = mongoose.model('Session', sessionSchema);
const Session = mongoose.models.Session || mongoose.model('Session', sessionSchema);

export { Session };
