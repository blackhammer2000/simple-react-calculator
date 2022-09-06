import React from "react";
import { ACTIONS } from "./Calculator";

const AllClear = ({ dispatch }) => {
  return (
    <button
      className="span-two"
      onClick={() => dispatch({ type: ACTIONS.CLEAR })}
    >
      AC
    </button>
  );
};

export default AllClear;
