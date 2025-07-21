import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/auth/check", {
          credentials: "include",
        });

        if (res.ok) {
          setLoading(false);
        } else {
          navigate("/login", { state: { from: location.pathname } });
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        navigate("/login", { state: { from: location.pathname } });
      }
    };

    checkSession();
  }, [navigate, location]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
};

export default ProtectedRoute;
