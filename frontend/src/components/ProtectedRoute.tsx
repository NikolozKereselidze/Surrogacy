import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAdmin?: boolean;
}

const ProtectedRoute = ({ children, isAdmin = false }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/${isAdmin ? "admin-auth" : "auth"}/check`,
          {
            credentials: "include", // This will include the JWT cookie
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.ok) {
          setLoading(false);
        } else {
          // Clear any invalid tokens
          document.cookie = `${
            isAdmin ? "adminToken" : "donorToken"
          }=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          navigate(isAdmin ? "/admin-login" : "/login", {
            state: { from: location.pathname },
          });
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        // Clear any invalid tokens on error
        document.cookie = `${
          isAdmin ? "adminToken" : "donorToken"
        }=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        navigate(isAdmin ? "/admin-login" : "/login", {
          state: { from: location.pathname },
        });
      }
    };

    checkAuth();
  }, [navigate, location, isAdmin]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
};

export default ProtectedRoute;
