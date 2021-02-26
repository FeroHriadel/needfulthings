export const cartReducer = (state = {cart: {cartItems: []}}, action) => {
    switch (action.type) {
        case 'CART_ADD_ONE':
            const cartItemsFromLS = JSON.parse(localStorage.getItem('cartItems'));
            return {
                cartItems: cartItemsFromLS
            };
        default:
            return state;
    }
}