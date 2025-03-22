export interface Coupon {
  _id: string;
  code: string;
  isActive: boolean;
  claimed: boolean;
  claimedAt?: string;
  claimedByIp?: string;
  claimedBySession?: string;
  createdAt: string;
}

export interface ClaimHistory {
  _id: string;
  couponCode: string;
  ip: string;
  sessionId: string;
  timestamp: string;
}

export interface Admin {
  _id: string;
  username: string;
  password: string;
}