import Cookie from "js-cookie";

function cartReducer(state = {products: [], shipping: {}, paymentMethod: {}}, action) {
    if(action.type === "add_to_cart")
    {
        const exsitingProduct = state.products.find(product => product.productId === action.payload.productId);
        if(exsitingProduct){
            const newProducts = state.products.map(product => {
                if(product.productId === exsitingProduct.productId){
                    return {...product, qty: Number(product.qty) + Number(action.payload.qty)}
                }
                else{
                    return product;
                }
            });
            Cookie.set("cartItems", JSON.stringify(newProducts))
            return {products: newProducts}
        }
        else {
            const newProducts = [...state.products, action.payload];
            Cookie.set("cartItems", JSON.stringify(newProducts))
            return {products: newProducts}
        }
    }
    else if(action.type === "delete_from_cart"){
        const newProducts = state.products.filter(product => product.productId !== action.productId);
        Cookie.set("cartItems", JSON.stringify(newProducts))
        return {products: newProducts};
    }
    else if(action.type === "clear_cart"){
        Cookie.set("cartItems", [])
        return {...state, products: []};
    }
    else if(action.type === "create_shipping_info"){
        return {...state, shipping: action.payload};
    }
    else if(action.type === "create_payment_info"){
        Cookie.set("paymentMethod", action.payload)
        return {...state, paymentMethod: action.payload};
    }
    else {
        return state;
    }
}

export default cartReducer;
