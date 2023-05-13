import { useRef, useState } from "react";

const DiapForm = (props) => {
  const budgetInput = useRef();
  const quantityInput = useRef();
  const priceInput = useRef();
  const [validBudget, setValidBudget] = useState(false);
  const [budget, setBudget] = useState(null);
  const [leftBudget, setLeftBudget] = useState(null);
  //console.log(enteredbudget);
  console.log(budget);
  // const postBudgetData = async (budgetData) => {
  //   const response = await fetch(
  //     "https://next-budget-app-default-rtdb.europe-west1.firebasedatabase.app/budget.json",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(budgetData),
  //     }
  //   );

  //   const data = await response.json();
  //   if (response.status === 201) {
  //     return console.log(data);
  //   }
  // };

  const budgetHandler = (e) => {
    e.preventDefault();
    const enteredbudget = budgetInput.current.value;
    // const enteredQuant = quantityInput.current.value;
    // const enteredPrice = priceInput.current.value;
    if (enteredbudget <= 0) return;
    // enteredbudget !== null ? setValidBudget(true) : setValidBudget(false);
    validBudget ? setBudget(enteredbudget) : setBudget(null);
    // setLeftBudget(budget - enteredPrice * enteredQuant);
  };

  const handleOnChange = () => {
    const enteredbudget = budgetInput.current.value;
    const enteredQuant = quantityInput.current.value;
    const enteredPrice = priceInput.current.value;
    console.log(budgetInput.current.value);
    console.log(enteredbudget);
    if (enteredbudget === 0) return;
    enteredbudget !== (0 || null)
      ? setValidBudget(true)
      : setValidBudget(false);
    //validBudget ? setBudget(enteredbudget) : setBudget(null);
    setLeftBudget(budget - enteredPrice * enteredQuant);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredbudget = budgetInput.current.value;
    const enteredQuant = quantityInput.current.value;
    const enteredPrice = priceInput.current.value;

    const budgetData = {
      budget: enteredbudget,
      quantity: enteredQuant,
      price: enteredPrice,
      leftover: leftBudget,
    };

    // postBudgetData(budgetData);
    props.onAddBudget(budgetData);
  };
  return (
    <form onChange={handleOnChange} onSubmit={(e) => submitHandler(e)}>
      <fieldset>
        <legend>
          <h2>Add New Budget</h2>
        </legend>
        <div className="control">
          <label htmlFor="budget-input">Your Budget</label>
          <input type="number" id="budget-input" ref={budgetInput} required />
          <button onClick={budgetHandler}>Add budget</button>
          <p>Budget is {+budget}</p>
          <p>
            {leftBudget >= 0
              ? `Your left budget is ${leftBudget}`
              : `Oh snap, you'll be in dept the amount of ${leftBudget}`}
          </p>
          {/* <p>Budget left would be {leftBudget}</p> */}
          {/* <p>Budget is {validBudget && budget !== "" ? budget : 0}</p> */}
        </div>
        {/* {budget > 0 && ( */}
        <>
          <div className="control">
            <label htmlFor="item">Item you wish to buy</label>
            <input type="text" placeholder="diapers" id="item" />
          </div>
          <div className="control">
            <label htmlFor="quant">quantity</label>
            <input type="number" id="quant" ref={quantityInput} />
          </div>
          <div className="control">
            <label htmlFor="price">Price per item</label>
            <input type="number" id="price" ref={priceInput} />
          </div>
          <div className="control">
            <label htmlFor=""></label>
            <input type="text" />
          </div>
        </>
        {/* )} */}
        <button type="submit">Submit budget plan</button>
      </fieldset>
    </form>
  );
};

export default DiapForm;
