//ADD ONE ITEM TO CART
export const addOneToCart = (productId) => async (dispatch, getState) => {
    //get product from db
    const res = await fetch(`/api/products/${productId}`);
    const data = await res.json();
    const newItem = data;



    //check if newItem is in LS
    const isAnythingInLS = localStorage.getItem('cartItems') ? true : false
    


    //if LS empty set qty = 1 and save to LS
    if (!isAnythingInLS) {
        newItem.qty = 1;
        localStorage.setItem('cartItems', JSON.stringify([newItem]))
    }


    //if LS not empty, find if newItem has a matching item in LS
    else {
        const isThisItemInLS = JSON.parse(localStorage.getItem('cartItems')).find(oldItem => oldItem._id === newItem._id);
        //if no match in LS, set qty = 1 and add newItem
        if (!isThisItemInLS) {
            const oldItems = JSON.parse(localStorage.getItem('cartItems'));
            newItem.qty = 1;
            const newArray = [...oldItems, newItem];
            localStorage.setItem('cartItems', JSON.stringify(newArray));
        }
        // if match in LS, increase its quantity by 1
        else {
            //get match from LS and from it get qty.
            const oldItems = JSON.parse(localStorage.getItem('cartItems'));
            const matchingItem = oldItems.find(oldItem => oldItem._id === newItem._id);
            
            //increase qty by 1
            matchingItem.qty = parseInt(matchingItem.qty) + 1;
            
            //rewrite old qty with new qty and put back in LS
            oldItems.map(oldItem => oldItem._id === matchingItem._id ? matchingItem : oldItem);
            localStorage.setItem('cartItems', JSON.stringify(oldItems));
        }
    }
    
    
    
    //dispatch
    dispatch({type: 'CART_ADD_ONE'});
}



//SUBTRACT ONE FROM CART PRODUCT QTY
export const subtractOneFromProductQty = (productId) => async (dispatch, getState) => {
    //find item in state.cart.cartItems
    const itemsInCart = getState().cart.cartItems;
    const itemToDecrease = itemsInCart.find(itemInCart => itemInCart._id === productId);
    //decrease the items qty and rewrite state & LS
    itemToDecrease.qty = itemToDecrease.qty - 1;
    itemsInCart.map(item => item._id === itemToDecrease._id ? itemToDecrease : item);
    localStorage.setItem('cartItems', JSON.stringify(itemsInCart));
    dispatch({type: 'CART_SUBTRACT_ONE', payload: itemsInCart});
}



//REMOVE ITEM FROM CART
export const removeItem = (productId) => async (dispatch, getState) => {
    const itemsInCart = getState().cart.cartItems;
    const filteredItems = itemsInCart.filter(item => item._id !== productId);
    localStorage.setItem('cartItems', JSON.stringify(filteredItems));
    dispatch({type: 'CART_REMOVE_ITEM', payload: filteredItems});

}