import { Schema, model } from 'mongoose';

const interestSchema = new Schema({
  senderId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  receiverId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Pending', 'Accepted', 'Rejected'], 
    default: 'Pending' 
  },
  sentAt: { 
    type: Date, 
    default: Date.now 
  },
  respondedAt: { 
    type: Date 
  },
  message: { 
    type: String, 
    maxlength: 500 
  }
});

export default model('Interest', interestSchema);

// import { Schema, model } from 'mongoose';

// const interestSchema = new Schema({
//   from: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   to: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   isRead: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now },
// });

// export default model('Interest', interestSchema);
