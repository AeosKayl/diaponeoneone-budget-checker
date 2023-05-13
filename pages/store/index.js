// Import React and useState hook
import { useState } from "react";
// Import the storeData function
import { storeData } from "../../utils/storeData";
import Card from "@/components/ui/Card";

// The page component, tI created and used this to populate the items database,
// might put this to a better use later on, perhaps a login requirement etc.
export default function Store() {
  // The state to store the user input for name
  const [name, setName] = useState("");
  // The state to store the user input for price
  const [price, setPrice] = useState("");

  // A handler function to update the input state
  const handleChange = (event) => {
    // Get the name and value of the target element
    const { name, value } = event.target;
    // Check which input is changed and update the corresponding state
    if (name === "name") {
      setName(value);
    } else if (name === "price") {
      setPrice(value);
    }
  };

  // A handler function to submit the form
  const handleSubmit = (event) => {
    // Prevent the default browser behavior
    event.preventDefault();
    // Check if both inputs are not empty
    if (name && price) {
      // Create a data object with name and price properties
      const data = { name, price };
      // Console log and then call the storeData function with the data object
      console.log(data);
      storeData(data);
      // Clear the input states
      setName("");
      setPrice("");
    }
  };

  return (
    <div>
      <Card>
        <h1>Store Data</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="item-name">Name of item</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            id="item-name"
            required
          />
          <label htmlFor="item-price">Price of item</label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={handleChange}
            id="item-price"
            required
          />
          <button type="submit">Store</button>
        </form>
      </Card>
    </div>
  );
}
