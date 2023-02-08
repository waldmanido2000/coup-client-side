import { companiesReducer } from "./CompanyAppState";
import { combineReducers, createStore } from "redux";
import { customersReducer } from "./CustomerAppState";
import { couponsReducer } from "./CouponAppState";

//Multiple Reducers
const reducers = combineReducers({
  companiesReducer: companiesReducer,
  customersReducer: customersReducer,
  couponsReducer: couponsReducer,
});
const store = createStore(reducers);

export default store;
