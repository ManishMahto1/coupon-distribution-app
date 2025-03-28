import Link from 'next/link';

export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="mb-4">The page you’re looking for doesn’t exist.</p>
        <Link href="/">
          <a className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Go Home
          </a>
        </Link>
      </div>
    );
  }