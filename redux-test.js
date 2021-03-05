import expect from 'expect';
import { createStore } from './redux.js';

const counter = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT": 
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
  return state;
}
const store = createStore(counter);

expect(counter(0, {type: "INCREMENT"})).toEqual(1);

expect(counter(1, {type: "INCREMENT"})).toEqual(2);

expect(counter(2, {type: "DECREMENT"})).toEqual(1);

expect(counter(1, {type: "DECREMENT"})).toEqual(0);

expect(counter(1, {type: "SOMETHING"})).toEqual(1);

expect(counter(undefined, {})).toEqual(0);

console.log("All tests passed.");