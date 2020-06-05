import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

function Payment(props) {
    const [paymentMethod, setPaymentMethod] = useState("");
    const {userInfo} = useSelector(state => state.user);

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch({
            type: "create_payment_info",
            payload: paymentMethod
        })

        props.history.push("placeOrder");
    }

    useEffect(() => {
        if(!userInfo){
            props.history.push("/")
        }
    }, [userInfo, props.history])

    return <div className="container mt-4 col-4">
        <div className="progress" style={{ width: "500px", height: "30px" }}>
            <div className="progress-bar progress-bar-striped bg-primary" role="progressbar" style={{width: "25%", borderRight: "1px solid"}} aria-valuenow="15" aria-valuemin="0"
                 aria-valuemax="100">Sign-in</div>
            <div className="progress-bar progress-bar-striped bg-primary" role="progressbar" style={{width: "25%", borderRight: "1px solid"}} aria-valuenow="30"
                 aria-valuemin="0" aria-valuemax="100">Shipping</div>
            <div className="progress-bar progress-bar-striped bg-primary" role="progressbar" style={{width: "25%", borderRight: "1px solid"}} aria-valuenow="20"
                 aria-valuemin="0" aria-valuemax="100">Payment</div>
            <div className="progress-bar progress-bar-striped bg-secondary" role="progressbar" style={{width: "25%", borderRight: "1px solid"}} aria-valuenow="20"
                 aria-valuemin="0" aria-valuemax="100">Place Order</div>
        </div>

        <div className="mt-4 d-flex justify-content-center">
            <div className="card" style={{width: "22rem"}}>
                <div className="card-header">
                    <h4>Payment</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input className="form-group-input" type="radio" name="exampleRadios" id="exampleRadios1"
                                   value="Paypal" required onChange={(e) => {setPaymentMethod(e.target.value)}}/>
                            <label className="ml-2 form-check-label" htmlFor="exampleRadios1">
                                Paypal
                            </label>
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary btn-block" type="submit">Continue</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
}

export default Payment
