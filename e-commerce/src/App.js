import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from './components/Home';
import ProductsDetail from "./components/ProductDetail";
import Cart from './components/Cart'
import Signin from "./components/Signin";
import Register from "./components/Register";
import CreateProduct from "./components/CreateProduct";
import Shipping from "./components/Shipping";
import Payment from "./components/Payment"
import PlaceOrder from "./components/PlaceOrder";
import MyProfile from "./components/MyProfile";
import MyOrders from "./components/MyOrders";
import OrderDetail from "./components/OrderDetail";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <div style={{minHeight: "calc( 100vh - 50px)"}}>
              <Header></Header>
              <Route path='/' exact component={Home}></Route>
              <Route path='/signin' exact component={Signin}></Route>
              <Route path='/register' exact component={Register}></Route>
              <Route path='/products/:id' component={ProductsDetail}></Route>
              <Route path='/createProduct/' component={CreateProduct}></Route>
              <Route path='/cart/:id?' component={Cart}></Route>
              <Route path='/shipping' component={Shipping}></Route>
              <Route path='/payment' component={Payment}></Route>
              <Route path='/placeOrder' component={PlaceOrder}></Route>
              <Route path='/profile' component={MyProfile}></Route>
              <Route path='/orders' exact component={MyOrders}></Route>
              <Route path='/orders/:id' component={OrderDetail}></Route>
          </div>
          <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
