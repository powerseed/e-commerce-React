import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import Cookie from "js-cookie";

function MyProfile(props) {
    const {userInfo, error} = useSelector(state => state.user);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postal, setPostal] = useState("");
    const [country, setCountry] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        if(!userInfo){
            props.history.push("/")
            return
        }

        const populateUserInfo = async () => {
            const {data} = await axios.get("api/users/" + userInfo._id);
            setName(data.name)
            setEmail(data.email)
            setPassword(data.password)
            setRePassword(data.password)

            if(data.shipping){
                setAddress(data.shipping.address)
                setCity(data.shipping.city)
                setPostal(data.shipping.postal)
                setCountry(data.shipping.country)
            }
        }
        populateUserInfo();
    }, [userInfo, props.history])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(password !== rePassword){
            let elements = document.getElementsByClassName("invalid-feedback");
            for (const element of elements) {
                element.style.display = "inline"
            }
            return
        }

        const {data} = await axios.put("/api/users/" + userInfo._id + "/updateProfile", {name, email, password});

        dispatch({
            type: "user_register_success",
            payload: data
        });

        Cookie.set("userInfo", data);

        await axios.put("/api/users/" + userInfo._id + "/addShipping", {address, city, postal, country});

        dispatch({
            type: "create_shipping_info",
            payload: {address, city, postal, country}
        })

        props.history.push("/")
    }

    return <div className="container mt-5 col-6">
                <div className="card mt-5">
                    <div className="card-header">
                        <h5>Profile</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            {error && <div className="form-group alert alert-danger">{error}</div>}
                            <div className="form-row">
                                <div className="form-group col-5">
                                    <label htmlFor="exampleFormControlInput1">Name</label>
                                    <input type="text" className="form-control" required value={name} onChange={(e) => {setName(e.target.value)}}/>
                                </div>
                                <div className="form-group col-7">
                                    <label htmlFor="exampleFormControlInput1">Email</label>
                                    <input type="email" className="form-control" required value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-6">
                                    <label htmlFor="password1">Password</label>
                                    <input type="password" id="password1" className="form-control" value={password} required onChange={(e) => {setPassword(e.target.value)}}/>
                                    <div className="invalid-feedback">
                                        Passwords don't match.
                                    </div>
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="password2">Re-type Password</label>
                                    <input type="password" id="password2" className="form-control" value={rePassword} required onChange={(e) => {setRePassword(e.target.value)}}/>
                                    <div className="invalid-feedback">
                                        Passwords don't match.
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="address">Shipping Address</label>
                                <input type="text" id="address" className="form-control" value={address} onChange={(e) => {setAddress(e.target.value)}}/>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-4">
                                    <label htmlFor="city">City</label>
                                    <input type="text" id="city" className="form-control" value={city} onChange={(e) => {setCity(e.target.value)}}/>
                                </div>

                                <div className="form-group col-4">
                                    <label htmlFor="country">Country</label>
                                    <input type="text" id="country" className="form-control" value={country} onChange={(e) => {setCountry(e.target.value)}}/>
                                </div>

                                <div className="form-group col-4">
                                    <label htmlFor="postal">Postal</label>
                                    <input type="text" id="postal" className="form-control" value={postal} onChange={(e) => {setPostal(e.target.value)}}/>
                                </div>
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary btn-block" type="submit">Update</button>
                            </div>
                        </form>
                    </div>
        </div>
    </div>
}

export default MyProfile
