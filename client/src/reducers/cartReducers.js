export const cartReducer = (state = {cart: []}, action) => {
    switch (action.type) {
        case 'CART_ADD_ONE':
            //is such an item in LS.cartItems? 
            const isAlreadyInCart = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')).find(item => item._id === action.payload._id) : null;

            //if such item is in cart => overwrite in with new item (with new qty)
            if (isAlreadyInCart) {
                return {
                    ...state,
                    cart: state.cart.map(item => item._id === action.payload._id ? action.payload : item) //match? replace item;   no match? leave old item
                }
            //if item not in cart => add it    
            } else {
                return {
                    ...state,
                    cart: [...state.cart, action.payload] //add new item
                }
            }

        default:
            return state;
    }
}