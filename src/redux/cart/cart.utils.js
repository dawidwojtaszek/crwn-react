export const addItemToCart = (currentCartItems, itemToAdd) => {
    const existingItems = currentCartItems.find(
        item => item.id === itemToAdd.id
    );

    if (existingItems) {
        return currentCartItems.map(item => itemToAdd.id === item.id ? { ...item, quantity: item.quantity + 1 } : item);
    } else {
        return [...currentCartItems, { ...itemToAdd, quantity: 1 }]
    }

}