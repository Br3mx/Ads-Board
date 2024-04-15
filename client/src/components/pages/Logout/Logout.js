import { useDispatch } from "react-redux";
import { API_URL } from "../../../config";
import { logOut } from "../../../redux/userRedux.js";
import { useEffect } from "react";

const Logout = () => {
  const dipstach = useDispatch();

  useEffect(() => {
    const options = {
      method: "DELETE",
    };
    fetch(`${API_URL}/logout`, options).then(() => {
      dipstach(logOut());
    });
  }, [dipstach]);
  return null;
};

export default Logout;
