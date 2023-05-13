import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import Head from "next/head";

import { storeData } from "@/utils/storeData";
import Card from "@/components/ui/Card";
import BudgetItem from "@/components/diapchecks/BudgetItem";

import styles from "@/styles/BudgetPage.module.css";
import classes from "@/components/ui/Card.module.css";

const MAX_ITEMS = 6; // a constant used to set a limit on the amount of items that can be added in the form

const BudgetPage = ({ items }) => {
  // console.log(items); //checking purposes
  const [budget, setBudget] = useState("");
  const [visible, setVisible] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(0);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  // get access to the router object via useRouter hook to navigate programmatically
  const router = useRouter();

  const resetForm = () => {
    // reset the state variables to their initial values
    setItemList([]);
    setBudget(0);
    setTotalCost(0);
    setRemainingBudget(0);
    setVisible(false);
  };

  const handleBudgetChange = (event) => {
    // setBudget(parseFloat(event.target.value));
    let inputValue = parseInt(event.target.value);
    // check if the input value is a valid number
    if (!isNaN(inputValue) && inputValue !== "") {
      // if valid, update the state variable
      setBudget(inputValue);
    } else {
      // if not valid, do nothing or show an error message
      resetForm();
      console.log("Invalid input");
    }
  };

  const handleBudgetClick = (e) => {
    e.preventDefault();
    budget > 0 ? setVisible(true) : setVisible(false); // most probably not needed but kept it from my initial attempt to create the app, just visibility state updater
  };

  const handleItemChange = (index, type, value, itemName) => {
    setItemList((prevItemList) => {
      const newItemList = [...prevItemList];
      const item = newItemList[index];
      item[type] = value;
      item.name = `${itemName}`;
      // console.log("item name ", itemName);
      // console.log(`item[${index}][${type}] updated to ${value}`);
      // console.log("newItemList", newItemList); // for checking purposes
      return newItemList;
    });
  };
  const handleRemoveFormItem = (id) => {
    setItemList((prevItemList) => {
      // filter out the item that matches the id
      const newItemList = prevItemList.filter((item) => item.id !== id);
      // console.log("id number", id);
      // console.log("newItemList", newItemList);
      // check if the new item list is empty
      if (newItemList.length === 0) {
        // if empty, set the remaining budget to budget and total cost to 0
        setRemainingBudget(budget);
        setTotalCost(0);
        setSubmitDisabled(true);
      }

      return newItemList;
    });
  };
  //TODO check that itemList has the correct info/data
  const handleAddFormItem = (e) => {
    e.preventDefault();
    if (itemList.length < MAX_ITEMS) {
      setItemList((prevItemList) => [
        ...prevItemList,
        {
          id: uuidv4(), // creating the view model of itemList
          price: 144,
          quantity: 1,
          name: "Libero Touch 3",
        },
      ]);
      // console.log(itemList); // for checking purposes
    }
    if (itemList.length < 1) {
      setTotalCost(0);
    }
  };
  const handleCalculateTotalCost = (e) => {
    e.preventDefault();
    const newTotalCost = itemList.reduce((accumulator, item) => {
      // using logs to check that I'm getting the right values, test sort of
      // console.log(
      //   "accumulator:",
      //   accumulator,
      //   "item.price:",
      //   item.price,
      //   "item.quantity:",
      //   item.quantity
      // );
      // console.log("total cost: ", accumulator + item.price * item.quantity);
      return accumulator + item.price * item.quantity;
    }, 0);
    setTotalCost(newTotalCost);
    setSubmitDisabled(false);
  };

  useEffect(() => {
    // console.log(itemList); // for checking purposes
    const newRemainingBudget = budget - totalCost;
    setRemainingBudget(newRemainingBudget);
    // console.log(totalCost, budget, remainingBudget); // for checking purposes
  }, [totalCost, budget, itemList, remainingBudget]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemList.length < 1) {
      alert("Enter at least one item");
      return;
    }
    const budgetPlan = itemList.map((item) => {
      const newId = uuidv4(); // generate a new UUID
      const totalPrice = item.price * item.quantity; // calculate the total price
      const date = new Date().toISOString(); // get the current date, which seems better
      // const date = new Date().toISOString().slice(0, 10); // get the current date without time
      return { ...item, id: newId, budget, remainingBudget, totalPrice, date }; // replace the old id and add the new totalPrice, the budget, remaining budget and the date properties
    });

    console.log(budgetPlan);
    // use the fetching function that's in the utils folder, should've called it useStoreData maybe?
    storeData(
      budgetPlan,
      "https://next-budget-app-default-rtdb.europe-west1.firebasedatabase.app/budgetplans.json"
    );
    // navigate to the budget-lists page programmatically usinf the useRouter hook of next.js
    router.push("/budget-lists");
  };

  return (
    <>
      <Head>
        <title>DiapOneOne create a new budget plan</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section id="budget-content">
        <h1>Set The Bar</h1>
        <br />

        <Card className={styles.container}>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>New Budget Plan</legend>
              <section className={styles.budgetContainer} id="budget-inputs">
                <div className={styles.wrapper}>
                  <div className={styles.control}>
                    <label htmlFor="budget">Enter your budget:</label>
                    <input
                      type="number"
                      id="budget"
                      // value={budget} not using this just to skip the initial 0 value
                      min={0}
                      onChange={handleBudgetChange}
                      required
                    />
                  </div>
                  <div className={styles.control}>
                    <p>Your budget: {budget} SEK</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleBudgetClick}
                  className={styles.primary}
                >
                  Specify budget
                </button>
              </section>

              {visible && (
                <>
                  {itemList.map((item, index) => (
                    <Card key={item.id} className={classes.flexBetween}>
                      <BudgetItem
                        key={item.id}
                        items={items}
                        quantity={item.quantity}
                        price={item.price}
                        name={item.name}
                        // onChange={onChange}
                        onQuantityChange={(quantity, itemName) =>
                          handleItemChange(
                            index,
                            "quantity",
                            quantity,
                            itemName
                          )
                        }
                        onPriceChange={(price, itemName) =>
                          handleItemChange(index, "price", price, itemName)
                        }
                        onRemove={() => handleRemoveFormItem(item.id)}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveFormItem(item.id)}
                        className={styles.danger}
                      >
                        Remove Item
                      </button>
                    </Card>
                  ))}
                  <section
                    className={styles.buttonsContainer}
                    id="action-buttons"
                  >
                    <button
                      onClick={handleAddFormItem}
                      disabled={itemList.length === MAX_ITEMS}
                      className={styles.primary}
                    >
                      Add Item
                    </button>
                    {itemList.length > 0 && (
                      <button
                        type="button"
                        onClick={handleCalculateTotalCost}
                        className={styles.primary}
                      >
                        Calculate Total
                      </button>
                    )}
                  </section>
                  <section className={styles.amounts}>
                    <p>Total cost: {totalCost} SEK</p>
                    <p>
                      Remaining budget:{" "}
                      {remainingBudget < 0
                        ? `You'll be in dept with ${-remainingBudget} SEK`
                        : `${remainingBudget} SEK`}
                    </p>
                  </section>
                  <section className={styles.buttonsContainer}>
                    <button
                      type="submit"
                      disabled={submitDisabled}
                      className={styles.primary}
                    >
                      Submit Budget Plan
                    </button>
                  </section>
                  {submitDisabled && itemList.length > 0 && (
                    <p className={styles.centered}>
                      Click calculate total and then you can submit!
                    </p>
                  )}
                </>
              )}
            </fieldset>
          </form>
        </Card>
      </section>
    </>
  );
};

// The data fetching function that runs at build time
export const getStaticProps = async () => {
  // Fetch data from my firebase REST API using axios, did not add any error handling just to save time and since I had created a database so no errors were expected, might add some later
  const res = await axios.get(
    "https://next-budget-app-default-rtdb.europe-west1.firebasedatabase.app/items.json"
  );
  // Parse the JSON response
  const data = res.data;
  // Convert the data object into an array of items
  const items = Object.keys(data).map((key) => ({
    id: key,
    ...data[key],
  }));
  // Return the items as props
  return {
    props: {
      items,
    },
    // Enable Incremental Static Regeneration with a revalidation time of one hour
    revalidate: 3600,
  };
};

export default BudgetPage;
