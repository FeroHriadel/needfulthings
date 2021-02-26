export const cartReducer = (state = {cart: {cartItems: []}}, action) => {
    switch (action.type) {
        case 'CART_ADD_ONE':
            const cartItemsFromLS = JSON.parse(localStorage.getItem('cartItems'));
            return {
                cartItems: cartItemsFromLS
            };
        case 'CART_SUBTRACT_ONE':
            return {
                cartItems: action.payload
            };
        case 'CART_REMOVE_ITEM':
            return {
                cartItems: action.payload
            };
        default:
            return state;
    }
}