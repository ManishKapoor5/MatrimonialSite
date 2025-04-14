import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true, // This should hold the image URL
  },
}, {
  timestamps: true,
});

const Image = mongoose.model('Image', ImageSchema);
export default Image;