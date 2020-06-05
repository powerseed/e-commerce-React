import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';

function Home (props) {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("lowest");

    useEffect( () => {
        const fetch = async () => {
            let {data} = await axios.get("/api/products");

            if(props.location && props.location.search){
                const category = props.location.search.split("=")[1];

                data = data.filter(product => product.category === category);
            }

            if(search){
                const lowerCase = search.toLowerCase();
                data = data.filter(product => product.name.toLowerCase().includes(lowerCase));
            }

            if(sort === "lowest"){
                data.sort((a, b) => a.price > b.price ? 1 : -1)
            }
            else{
                data.sort((a, b) => a.price < b.price ? 1 : -1)
            }

            setProducts(data)
        }

        fetch();
        }, [search, sort, props.location])


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

    const productsHtml = products.map(product => {
        return (
            <div className="mb-5" style={{width: "33%"}} key={product._id}>
                <div className="card" style={{width: "20rem", height:"35rem"}}>
                    <Link to={'/products/' + product._id}><img alt="" className="card-img-top" style={{height:"25rem"}} src={"/images/" + product.image}/></Link>
                    <div className="card-body">
                        <h5 className="card-title" style={{height: "2.6em", lineHeight: "1.3em", fontSize:"20px", overflow: "hidden", textOverflow:"ellipsis",
                            display:"-webkit-box", WebkitBoxOrient:"vertical", WebkitLineClamp:"2"}}>
                            <Link to={'/products/' + product._id} style={{textDecoration: "none"}}>
                                {product.name}
                            </Link>
                        </h5>
                        <small className="card-text">{product.brand}</small>
                        <div>
                            <strong className="card-text">${product.price}</strong>
                            <span className="float-right">{getRatingHtml(product.rating)}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    })

    return <div className="container">
            <div className="mt-5 d-flex justify-content-center">
                <div className="input-group mb-3 mr-2" style={{width: "15rem"}}>
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-default">Search</span>
                    </div>
                    <input type="text" className="form-control" aria-label="Default"
                           aria-describedby="inputGroup-sizing-default" onChange={(e) => {setSearch(e.target.value)}}/>
                </div>

                <div className="input-group mb-3" style={{width: "15rem"}}>
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Sort by</label>
                    </div>
                    <select className="custom-select" id="inputGroupSelect01" onChange={(e) => {setSort(e.target.value)}}>
                        <option value="lowest">Lowest Price</option>
                        <option value="highest">Highest Price</option>
                    </select>
                </div>
            </div>
            <div className="d-flex flex-wrap container mt-4" style={{flexWrap: "wrap"}}>
                {productsHtml}
            </div>
        </div>
}

export default Home;
