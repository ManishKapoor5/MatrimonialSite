import mongoose from "mongoose";

const BureauSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: String,
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  email: String,
  contactPerson: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  profilesCreated: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

BureauSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model("Bureau", BureauSchema);
