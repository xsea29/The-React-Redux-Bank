import { combineReducers, createStore } from "redux";

const initialstate = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};
const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

function accountReducer(state = initialstate, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + state.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - state.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: state.balance + action.payload.amount,
        loanPurpose: action.payload.purpose,
      };

    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer": {
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    }
    case "customer/updateCustomer": {
      return {
        ...state,
        fullName: action.payload.fullName,
      };
    }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

function deposit(amount) {
  return { type: "account/deposit", payload: 500 };
}
// store.dispatch(deposit(500));

function widthraw(amount) {
  return { type: "account/widthraw", payload: 500 };
}

// store.dispatch(widthraw(200));

function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}

// store.dispatch(requestLoan(200, "Buy a cheap Car"));

function payLoan() {
  return { type: "account/payLoan" };
}

// store.dispatch(payLoan());

function CreateCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}
