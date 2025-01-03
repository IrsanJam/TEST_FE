import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }:any) => {
  const token = Cookies.get('authToken'); // Check for auth token
  const { pathname } = useLocation(); // Get the current path

  // Define protected routes
  const authProtected = ['/404'];
  const protectedByToken = [
    /^\/detail\/[a-zA-Z0-9]+$/, // Matches routes like /detail/5wy8s8oi
    '/main',
    /^\/preview\/[a-zA-Z0-9]+$/, // Matches routes like /preview/5wy8s8oi
    '/m',
  ];

  // Redirect authenticated users from `/` to `/main`
  if (pathname === '/' && token) {
    return <Navigate to="/main" replace />;
  }

  // Redirect unauthenticated users from protected routes
  const isProtectedRoute = protectedByToken.some((pattern) =>
    typeof pattern === 'string' ? pattern === pathname : pattern.test(pathname)
  );

  if (isProtectedRoute && !token) {
    return <Navigate to="/" replace />;
  }

  // Handle authProtected routes
  if (authProtected.includes(pathname)) {
    if (token) return <Navigate to="/main" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;