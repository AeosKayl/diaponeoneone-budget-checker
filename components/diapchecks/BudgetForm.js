import { useState } from "react";
import Card from "../ui/Card";
// a second form that I tried to use as a component... might fix and use it later
const BudgetForm = (props) => {
  // The state to store the budget amount
  const [budget, setBudget] = useState("");
  // The state to store the visibility of the shopping cart buttons
  const [visible, setVisible] = useState(false);

  // A handler function to update the budget amount
  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
  };

  // A handler function to toggle the visibility of the shopping cart buttons
  const handleBudgetClick = () => {
    budget > 0 ? setVisible(true) : setVisible(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>New Budget</legend>
          <div>
            <label htmlFor="budget">Enter your budget:</label>
            <input
              type="number"
              id="budget"
              value={budget}
              onChange={handleBudgetChange}
              required
            />
            <button onClick={handleBudgetClick}>Specify budget</button>
          </div>
          {visible && props.children}
        </fieldset>
      </form>
    </Card>
  );
};

export default BudgetForm;
