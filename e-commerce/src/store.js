import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import productsListReducer from "./redusers/productsListReducer";
import thunk from "redux-thunk";
import productDetailsReducer from "./redusers/productDetailsReducer";
import cartReducer from "./redusers/cartReducer";
import Cookie from "js-cookie"
import userReducer from "./redusers/userReducer";
import ProductCreateReducer from "./redusers/ProductCreateReducer";
import {orderCreateReducer, orderPayReducer} from "./redusers/orderCreateReducer";

const reduser = combineReducers({
    productsList: productsListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    user: userReducer,
    productCreate: ProductCreateReducer,
    order: orderCreateReducer,
    orderPay: orderPayReducer
});

const userInfo = Cookie.getJSON("userInfo") || null;
const cartItems = Cookie.getJSON("cartItems") || [];
const paymentMethod = Cookie.getJSON("paymentMethod") || "";

const initialState = {user: {userInfo: userInfo}, cart: {products: cartItems, paymentMethod: paymentMethod}};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reduser, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
