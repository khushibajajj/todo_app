import "../LoginPage.scss";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import store from "../../store";
import TodoListCard from "../../components/TodoListCard";
import { API_ENDPOINT, REG_ENDPOINT } from "../../constants";
import "../LoginPage.scss";
import { useNavigate } from "react-router-dom";

const ListPage = (props) => {
  const [userId, setUserId] = useState();
  const state = useSelector((state) => state);

  useEffect(() => {
    fetch(REG_ENDPOINT)
      .then((response) => response.json())
      .then((json) => {
        var accessName = json.find((item) => item.access_token === ab);
        setUserId(accessName);
        fetch(API_ENDPOINT)
          .then((response) => response.json())
          .then((json) => {
            store.dispatch({
              type: "UPDATE_ITEMS",
              payload: json,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
    const ab = localStorage.getItem("accessToken");
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      navigate("/");
    }
  });

  const getRequest = () => {
    fetch(API_ENDPOINT, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        store.dispatch({
          type: "UPDATE_ITEMS",
          payload: json,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const LoginRequest = () => {
    fetch(API_ENDPOINT)
      .then((response) => response.json())
      .then((json) => {
        store.dispatch({
          type: "UPDATE_ITEMS",
          payload: json,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [todo, setTodo] = useState("");

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const postMethod = (todo) => {
    const data = {
      description: todo,
      status: "To do",
      user_id: `${userId._id}`,
    };
    const url = API_ENDPOINT;
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
          type: "ADD_ITEM",
          payload: data,
        });
        getRequest();
        LoginRequest();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addTodoItem = () => {
    if (todo === "") {
      alert("it is empty");
    } else {
      postMethod(todo);
    }
  };

  const filteredItems = () => {
    return state?.CartReducer?.todoItem.filter(
      (item) => item.user_id === userId?._id
    );
  };

  return (
    <div>
      <div>
        <div className="addTodos">
          <input
            placeholder="Add your Todo here"
            type="text"
            onChange={(e) => handleChange(e)}
            className="todo-input"
            value={todo}
          />

          <button className="add-btn" onClick={() => addTodoItem()}>
            Add Todo
          </button>
        </div>
      </div>

      <div>
        {filteredItems().map((item, index) => {
          return <TodoListCard item={item} index={index} />;
        })}
      </div>
      <br />
    </div>
  );
};

export default ListPage;
