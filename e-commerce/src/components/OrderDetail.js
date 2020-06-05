import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import axios from "axios";

function OrderDetail(props) {
    const {userInfo} = useSelector(state => state.user)
    const [order, setOrder] = useState({});
    const [items, setItems] = useState([]);

    const itemsHtml = items.map(item => {
        return <tr key={item.item._id}>
                <th scope="row">
                    <Link to={"/products/" + item.item._id}>
                        <img src={"/images/" + item.item.image} alt="" style={{height: "100px", width: "auto"}}/>
                    </Link>
                </th>
                <td>
                    <Link to={"/products/" + item.item._id}>
                        {item.item.name}
                    </Link>
                </td>
                <td>${item.item.price}</td>
                <td>{item.qty}</td>
                <td>${item.item.price * item.qty}</td>
            </tr>
    })

    const calculateTotal = () => {
        let total = 0;

        items.forEach((item) => {
            total += item.qty * item.item.price;
        })

        return total;
    }

    useEffect(()=>{
        if(!userInfo){
            props.history.push("/")
            return
        }

        const fetchOrderAndItems = async () => {
            const {data} = await axios.get("/api/orders/" + props.match.params.id, {
                headers:{
                    authorization: "Bearer " + userInfo.token
                }
            });
            setOrder(data)

            Promise.all(
                data.orderItems.map(async (orderItem) => {
                    const {data} = await axios.get("/api/products/" + orderItem.productId)
                    return {
                        item: data,
                        qty: orderItem.qty
                    }
                })
            ).then(results => setItems(results));
        }

        fetchOrderAndItems();
    }, [userInfo, props.history, props.match.params.id]);

    return <div className="container mt-4">
        <div className="row">
            <div className="col-8 offset-2">
                <div className="card mt-4">
                    <div className="card-header">
                        Shipping Address
                    </div>
                    <div className="card-body">
                        {
                            order.shipping ?
                                <p className="card-text">{order.shipping.address}, {order.shipping.city}, {order.shipping.postal}, {order.shipping.country}</p>
                            : null
                        }
                    </div>
                </div>

                <div className="card mt-4">
                    <div className="card-header">
                        Payment Method
                    </div>
                    <div className="card-body">
                        {
                            order.payment ?
                            <p className="card-text">{order.payment.paymentMethod}</p>
                                : null
                        }
                    </div>
                </div>

                <div className="card mt-4 mb-4">
                    <div className="card-header">
                        <span>Order items</span>
                        <span className="float-right">Total: ${calculateTotal()}</span>
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
                                itemsHtml.length > 0?
                                    <tbody>
                                        {itemsHtml}
                                    </tbody>
                                    :
                                    <tbody>
                                    <tr className="text-center">
                                        <th className="text-center" scope="row" colSpan="6">Loading. </th>
                                    </tr>
                                    </tbody>
                            }
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default OrderDetail
