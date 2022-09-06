import React from "react";
import { ACTIONS } from "./Calculator";

const Digit = ({ dispatch, digit }) => {
  return (
    <button
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_DIGIT, payload: { digit } })
      }
    >
      {digit}
    </button>
  );
};

export default Digit;
