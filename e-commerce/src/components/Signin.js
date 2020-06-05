import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios"
import Cookie from "js-cookie"
import {Link} from "react-router-dom";

function Signin(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {userInfo, error} = useSelector(state => state.user)
    const dispatch = useDispatch();
    const redirect = props.location.search ? props.location.search.split("=")[1] : "/";

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const {data} = await axios.post("/api/users/signin", {email, password});
            dispatch({
                type: "user_signin_success",
                payload: data
            });

            Cookie.set("userInfo", data);
        }
        catch (e) {
            dispatch({
                type: "user_signin_failed",
                payload: "Invalid username or password. "
            });
        }
    }

    useEffect(() => {
        if(userInfo){
            props.history.push(redirect);
        }
    }, [userInfo, props.history, redirect]);

    return <div className="container mt-4 d-flex justify-content-center">
                <div className="card" style={{width: "22rem"}}>
                    <div className="card-header">
                        <h4>Sign-In</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            {error && <div className="form-group alert alert-danger">{error}</div>}
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Email</label>
                                <input type="email" className="form-control" required onChange={(e) => {setEmail(e.target.value)}}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Password</label>
                                <input type="password" className="form-control" required onChange={(e) => {setPassword(e.target.value)}}/>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary btn-block" type="submit">Sign In</button>
                            </div>
                            <div className="form-group">
                                <p>New to E-commerce?</p>
                                <Link to={redirect === "/" ? "/register" : "/register?redirect=" + redirect} className="btn btn-primary btn-block">
                                    Create an account
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
    </div>
}

export default Signin
