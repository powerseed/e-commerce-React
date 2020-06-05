import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import axios from "axios";
import PaypalButton from "./PaypalButton";

function PlaceOrder(props) {
    const dispatch = useDispatch();

    const items = useSelector(state => state.cart.products);
    const [shipping, setShipping] = useState({});
    const {paymentMethod} = useSelector(state => state.cart);

    const {userInfo} = useSelector(state => state.user)
    const {success} = useSelector(state => state.orderPay)
    let order_id;

    const itemsHtml = items.map(item => {
        return <tr key={item.productId}>
                <th scope="row">
                    <Link to={"/products/" + item.productId}>
                        <img src={"/images/" + item.image} alt="" style={{height: "100px", width: "auto"}}/>
                    </Link>
                </th>
                <td>
                    <Link to={"/products/" + item.productId}>
                        {item.name}
                    </Link>
                </td>
                <td>${item.price}</td>
                <td>{item.qty}</td>
                <td>${item.price * item.qty}</td>
            </tr>
    })

    const calculateTotal = () => {
        let total = 0;

        items.forEach((item) => {
            total += item.qty * item.price;
        })

        return total;
    }

    useEffect(()=>{
        if(!userInfo){
            props.history.push("/")
            return
        }

        const populateShippingAndPayment = async () => {
            const {data} = await axios.get("/api/users/" + userInfo._id);
            if(data.shipping){
                setShipping(data.shipping)
            }
        }

        populateShippingAndPayment();

        if(success){
            Promise.all(
                items.map(async (item) => {
                    await axios.put("/api/products/" + item.productId + "/updateStock", {qty: item.qty})
                })
            )

            dispatch({
                type: "clear_cart",
            });

            dispatch({
                type: "CLEAR_ORDER_PAY_SUCCESS"
            })

            props.history.push("/orders");
        }
    }, [success, userInfo, paymentMethod]);

    const handlePlaceOrder = () => {
        const placeOrder = async () => {
            try {
                const {data} = await axios.post("/api/orders", {orderItems: items, shipping: shipping, payment: {paymentMethod}, total: calculateTotal()}, {
                    headers: {
                        authorization: "Bearer " + userInfo.token
                    }
                })

                dispatch({
                    type: "order_created_successful",
                    payload: data
                });

                order_id = data._id
            }
            catch (e) {
                dispatch({
                    type: "order_created_failed",
                    payload: {error: e.message}
                });
            }
        }
        placeOrder();
    }

    const handleSuccessPayment = async (paymentResult) => {
        try {
            const { data } = await axios.put("/api/orders/" + order_id + "/pay", paymentResult, {
                headers: {
                    Authorization: 'Bearer ' + userInfo.token }
            });
            dispatch({ type: "ORDER_PAY_SUCCESS", payload: data })
        }
        catch (error)
        {
            dispatch({ type: "ORDER_PAY_FAIL", payload: error.message });
        }
    }

    return <div className="container mt-4">
        <div className="d-flex justify-content-center">
            <div className="progress" style={{ width: "500px", height: "30px" }}>
                <div className="progress-bar progress-bar-striped bg-primary" role="progressbar" style={{width: "25%", borderRight: "1px solid"}} aria-valuenow="15" aria-valuemin="0"
                     aria-valuemax="100">Sign-in</div>
                <div className="progress-bar progress-bar-striped bg-primary" role="progressbar" style={{width: "25%", borderRight: "1px solid"}} aria-valuenow="30"
                     aria-valuemin="0" aria-valuemax="100">Shipping</div>
                <div className="progress-bar progress-bar-striped bg-primary" role="progressbar" style={{width: "25%", borderRight: "1px solid"}} aria-valuenow="20"
                     aria-valuemin="0" aria-valuemax="100">Payment</div>
                <div className="progress-bar progress-bar-striped bg-primary" role="progressbar" style={{width: "25%", borderRight: "1px solid"}} aria-valuenow="20"
                     aria-valuemin="0" aria-valuemax="100">Place Order</div>
            </div>
        </div>

        <div className="row">
            <div className="col-8">
                <div className="card mt-4">
                    <div className="card-header">
                        Shipping Address
                    </div>
                    <div className="card-body">
                        <p className="card-text">{shipping.address}, {shipping.city}, {shipping.postal}, {shipping.country}</p>
                    </div>
                </div>

                <div className="card mt-4">
                    <div className="card-header">
                        Payment Method
                    </div>
                    <div className="card-body">
                        <p className="card-text">{paymentMethod}</p>
                    </div>
                </div>

                <div className="card mt-4 mb-4">
                    <div className="card-header">
                        Order items
                    </div>
                    <div className="card-body">
                        <table className="table text-center">
                            <thead style={{border: "none"}}>
                            <tr>
                                <th style={{border: "none"}} scope="col"></th>
                                <th style={{border: "none"}} scope="col">Name</th>
                                <th style={{border: "none"}} scope="col">Price</th>
                                <th style={{border: "none"}} scope="col">Qty</th>
                                <th style={{border: "none"}} scope="col">Subtotal</th>
                                <th style={{border: "none"}} scope="col"></th>
                            </tr>
                            </thead>
                            {
                                itemsHtml.length > 0 ?
                                    <tbody>
                                    {itemsHtml}
                                    </tbody>
                                    :
                                    <tbody>
                                    <tr className="text-center">
                                        <th className="text-center" scope="row" colSpan="6">Your cart is empty. </th>
                                    </tr>
                                    </tbody>
                            }
                        </table>
                    </div>
                </div>
            </div>

            <div className="col-4">
                <div className="card mt-4">
                    <div className="card-body">
                        <div><strong>Total: ${calculateTotal()}</strong></div>
                        <br/>
                        <PaypalButton onClick={handlePlaceOrder} amount={calculateTotal()} onSuccess={handleSuccessPayment}></PaypalButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default PlaceOrder
