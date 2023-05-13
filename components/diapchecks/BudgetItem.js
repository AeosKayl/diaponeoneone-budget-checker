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
  console.log(items);
  console.log("quantity received: ", quant);
  console.log("price received, ", price);
  const [selectedOption, setSelectedOption] = useState(items[0]);
  // const [selectedOptionName, setSelectedOptionName] = useState(items[0].name);
  const [quantity, setQuantity] = useState(1);
  // const totalPrice = selectedOption ? selectedOption.price * quantity : 0;
  const totalPrice = selectedOption.price * quantity;
  console.log("totalPrice:", totalPrice);
  console.log("Selected Option", selectedOption);
  console.log("selected item name: ", selectedOption.name);
  console.log("name is equal", name);
  // console.log("selected Option Name:", selectedOptionName);

  // const createBudgetItem = () => {
  //   const budgetItem = {
  //     itemName: selectedOption.name,
  //     itemQuantity: quantity,
  //     itemPrice: totalPrice,
  //   };

  //   console.log(budgetItem);
  //   // onChange(budgetItem);
  // };

  // createBudgetItem();

  const handleOptionChange = (event) => {
    const selectedIndex = event.target.selectedIndex;
    setSelectedOption(items[selectedIndex]);
    onQuantityChange(quantity, items[selectedIndex].name);
    onPriceChange(items[selectedIndex].price, items[selectedIndex].name);
    console.log("selected Option price: ", items[selectedIndex].price);
    console.log(selectedOption);
    // onPriceChange(totalPrice);
  };

  // const handleQuantityChange = (event) => {
  //   setQuantity(parseInt(event.target.value));
  // };
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    console.log("newQuantity:", newQuantity);
    setQuantity(newQuantity);
    onQuantityChange(newQuantity, selectedOption.name);
    //onPriceChange(selectedOption.price);
  };

  return (
    <article className={classes.budgetItem} id="budget-item">
      <section className={classes.inputsWrapper}>
        <div className={classes.control}>
          <label htmlFor="dropdown">Select an item:</label>
          <select
            id="dropdown"
            onChange={handleOptionChange}
            value={selectedOption.id}
          >
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
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
      {/* <button>Confirm choice</button> */}
    </article>
  );
};

export default BudgetItem;

// import { useState } from "react";

// const DropdownQuantityPrice = ({ items }) => {
//   console.log(items);
//   const [selectedOption, setSelectedOption] = useState(items[0]);
//   const [quantity, setQuantity] = useState(1);
//   const totalPrice = selectedOption.price * quantity;

//   console.log("Selected option, ", selectedOption);
//   console.log("quantity, ", quantity);
//   // const handleOptionChange = (event) => {
//   //   setSelectedOption(
//   //     items.find((item) => item.id === parseInt(event.target.value))
//   //   );
//   // };

//   // const handleOptionChange = (event) => {
//   //   const selectedId = parseInt(event.target.value);
//   //   const selectedItem = items.find((item) => item.id === selectedId);
//   //   if (selectedItem) {
//   //     setSelectedOption(selectedItem);
//   //   }
//   // };
//   const handleOptionChange = (event) => {
//     const selectedIndex = event.target.selectedIndex;
//     setSelectedOption(items[selectedIndex]);
//   };

//   const handleQuantityChange = (event) => {
//     setQuantity(parseInt(event.target.value));
//   };

//   return (
//     <div>
//       <label htmlFor="dropdown">Select an item:</label>
//       <select
//         id="dropdown"
//         onChange={handleOptionChange}
//         value={selectedOption.id}
//       >
//         {items.map((item) => (
//           <option key={item.id} value={item.id}>
//             {item.name}
//           </option>
//         ))}
//       </select>
//       <label htmlFor="quantity">Quantity:</label>
//       <input
//         type="number"
//         id="quantity"
//         min="1"
//         value={quantity}
//         onChange={handleQuantityChange}
//       />
//       <p>Total Price: ${totalPrice.toFixed(2)}</p>
//     </div>
//   );
// };

// export default DropdownQuantityPrice;
