function orderCreateReducer(state = {}, action) {
    if(action.type === "order_created_successful"){
        return {order: action.payload, success: true}
    }
    else if(action.type === "order_created_failed"){
        return {error: action.payload, success: false}
    }
    else {
        return state
    }
}

function orderPayReducer(state = {
    order: {
        orderItems: [],
        shipping: {},
        payment: {}
    }
}, action) {
    if (action.type === "ORDER_PAY_SUCCESS") {
        return { loading: false, success: true };
    }
    else if (action.type === "ORDER_PAY_FAIL") {
        return { loading: false, error: action.payload };
    }
    else if (action.type === "CLEAR_ORDER_PAY_SUCCESS") {
        return { loading: false, success: false };
    }
    else {
        return state;
    }
}

export {orderCreateReducer, orderPayReducer}
