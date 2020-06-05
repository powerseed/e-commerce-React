import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

function Cart(props) {
    const dispatch = useDispatch();
    const items = useSelector(state => state.cart.products);

    const deleteItem = (productId) => {
        dispatch({
            type: "delete_from_cart",
            productId: productId
        });
    }

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
                <td><button className="btn btn-info" onClick={() => {deleteItem(item.productId)}}>Delete</button></td>
            </tr>
    })

    const calculateTotal = () => {
        let total = 0;

        items.forEach((item) => {
            total += item.qty * item.price;
        })

        return total;
    }

    return <div className="container mt-4">
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
                                <tr>
                                    <th scope="row"></th>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td><strong>Total: ${calculateTotal()}</strong></td>
                                    <td>
                                        <Link className="btn btn-info" to="/signin?redirect=shipping">
                                            Checkout
                                        </Link>
                                    </td>
                                </tr>
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
}

export default Cart
