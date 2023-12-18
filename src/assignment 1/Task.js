import React, { useRef, useState } from "react";
import "./TaskStyles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Task = () => {
  const list = [
    {
      id: 1,
      name: "Javascript",
      price: "1",
      completed: false,
    },
    {
      id: 2,
      name: "React js",
      price: "1",
      completed: false,
    },
  ];
  const [lists, setList] = useState(list);
  const [updateState, setUpdateState] = useState(-1);

  function handleEdit(id) {
    setUpdateState(id);
  }

  const deleteFun = () =>
    toast.success("🦄 Skills Deleted Successfully", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  function handleDelete(id) {
    const newlist = lists.filter((li) => li.id !== id);
    setList(newlist);
    deleteFun();
  }

  function handleToggleComplete(id) {
    const updatedLists = lists.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setList(updatedLists);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const price = event.target.elements.price.value;

    const newlist = lists.map((li) =>
      li.id === updateState ? { ...li, name: name, price: price } : li
    );

    setList(newlist);
    setUpdateState(-1);
  }

  return (
    <div className="crud">
      <div>
        <AddList setList={setList} lists={lists} />
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              {lists.map((current) =>
                updateState === current.id ? (
                  <EditList
                    key={current.id}
                    current={current}
                    lists={lists}
                    setList={setList}
                    setUpdateState={setUpdateState}
                  />
                ) : (
                  <tr key={current.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={current.completed}
                        onChange={() => handleToggleComplete(current.id)}
                      />
                    </td>
                    <td>{current.name}</td>
                    <td>{current.price}</td>
                    <td>
                      <button
                        className="edit delete"
                        onClick={() => handleEdit(current.id)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="delete"
                        type="button"
                        onClick={() => handleDelete(current.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

function EditList({ current, lists, setList, setUpdateState }) {
  function handInputname(event) {
    const value = event.target.value;
    const newlist = lists.map((li) =>
      li.id === current.id ? { ...li, name: value } : li
    );

    setList(newlist);
  }

  function handInputprice(event) {
    const value = event.target.value;
    const newlist = lists.map((li) =>
      li.id === current.id ? { ...li, price: value } : li
    );

    setList(newlist);
  }

  function handleUpdate(event) {
    event.preventDefault();
    // Logic for update if needed
    setUpdateState(-1);
  }

  return (
    <tr key={current.id}>
      <td>
        <input
          type="text"
          onChange={handInputname}
          name="name"
          value={current.name}
        />
      </td>
      <td>
        <input
          type="text"
          onChange={handInputprice}
          name="price"
          value={current.price}
        />
      </td>
      <td>
        <button onClick={handleUpdate}>Update</button>
      </td>
    </tr>
  );
}

function AddList({ setList, lists }) {
  const nameRef = useRef();
  const priceRef = useRef();
  const newId = lists.length + 1;

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const price = event.target.elements.price.value;
    const newlist = {
      id: newId,
      name,
      price,
      completed: false,
    };
    setList((prevList) => {
      return [...prevList, newlist];
    });
    nameRef.current.value = "";
    priceRef.current.value = "";
  }

  const notify = () =>
    toast.success("🦄 Skills Added Successfully", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  return (
    <div className="addContainer wrapper">
      <form className="addForm" onSubmit={handleSubmit}>
        <h1>Add Skills</h1>
        <div className="input-box">
          <input
            type="text"
            name="name"
            placeholder="Enter Skills"
            ref={nameRef}
          />
        </div>
        <div className="input-box">
          <input
            type="text"
            name="price"
            placeholder="Enter Experience"
            ref={priceRef}
          />
        </div>
        <div className="end">
          <button className="btn" type="submit" onClick={notify}>
            Add
          </button>
          <ToastContainer />
        </div>
      </form>
    </div>
  );
}

export default Task;
