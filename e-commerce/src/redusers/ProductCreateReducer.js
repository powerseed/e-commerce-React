const ProductCreateReducer = (state = {product: {}}, action) => {
    if(action.type === "product_create_success"){
        return {product: action.payload, success: true}
    }
    else if (action.type === "product_create_failed"){
        return {error: action.payload}
    }
    else {
        return state
    }
}

export default ProductCreateReducer
