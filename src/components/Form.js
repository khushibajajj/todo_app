import "./style.scss";
import { useState } from "react";
import { REG_ENDPOINT } from "../constants";
import store from "../store";
import { useNavigate } from "react-router-dom";

const Form = (props) => {
  const { userData, type } = props;
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpass, setCpass] = useState("");

  const getRequest = () => {
    fetch(REG_ENDPOINT, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        store.dispatch({
          type: "UPDATE_USER",
          payload: json,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const RegisterButtonClick = () => {
    var user = userData.filter(
      (item) => item.username === username && item.password === password
    );
    if (user.length) {
      alert("This user already exists");
      navigate("/login");
    } else if (password !== cpass) {
      alert("Passwords do not match");
    } else if (password.length < 8) {
      alert("Password should be a minimum of 8 letters");
    } else {
      const data = {
        username: username,
        password: password,
        access_token: btoa(`${username}:${password}`),
      };
      const url = REG_ENDPOINT;
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          store.dispatch({
            type: "ADD_USER",
            payload: data,
          });
          getRequest();
        })
        .catch((err) => {
          console.log(err);
        });
      localStorage.clear();
      navigate("/login");
    }
  };

  const loginButtonClick = () => {
    const data = {
      username: username,
      password: password,
      access_token: btoa(`${username}:${password}`),
    };
    if (username && password) {
      fetch(REG_ENDPOINT, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((json) => {
          let accessName = json.filter(
            (item) => item.username === username && item.password === password
          );
          if (accessName.length) {
            localStorage.setItem("accessToken", data.access_token);
            navigate("/list");
          } else {
            alert("register");
            navigate("register");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please fill the details");
    }
  };

  const checkUserName = (e) => {
    setUsername(e.target.value);
  };

  const checkPassword = (e) => {
    setPassword(e.target.value);
  };

  const confirmPassword = (e) => {
    setCpass(e.target.value);
  };

  return (
    <div>
      <div className="row">
        <label>Please enter your Username</label>
        <input
          type="text"
          placeholder="Please enter your username"
          value={username}
          onChange={(e) => checkUserName(e)}
        ></input>
      </div>
      <div className="row">
        <label>Please enter your Password</label>
        <input
          type="password"
          placeholder="Please enter your password"
          value={password}
          onChange={(e) => checkPassword(e)}
        ></input>
      </div>
      {type === "signup" && (
        <div className="row">
          <label>Please enter your Password again</label>
          <input
            type="password"
            placeholder="Please enter your password again"
            value={cpass}
            onChange={(e) => confirmPassword(e)}
          ></input>
        </div>
      )}
      <div className="form-button">
        {type === "signup" ? (
          <button onClick={() => RegisterButtonClick()}>Register</button>
        ) : (
          <button onClick={() => loginButtonClick()}>Login</button>
        )}
      </div>
    </div>
  );
};

export default Form;
