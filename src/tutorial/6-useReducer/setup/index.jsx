import React, { useState, useReducer, cloneElement } from "react";
import Modal from "./Modal";
import { data } from "../../../data";
// reducer function
const reducer = (state, action) => {
  console.log("state", state);
  console.log("action", action);
  if (action.type === "ADD_ITEM") {
    const newPeople = [...state.people, action.payload];
    return {
      ...state,
      people: newPeople,
      isModalOpen: true,
      modalContent: "Item Added",
    };
  }

  if (action.type === "NO_VALUE") {
    return {
      ...state,
      isModalOpen: true,
      modalContent: "Please enter value",
    };
  }

  if (action.type === "CLOSE_MODAL") {
    return { ...state, isModalOpen: false };
  }
  throw new Error("no matching action type");
};

const defaultState = {
  people: [],
  isModalOpen: false,
  modalContent: "Hello World",
};

const Index = () => {
  const [name, seName] = useState("");
  const [state, dispatch] = useReducer(reducer, defaultState);
  function handleSubmit(e) {
    e.preventDefault();
    if (name) {
      const newItem = { id: new Date().getTime().toString(), name };
      dispatch({ type: "ADD_ITEM", payload: newItem });
    } else {
      dispatch({ type: "NO_VALUE" });
    }
  }

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  return (
    <>
      {state.isModalOpen && (
        <Modal closeModal={closeModal} modalContent={state.modalContent} />
      )}
      <form onSubmit={handleSubmit} className="form">
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => seName(e.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
      {state.people.map((person) => {
        return (
          <div key={person.id}>
            <h4>{person.name}</h4>
          </div>
        );
      })}
    </>
  );
};

export default Index;
