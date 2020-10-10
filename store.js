import { createStore } from "redux";
import reducer from "./reducers";
import middleware from "./middleware";

export default store = createStore(reducer, middleware);
