import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
  },
  { minimize: false }
);
//When you set minimize: false, Mongoose will retain empty objects in your documents. This can be useful in scenarios where you want to ensure a field is always present in your documents, even if it's an empty object.

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
