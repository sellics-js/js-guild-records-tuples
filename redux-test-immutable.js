
import { createStore } from './redux';

const initialState = {
  people:[
    {
    id: 1,
    name: 'Alex',
    age: 35,
    hobbies: [
        'Chilis', 'Photography', 'Mongolian Throat Singing'
    ]
  }, {
    id: 2,
    name: 'Joe',
    age: 24,
    hobbies: [
        'Beer', 'Pong', 'Beer Pong'
    ]
  },
  {
    id: 3,
    name: 'Bob',
    age: 42,
    hobbies: [
        'Sleep', 'Stamps', 'Knitting'
    ]
  }
  ]
}
// REDUCERS
const people = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH':
    case 'ADD':
    case 'UPDATE': {
      return {
        ...state,
        ...action.value,
      };
    }
    case 'REMOVE': {
      const newState = { ...state };
      delete newState[action.value];
      return newState;
    }
    default:
      return state;
  }
};

// SELECTORS
const getPersonById = (state, id) => state.people.find(el => el.id === id);
const getPersons = state => state.people;
// ACTION CREATORS
const update = item => ({
  type: 'UPDATE',
  value: item
});
// STORE
const store = createStore(people);
let state = store.getState();
let lastItems = getPersons(state);
store.subscribe(() => {
  const newState = store.getState();
  const newItems = getPersons(newState);
  console.log("state changed:", newItems !== lastItems);
  lastItems = newItems;
});

// OUTPUT CURRENT VALUE
state = store.getState();
console.log('STORE CONTENTS', state);
// SELECT PERSON WITH ID 1
let person = getPersonById(state, 1);

console.log('BEFORE UPDATE ACTION');
console.log(person);

// CORRECT UPDATE
person.age = 1;
store.dispatch(update(person));

// OUTPUT CURRENT VALUE
state = store.getState();
person = getPersonById(state, 1);
console.log('AFTER UPDATE ACTION');
console.log(person);

// INCORRECT UPDATE THROUGH STATE MUTATION
person.age = 5;

// OUTPUT CURRENT VALUE
state = store.getState();
person = getPersonById(state, 1);
console.log('AFTER IMPROPER UPDATE');
console.log(person);

