import { useNavigate } from "react-router-dom";

import { useEffect } from "react";

import Cookies from "js-cookie";

function PrivateRoute({ component  }) {

  const navigate = useNavigate();

  const token = Cookies.get("token");

  useEffect(() => {

    if (!token) {
      navigate("/");
    }
  }, []);

  return token ? component : navigate("/login");
}

export default PrivateRoute;
