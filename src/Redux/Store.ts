import { companiesReducer } from "./CompanyAppState";
import { combineReducers, createStore } from "redux";
import { customersReducer } from "./CustomerAppState";
import { couponsReducer } from "./CouponAppState";
import { purchasesReducer } from "./PurchaseAppState";

//Multiple Reducers
const reducers = combineReducers({
  companiesReducer: companiesReducer,
  customersReducer: customersReducer,
  couponsReducer: couponsReducer,
  purchasesReducer: purchasesReducer,
});
const store = createStore(reducers);

export default store;
