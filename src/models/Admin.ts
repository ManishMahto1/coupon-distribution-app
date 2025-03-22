import mongoose from "mongoose";

/* export interface IAdmin extends Document {
  username: string;
  password: string;
} */


const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.models.Admin || mongoose.model("Admin", adminSchema);