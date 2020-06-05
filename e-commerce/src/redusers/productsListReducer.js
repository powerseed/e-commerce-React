function productsListReducer(state = {products: []}, action) {
    if(action.type === "products_list_request"){
        return {loading: true}
    }
    else if(action.type === "products_list_success"){
        return {loading: false, products: action.payload}
    }
    else if(action.type === "products_list_fail"){
        return {loading: false, error: action.payload}
    }
    else{
        return state
    }
}

export default productsListReducer
