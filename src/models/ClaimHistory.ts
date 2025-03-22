import mongoose from "mongoose";

const claimHistorySchema = new mongoose.Schema({
  couponCode: { type: String, required: true },
  ip: { type: String, required: true },
  sessionId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.ClaimHistory || mongoose.model("ClaimHistory", claimHistorySchema);