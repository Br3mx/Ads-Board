import AdForm from "../../features/AdForm";
import { API_URL } from "../../../config";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getLoggedUser } from "../../../redux/userRedux";

const AddAd = () => {
  const [user, setUser] = useState(null);
  const loggedUser = useSelector(getLoggedUser);

  fetch(`${API_URL}/auth/user`)
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        return setUser("users");
      } else {
        setUser(null);
        throw new Error("Failed");
      }
    })

    .catch((e) => {
      console.log(e);
    });
  return (
    <div>
      <p className="text-center">AddAd</p>
      {loggedUser ? <AdForm /> : <p>You are not authorized</p>}
    </div>
  );
};

export default AddAd;
