import React, { useReducer } from "react";
import "../css/calculator.css";
import Digit from "./Digit";
import Operation from "./Operation";
import AllClear from "./AllClear";

export const ACTIONS = {
  CHOOSE_DIGIT: "choose_digit",
  CLEAR: "clear",
  DELETE: "delete",
  CHOOSE_OPERATION: "choose_operation",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.CHOOSE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.currentOperand,
          overwrite: false,
        };
      }

      if (payload.digit === "0" && state.currentOperand === "0") return state;

      if (payload.digit === "." && state.currentOperand.includes("."))
        return state;

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };

    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.DELETE:
      return {
        ...state,
        currentOperand: state.currentOperand.slice(
          0,
          state.currentOperand.length - 1
        ),
      };

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null)
        return state;

      if (state.currentOperand === null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };

    default:
      return;

    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        currentOperand: evaluate(state),
        operation: null,
      };
  }
}

function evaluate({ previousOperand, currentOperand, operation }) {
  const previous = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(previous || current)) return "";
  let result;
  switch (operation) {
    case "+":
      result = previous + current;
      break;
    case "x":
      result = previous * current;
      break;
    case "-":
      result = previous - current;
      break;
    case "÷":
      result = previous / current;
      break;
    default:
      break;
  }

  return result.toString();
}

const Calculator = () => {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );
  return (
    <div className="grid">
      <div className="output-display">
        <div className="previous">
          {previousOperand}
          {operation}
        </div>
        <div className="current">{currentOperand}</div>
      </div>
      <AllClear dispatch={dispatch} />
      <button
        onClick={() => {
          dispatch({ type: ACTIONS.DELETE });
        }}
      >
        DEL
      </button>
      <Operation operation="÷" dispatch={dispatch} />
      <Digit digit="1" dispatch={dispatch} />
      <Digit digit="2" dispatch={dispatch} />
      <Digit digit="3" dispatch={dispatch} />
      <Operation operation="x" dispatch={dispatch} />
      <Digit digit="4" dispatch={dispatch} />
      <Digit digit="5" dispatch={dispatch} />
      <Digit digit="6" dispatch={dispatch} />
      <Operation operation="+" dispatch={dispatch} />
      <Digit digit="7" dispatch={dispatch} />
      <Digit digit="8" dispatch={dispatch} />
      <Digit digit="9" dispatch={dispatch} />
      <Operation operation="-" dispatch={dispatch} />
      <button
        onClick={() => {
          dispatch({ type: ACTIONS.EVALUATE });
        }}
        className="span-two"
      >
        =
      </button>
      <Digit digit="." dispatch={dispatch} />
      <Digit digit="0" dispatch={dispatch} />
    </div>
  );
};

export default Calculator;
