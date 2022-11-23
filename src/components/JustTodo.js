import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../constants";
import store from "../store";
import { useParams } from "react-router-dom";
import { Dropdown } from "./TodoListCard";
import { useNavigate } from "react-router-dom";

const JustTodo = () => {
  const navigate = useNavigate();
  const [item, setItem] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch(`${API_ENDPOINT}/${id}`)
      .then((response) => response.json())
      .then((json) => {
        setItem(json);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const data = [
    { id: 0, label: "In Progress" },
    { id: 1, label: "Completed" },
  ];

  const todoDelete = (item) => {
    fetch(`${API_ENDPOINT}/${item._id}`, {
      method: "DELETE",
    })
      .then((response) => {
        store.dispatch({
          type: "DELETE_ITEM",
          payload: item._id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/list");
  };

  const onBackClick = () => {
    navigate("/list");
  };

  const logoutClick = () => {
    navigate("/login");
    localStorage.clear();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={() => onBackClick()}>Back</button>
        <button style={{ marginRight: "1rem" }} onClick={() => logoutClick()}>
          Logout
        </button>
      </div>
      <div className="todo-list-card">
        <div
          style={{
            justifyContent: "space-between",
            display: "flex",
            alignItems: "center",
          }}
        >
          <h4 style={{ overflowWrap: "anywhere", paddingRight: "0.5rem" }}>
            {item?.description}
          </h4>
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "3rem" }}>
              <Dropdown data={data} todoContent={item} />
            </div>
            <button onClick={(event) => todoDelete(item)}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JustTodo;
