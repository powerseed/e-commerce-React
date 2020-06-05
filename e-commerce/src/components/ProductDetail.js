import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from 'axios';

function ProductsDetail(props){
    const dispatch = useDispatch();

    useEffect( () => {
        const fetch = async () => {
            const {data} = await axios.get("/api/products/" + props.match.params.id);
            dispatch(
                {
                type: "product_detail_success",
                payload: data
            })
        }
        fetch();
    }, [])

    const [qty, setQty] = useState(1);
    const {product} = useSelector((state) => {
        return state.productDetails
    });

    const changeQty = (e) => {
        let updatedQty = e.target.value;
        setQty(updatedQty);

        if(updatedQty > product.stock){
            document.getElementById("AddToCart").classList.add("disabled");
            document.getElementById("exceedStockAlert").style.display = "inline";
        }
        else {
            document.getElementById("AddToCart").classList.remove("disabled");
            document.getElementById("exceedStockAlert").style.display = "none";
        }
    }

    const addToCart = async (e) => {
        const {data} = await axios.get("/api/products/" + product._id);

        dispatch({
            type: "add_to_cart",
            payload: {
                productId: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty: qty
            }
        });

        props.history.push("/cart")
    }

    const getRatingHtml = (rating) => {
        let ratingHtml = [];
        for(let i = 0; i < rating; i++) {
            ratingHtml.push(<i className="fas fa-star" key={i} style={{color: "orange"}}></i>)
        }

        for(let i = rating; i < 5; i++) {
            ratingHtml.push(<i className="far fa-star" key={i} style={{color: "orange"}}></i>)
        }

        return ratingHtml;
    }

    return <div>
        {product ?
            <div className="mt-5">
                <div className='container mt-2 offset-2'>
                    <div className="row">
                        <div className="col-4">
                            <img src={"/images/" + product.image} alt="" style={{maxWidth: "100%", maxHeight: "100%"}}/>
                        </div>

                        <div className="ml-4 col-7">
                            <h3>
                                {product.name}
                            </h3>

                            <div>
                                {getRatingHtml(product.rating)}
                            </div>

                            <div className="mt-2">
                                <strong>Price: ${product.price}</strong>
                            </div>


                            {
                                product.stock > 0 ? <div>
                                        <div className="mt-2">Stock: {product.stock}</div>

                                        <label htmlFor="Qty">Qty: </label>
                                        <input className="mt-2 ml-2" type="number" name="Qty" min="1" max="999" value={qty} onChange={(e) => {changeQty(e)}}/>

                                        <div className="mt-2">
                                            <button id="AddToCart" className="btn btn-info" onClick={addToCart}>Add to cart</button>
                                            <span className="ml-2 alert-danger" id="exceedStockAlert" style={{display: "none"}}>Don't have that many in stock. </span>
                                        </div>
                                    </div> : <div>Out of Stock</div>
                            }

                            <div className="mt-4">
                                <h5>Description:</h5>
                                <p>{product.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : <div>Loading...</div>}
    </div>
}

export default ProductsDetail;
