import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import axios from "axios";
import moment from "moment";
import {Link} from "react-router-dom";

function MyOrders(props) {
    const {userInfo} = useSelector(state => state.user)
    const [orders, setOrders] = useState([]);

    const ordersHtml = orders.map(order => {
        return <tr key={order._id}>
            <th scope="row">
            </th>
            <td>
                {moment(order.createdAt).format('YYYY-MM-DD HH:mm:ss')}
            </td>
            <td>
                {order._id}
            </td>
            <td>{order.shipping.address}, {order.shipping.city}, {order.shipping.country}, {order.shipping.postal}</td>
            <td>{order.payment.paymentMethod}</td>
            <td>${order.total}</td>
            <td><Link className="btn btn-primary" to={"/orders/" + order._id}>Detail</Link></td>
        </tr>
    })

    useEffect(() => {
        if(!userInfo){
            props.history.push("/")
        }

        const fetchOrders = async () => {
            const {data} = await axios.get("/api/users/" + userInfo._id + "/getOrders");
            setOrders(data)
        }

        fetchOrders();
    }, [userInfo, props.history])

    return <div className="container mt-4">
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-header">
                        <h5>My orders</h5>
                    </div>
                    <div className="card-body">
                        <table className="table text-center">
                            <thead style={{border: "none"}}>
                            <tr>
                                <th style={{border: "none"}} scope="col"></th>
                                <th style={{border: "none"}} scope="col">Date</th>
                                <th style={{border: "none"}} scope="col">Order#</th>
                                <th style={{border: "none"}} scope="col">Shipping address</th>
                                <th style={{border: "none"}} scope="col">Payment Method</th>
                                <th style={{border: "none"}} scope="col">Total</th>
                                <th style={{border: "none"}} scope="col"></th>
                            </tr>
                            </thead>
                            {
                                ordersHtml.length > 0 ?
                                    <tbody>
                                    {ordersHtml}
                                    </tbody>
                                    :
                                    <tbody>
                                    <tr className="text-center">
                                        <th className="text-center" scope="row" colSpan="6">You haven't placed any order. </th>
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

export default MyOrders
