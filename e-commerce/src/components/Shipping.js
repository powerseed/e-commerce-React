import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";

function Shipping(props) {
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postal, setPostal] = useState("");
    const [country, setCountry] = useState("");
    const {userInfo} = useSelector(state => state.user);

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault()

        await axios.put("/api/users/" + userInfo._id + "/addShipping", {address, city, postal, country});

        dispatch({
            type: "create_shipping_info",
            payload: {address, city, postal, country}
        })
        props.history.push("/payment")
    }

    useEffect( () => {
        if(!userInfo){
            props.history.push("/")
            return
        }

        const checkShipping = async () => {
            const {data} = await axios.get("/api/users/" + userInfo._id);
            if(data.shipping && data.shipping.address && data.shipping.city && data.shipping.country && data.shipping.postal){
                props.history.push("/payment");
            }
        }
        checkShipping();
    }, [userInfo, props.history])

    return <div className="container mt-4 col-4">
        <div className="progress" style={{ width: "500px", height: "30px" }}>
            <div className="progress-bar progress-bar-striped bg-primary" role="progressbar" style={{width: "25%", borderRight: "1px solid"}} aria-valuenow="15" aria-valuemin="0"
                 aria-valuemax="100">Sign-in</div>
            <div className="progress-bar progress-bar-striped bg-primary" role="progressbar" style={{width: "25%", borderRight: "1px solid"}} aria-valuenow="30"
                 aria-valuemin="0" aria-valuemax="100">Shipping</div>
            <div className="progress-bar progress-bar-striped bg-secondary" role="progressbar" style={{width: "25%", borderRight: "1px solid"}} aria-valuenow="20"
                 aria-valuemin="0" aria-valuemax="100">Payment</div>
            <div className="progress-bar progress-bar-striped bg-secondary" role="progressbar" style={{width: "25%", borderRight: "1px solid"}} aria-valuenow="20"
                 aria-valuemin="0" aria-valuemax="100">Place Order</div>
        </div>

        <div className="mt-4 d-flex justify-content-center">
            <div className="card" style={{width: "22rem"}}>
                <div className="card-header">
                    <h4>Shipping</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Address</label>
                            <input type="text" className="form-control" required onChange={(e) => {setAddress(e.target.value)}}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">City</label>
                            <input type="text" className="form-control" required onChange={(e) => {setCity(e.target.value)}}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Postal Code</label>
                            <input type="text" className="form-control" required onChange={(e) => {setPostal(e.target.value)}}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Country</label>
                            <input type="text" className="form-control" required onChange={(e) => {setCountry(e.target.value)}}/>
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

export default Shipping
