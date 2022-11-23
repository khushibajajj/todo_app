import store from "../store";
import { useState } from "react";
import "./style.scss";
import { API_ENDPOINT } from "../constants";
import { useNavigate } from "react-router-dom";

const TodoListCard = (props) => {
  const { item, index } = props;
  const navigate = useNavigate();

  const todoDelete = (item, index, e) => {
    e.stopPropagation();
    fetch(`${API_ENDPOINT}/${item._id}`, {
      method: "DELETE",
    })
      .then(() => {
        store.dispatch({
          type: "DELETE_ITEM",
          payload: item._id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const data = [
    { id: 0, label: "In Progress" },
    { id: 1, label: "Completed" },
  ];

  const todoClick = () => {
    navigate(`/list/${item._id}`);
  };

  return (
    <div onClick={() => todoClick()} className="todo-list-card">
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
          <button onClick={(event) => todoDelete(item, index, event)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoListCard;

export const Dropdown = (props) => {
  const { data, todoContent } = props;
  const [isOpen, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setOpen(!isOpen);
  };

  const handleItemClick = (id, item, event) => {
    event.stopPropagation();
    selectedItem === id ? setSelectedItem(null) : setSelectedItem(id);
    let obj = {
      description: todoContent.description,
      status: item.label,
      user_id: todoContent.user_id,
    };
    fetch(`${API_ENDPOINT}/${todoContent._id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedItem
          ? data.filter(
              (ite, index) => ite.id === parseInt(selectedItem)
            )[0].label
          : todoContent.status}
        <i className={`fa fa-chevron-right icon ${isOpen && "open"}`}></i>
      </div>
      <div className={`dropdown-body ${isOpen && "open"}`}>
        {data.map((item, index) => (
          <div
            className="dropdown-item"
            onClick={(e) => handleItemClick(e.target.id, item, e)}
            id={item.id}
          >
            <span
              className={`dropdown-item-dot ${
                item.id === selectedItem && "selected"
              }`}
            >
              •{" "}
            </span>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};
