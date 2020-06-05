function productDetailsReducer(state = {products: {}}, action) {
    if(action.type === "product_detail_success"){
        return {loading: false, product: action.payload};
    }
    else {
        return state;
    }
}

export default productDetailsReducer
