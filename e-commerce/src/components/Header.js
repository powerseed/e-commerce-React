import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Cookie from "js-cookie"

function Header (props) {
    const {userInfo} = useSelector(state => state.user)
    const dispatch = useDispatch();

    const handleLogout = () => {
        Cookie.remove("userInfo");
        dispatch({
            type: "user_logout"
        })
    }

    useEffect(()=>{
        if(props.location && props.location.search){
            const category = props.location.search.split("=")[1];
            if(category==="cartoon"){
                document.getElementById("cartoon").classList.add("active")
            }
            else if(category==="movie"){
                document.getElementById("movies").classList.add("active")
            }
        }
    },[props.location])

    return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
                    <Link to="/" className="ml-4 navbar-brand">E-Commerce</Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav mr-4 mt-2 mt-lg-0">
                            <li className="nav-item">
                                <Link to="/?category=Cartoon" className="nav-link" id="cartoon">Cartoon</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/?category=Movie" className="nav-link" id="movies">Movies</Link>
                            </li>
                        </ul>

                        <ul className="navbar-nav ml-auto mr-4 mt-2 mt-lg-0">
                            <li className="nav-item mr-4">
                                <Link to="/cart" className="nav-link">
                                    <i className="fas fa-shopping-cart mr-2"></i>
                                    Cart
                                </Link>
                            </li>
                            {
                                userInfo ?
                                <li className="nav-item dropdown">
                                    <div className="nav-link dropdown-toggle" href="#" id="navbarDropdown"
                                       role="button" data-toggle="dropdown" aria-haspopup="true"
                                       aria-expanded="false">
                                        {userInfo.name}
                                    </div>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                        <Link className="dropdown-item" to="/profile">My Profile</Link>
                                        <Link className="dropdown-item" to="/orders">My Orders</Link>
                                        <div className="dropdown-divider"></div>
                                        <div className="dropdown-item" href="#">
                                            <button className="btn btn-danger btn-block" onClick={handleLogout}>Logout</button>
                                        </div>
                                    </div>
                                </li>
                                :
                                <li className="nav-item mr-4">
                                    <Link to="/signin" className="nav-link">Sign In</Link>
                                </li>
                            }
                        </ul>
                    </div>
                </nav>
            </div>
        )
}

export default Header;
