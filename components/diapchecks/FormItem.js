import { useState } from "react";
import Price from "./Price";
// initial component used as formItem, failed to implement it properly
// A reusable component that renders a dropdown menu for selectable items
const DropdownMenu = ({ items, onChange }) => {
  // The state to store the selected item
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const [itemName, setItemName] = useState(items[0].name);
  const [confirmedItem, setConfirmedItem] = useState(false);

  // A handler function to update the selected item and call the onChange prop
  const handleSelect = (event) => {
    const value = event.target.value;
    setSelectedItem(value);
    // console.log(value);// for checking purposes
    onChange(value);
  };

  // Return the JSX element for the dropdown menu
  return (
    <select value={selectedItem} onChange={handleSelect}>
      {items.map((item) => (
        <option key={item.id} value={item.name}>
          {item.name}
        </option>
      ))}
    </select>
  );
};

// A reusable component that renders a quantity input with buttons to increase or decrease the quantity
const QuantityInput = ({ quantity, onChange, onQuantChange }) => {
  // A handler function to increment the quantity and call the onChange prop
  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    onChange(newQuantity);
    onQuantChange(newQuantity);
    console.log(newQuantity);
  };

  // A handler function to decrement the quantity and call the onChange prop
  const handleDecrement = () => {
    const newQuantity = Math.max(0, quantity - 1);
    onChange(newQuantity);
    console.log(newQuantity);
  };

  // Return the JSX element for the quantity input
  return (
    <div>
      <button onClick={handleDecrement}>-</button>
      <input type="number" value={quantity} readOnly />
      <button onClick={handleIncrement}>+</button>
    </div>
  );
};

// const Price = ({ itemName, quantity }) => {
//   const price = usePrice(itemName);

//   const totalPrice = price * quantity;

//   return <p>{`Total price: $${totalPrice.toFixed(2)}`}</p>;
// };

// const usePrice = (itemName) => {
//   const prices = {
//     Apple: 0.5,
//     Banana: 0.3,
//     Carrot: 0.2,
//     Donut: 1.0,
//     Egg: 0.1,
//   };
//   return prices[itemName] || 0;
// };

const FormItem = ({ items, onChange, quantity }) => {
  // The state to store the selected item name
  const [selectedItemName, setSelectedItemName] = useState(items[0].name);
  console.log("Selected Item Name", selectedItemName);
  const [selectedItemPrice, setSelectedItemPrice] = useState(0);
  const [itemInfoData, setItemInfoData] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  // A handler function to update the selected item name and call the onChange prop
  const handleItemChange = (value, name) => {
    console.log("HandleItemChange runs");
    console.log(value);
    setSelectedItemName(value);
    console.log(selectedItemName);
    // console.log(event.target.value);
    // setSelectedItemName(value);
    // onChange(value, quantity);
    // console.log("Value: ", value);
    // console.log("Quantity: ", quantity);
  };

  // A handler function to update the quantity and call the onChange prop
  const handleQuantityChange = (value) => {
    console.log("this runs");
    onChange(value);
    console.log("Value: ", value);
    console.log("Selected item name: ", selectedItemName);
  };

  const itemInfo = (budgetItemsData) => {
    return (
      <>
        <p>Item: {budgetItemsData.itemName}</p>
        <p>Quantity: {budgetItemsData.totalAmount}</p>
        <p>Price: {budgetItemsData.totalPrice}</p>
      </>
    );
  };

  const handleConfirm = () => {
    const budgetItemsData = {
      itemName: selectedItemName,
      totalAmount: quantity,
      totalPrice: selectedItemPrice,
    };

    console.log(budgetItemsData);
    setItemInfoData(budgetItemsData);
    setShowInfo(true);
  };

  const handleQuantity = (newQuantity) => {
    console.log("quantity changed:", newQuantity);
  };

  const handlePriceChange = (totalPrice) => {
    console.log("Total price changed:", totalPrice);
    setSelectedItemPrice(totalPrice);
    console.log(selectedItemPrice);
    // Do something with the totalPrice value, such as updating the state
  };

  return (
    <div>
      <h4>Item details</h4>
      {/* <DropdownMenu items={items} onChange={handleItemChange} /> */}
      <DropdownMenu items={items} onChange={handleItemChange} />
      <QuantityInput
        quantity={quantity}
        onChange={handleQuantityChange}
        onQuantChange={handleQuantity}
      />
      <Price
        items={items}
        itemName={selectedItemName}
        quantity={quantity}
        onPriceChange={handlePriceChange}
      />
      <button onClick={handleConfirm}>Confirm Item</button>
      {showInfo && itemInfo(itemInfoData)}
      {/* <p>
        {selectedItemName} {quantity}
      </p> */}
    </div>
  );
  // return (
  //   <>
  //     <h4>Item details</h4>
  //     <DropdownMenu items={items} onChange={onChange} />
  //     <QuantityInput quantity={quantity} onChange={onChange} />
  //   </>
  // );
};

export default FormItem;
