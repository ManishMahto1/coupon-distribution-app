export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white p-4 mt-auto">
        <div className="container mx-auto text-center">
          <p>© {new Date().getFullYear()} Coupon Distribution App. All rights reserved.</p>
        </div>
      </footer>
    );
  }