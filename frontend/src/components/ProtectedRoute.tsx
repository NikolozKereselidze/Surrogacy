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
    const checkSession = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/${isAdmin ? "admin-auth" : "auth"}/check`,
          {
            credentials: "include",
          }
        );

        if (res.ok) {
          setLoading(false);
        } else {
          navigate(isAdmin ? "/admin-login" : "/login", {
            state: { from: location.pathname },
          });
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        navigate(isAdmin ? "/admin-login" : "/login", {
          state: { from: location.pathname },
        });
      }
    };

    checkSession();
  }, [navigate, location, isAdmin]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
};

export default ProtectedRoute;
