//selectors

//actions
const createActionName = (actionName) => `app/users/${actionName}`;

//action creators

const usersReducer = (statePart = [], action) => {
  switch (action.type) {
    default:
      return statePart;
  }
};

export default usersReducer;
