import { companiesReducer } from "./CompanyAppState";
import { combineReducers,createStore } from "redux";

//Multiple catsReducer
const reducers = combineReducers({companiesReducer: companiesReducer});
const store = createStore(reducers);


export default store;