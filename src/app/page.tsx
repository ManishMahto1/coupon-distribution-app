import CouponCard from "@/components/guest/CouponCard";

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Welcome to Coupon Distribution</h1>
      <CouponCard />
    </div>
  );
}