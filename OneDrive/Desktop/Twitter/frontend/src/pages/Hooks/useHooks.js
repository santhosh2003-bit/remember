import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const useHooks = () => {
  const [loggedUser, setLoggedUser] = useState({});
  const [user] = useAuthState(auth);
  const email = user?.email;
  // console.log(user);
  useEffect(() => {
    fetch(`http://localhost:5000/logged?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        setLoggedUser(data);
      });
  }, [email]);
  return [loggedUser, setLoggedUser];
};

export default useHooks;
