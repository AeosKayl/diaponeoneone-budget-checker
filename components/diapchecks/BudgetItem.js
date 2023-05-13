import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Card from "../ui/Card";
import classes from "./BudgetItem.module.css";

// final form item component that I use to create budget items in  the form on the budget page
const BudgetItem = ({
  items, // getting the items dictionary to populate the select tag and its options
  quant,
  price,
  name,
  onQuantityChange,
  onPriceChange,
}) => {
  // for checking purposes
  //console.log(items);
  // console.log("quantity received: ", quant);
  // console.log("price received, ", price);
  const [selectedOption, setSelectedOption] = useState(items[0]);
  const [quantity, setQuantity] = useState(1);

  const totalPrice = selectedOption.price * quantity;
  // console.log("totalPrice:", totalPrice); // for checking purposes
  // console.log("Selected Option", selectedOption);
  // console.log("selected item name: ", selectedOption.name);
  // console.log("name is equal", name);
  // console.log("selected Option Name:", selectedOptionName);

  const handleOptionChange = (event) => {
    const selectedIndex = event.target.selectedIndex;
    setSelectedOption(items[selectedIndex]);
    onQuantityChange(quantity, items[selectedIndex].name);
    onPriceChange(items[selectedIndex].price, items[selectedIndex].name);
    // for checking purposes
    // console.log("selected Option price: ", items[selectedIndex].price);
    // console.log(selectedOption);
    // onPriceChange(totalPrice);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    //console.log("newQuantity:", newQuantity); // for checking purposes
    setQuantity(newQuantity);
    onQuantityChange(newQuantity, selectedOption.name);
    //onPriceChange(selectedOption.price);
  };

  return (
    <article className={classes.budgetItem} id="budget-item">
      <section className={classes.inputsWrapper}>
        <div className={classes.control}>
          <label>Select an item:</label>
          {/* TODO need a way to create unique ids for the select and input fields */}
          <select onChange={handleOptionChange} value={selectedOption.id}>
            {items.map(
              (
                item // populate the options with the item names based on the items array received as a prop from the parent component
              ) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              )
            )}
          </select>
        </div>
        <div className={classes.control}>
          <label>Quantity:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            required
          />
        </div>
      </section>
      <section className="priceContainer">
        <p>Total Price: {totalPrice.toFixed(2)} SEK</p>
      </section>
    </article>
  );
};

export default BudgetItem;
