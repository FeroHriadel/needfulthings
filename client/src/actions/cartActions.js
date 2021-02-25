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

    //save to LS

   
}