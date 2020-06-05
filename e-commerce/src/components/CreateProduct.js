import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios"

function CreateProduct(props) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState('');
    const [numberOfReviews, setNumberOfReviews] = useState('');

    const {userInfo, error} = useSelector(state => state.user)

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const {data} = await axios.post("/api/products/",
                {name, price, image, brand, category, stock, description, rating, numberOfReviews},
                {headers: {
                        authorization: "Bearer " + userInfo.token
                    }});

            dispatch({
                type: "product_create_success",
                payload: data
            });
        }
        catch (e) {
            console.log(e.message)
            dispatch({
                type: "product_create_failed",
                payload: e.message
            });
        }
    }

    return <div className="container mt-4 d-flex justify-content-center">
        <div className="card" style={{width: "22rem"}}>
            <div className="card-header">
                <h4>Create Account</h4>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    {error && <div className="form-group">{error}</div>}
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Name</label>
                        <input type="text" className="form-control" required onChange={(e) => {setName(e.target.value)}}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Price</label>
                        <input type="number" className="form-control" required onChange={(e) => {setPrice(e.target.value)}}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Image</label>
                        <input type="text" className="form-control" required onChange={(e) => {setImage(e.target.value)}}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Brand</label>
                        <input type="text" className="form-control" required onChange={(e) => {setBrand(e.target.value)}}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Category</label>
                        <input type="text" className="form-control" required onChange={(e) => {setCategory(e.target.value)}}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Stock</label>
                        <input type="number" className="form-control" required onChange={(e) => {setStock(e.target.value)}}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Description</label>
                        <textarea type="text" className="form-control" required onChange={(e) => {setDescription(e.target.value)}}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Rating</label>
                        <input type="number" className="form-control" required onChange={(e) => {setRating(e.target.value)}}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Number Of Reviews</label>
                        <input type="number" className="form-control" required onChange={(e) => {setNumberOfReviews(e.target.value)}}/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block" type="submit">Create</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
}

export default CreateProduct
