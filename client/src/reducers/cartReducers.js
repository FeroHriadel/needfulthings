export const cartReducer = (state = {cart: []}, action) => {
    switch (action.type) {
        case 'CART_ADD_ONE':
            const cartItemsFromLS = JSON.parse(localStorage.getItem('cartItems'));
            return {
                cart: cartItemsFromLS
            };
        default:
            return state;
    }
}