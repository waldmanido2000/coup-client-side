import { companiesReducer } from "./CompanyAppState";
import { combineReducers,createStore } from "redux";
import { customersReducer } from "./CustomerAppState";

//Multiple Reducers
const reducers = combineReducers({companiesReducer: companiesReducer, customersReducer: customersReducer});
const store = createStore(reducers);


export default store;