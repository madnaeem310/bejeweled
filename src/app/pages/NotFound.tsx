import { Link } from "react-router";

export function NotFound() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="text-blue-600 hover:underline">
        Go back to home
      </Link>
    </div>
  );
}
