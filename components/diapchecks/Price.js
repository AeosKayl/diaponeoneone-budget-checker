import { useState, useEffect } from "react";
// the initial price component I used to calculate the price changes... not so effective
const Price = ({ items, itemName, quantity, onPriceChange }) => {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    // Find the item that matches the item name in the items array, both items and itenName received as parameters
    const item = items.find((item) => item.name === itemName);

    // Set the price to the item's price or zero if not found
    setPrice(item ? Number(item.price) : 0);
  }, [itemName]);

  // Calculate the total price
  const totalPrice = price * quantity;
  onPriceChange(totalPrice);

  return <p>{`Total price: ${totalPrice.toFixed(2)} SEK`}</p>;
};

export default Price;
