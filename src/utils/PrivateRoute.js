import { useNavigate } from "react-router-dom";

import { useEffect } from "react";

function PrivateRoute({ component  }) {

  const navigate = useNavigate();

  const token = localStorage.getItem("token")

  useEffect(() => {

    if (!token) {
      navigate("/");
    }
  }, []);

  return token ? component : navigate("/login");
}

export default PrivateRoute;
