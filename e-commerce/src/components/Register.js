import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios"
import Cookie from "js-cookie"
import {Link} from "react-router-dom";

function Register(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const redirect = props.location.search ? props.location.search.split("=")[1] : "/";

    const {userInfo, error} = useSelector(state => state.user)
    const dispatch = useDispatch();

    function UserException(message) {
        this.message = message;
        this.name = "UserException";
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if(password !== rePassword){
                throw new UserException("Passwords don't match. ")
            }

            const {data} = await axios.post("/api/users/register", {name, email, password});
            dispatch({
                type: "user_register_success",
                payload: data
            });

            Cookie.set("userInfo", data);
        }
        catch (e) {
            dispatch({
                type: "user_register_failed",
                payload: e.message
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
                <h4>Create Account</h4>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    {error && <div className="form-group alert alert-danger">{error}</div>}
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Name</label>
                        <input type="text" className="form-control" required onChange={(e) => {setName(e.target.value)}}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Email</label>
                        <input type="email" className="form-control" required onChange={(e) => {setEmail(e.target.value)}}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password1">Password</label>
                        <input type="password" id="password1" className="form-control" required onChange={(e) => {setPassword(e.target.value)}}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password2">Re-type Password</label>
                        <input type="password" id="password2" className="form-control" required onChange={(e) => {setRePassword(e.target.value)}}/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block" type="submit">Register</button>
                    </div>
                    <div className="form-group">
                        <p>Already have an account?</p>
                        <Link to={redirect === "/" ? "/signin" : "/signin?redirect=" + redirect} className="btn btn-primary btn-block">
                            Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    </div>
}

export default Register
