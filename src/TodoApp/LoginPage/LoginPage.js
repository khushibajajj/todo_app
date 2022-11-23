import FormHeader from "../../components/FormHeader";
import Form from "../../components/Form";
import "../LoginPage.scss";
import { useEffect } from "react";
import { REG_ENDPOINT } from "../../constants";
import store from "../../store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = (type) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/list");
    }
  });
  const [userData, setUserData] = useState([]);

  const getRequest = () => {
    fetch(REG_ENDPOINT, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        store.dispatch({
          type: "UPDATE_ITEMS",
          payload: json,
        });
        setUserData(json);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRequest();
  }, []);

  return (
    <div className="loginform">
      {type.type === "signup" ? (
        <FormHeader title="Register Page" />
      ) : (
        <FormHeader title="Login Page" />
      )}
      <Form type={type.type} userData={userData} />
    </div>
  );
};

export default LoginPage;
