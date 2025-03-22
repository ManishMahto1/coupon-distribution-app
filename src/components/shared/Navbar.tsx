import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <span className="ml-2 text-xl font-bold">Coupon App</span>
        </Link>
        <div>
          <Link href="/" className="mr-4 hover:underline">Home</Link>
          <Link href="/admin" className="hover:underline">Admin</Link>
        </div>
      </div>
    </nav>
  );
}