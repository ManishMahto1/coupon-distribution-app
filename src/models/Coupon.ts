// src/models/Coupon.ts
import mongoose from 'mongoose';

const CouponSchema = new mongoose.Schema({
  code: { 
    type: String, 
    required: true, 
    unique: true 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  isClaimed: { 
    type: Boolean, 
    default: false 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  claimedAt: { 
    type: Date 
  },
  claimedByIp: {
      type: String 
  
  },
  claimedBySession:{
    type: String 
  }
});

export default mongoose.models.Coupon || mongoose.model('Coupon', CouponSchema);