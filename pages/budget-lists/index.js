import axios from "axios";

import Card from "@/components/ui/Card";
import classes from "@/styles/BudgetListsPage.module.css";

const BudgetListsPage = ({ budgetPlans }) => {
  return (
    <>
      <section className={classes.container}>
        <h1>Saved Budget Plans</h1>
        {budgetPlans !== (null && undefined) &&
          budgetPlans.map((plan, index) => (
            //loop through the budgetPlans data and for each plan create an unordered list
            // that outputs its elements
            // display the Date, Budget, Total cost, Remaining Budget and Expenses only
            //once per plan
            <ul key={plan.id}>
              <Card className={classes.container}>
                <h2>Budget DiapOne{index + 1}</h2>
                <Card className={classes.budgetInfo}>
                  <p>
                    <b>Date:</b> {plan.planItems[index].date}
                  </p>
                  <p>
                    <b>Budget:</b> {plan.planItems[index].budget} SEK
                  </p>
                  <p>
                    <b>Expenses:</b>{" "}
                    {plan.planItems[index].budget -
                      plan.planItems[index].remainingBudget}{" "}
                    SEK
                  </p>
                  <p>
                    <b>Remaining Budget:</b>{" "}
                    {plan.planItems[index].remainingBudget} SEK
                  </p>
                  <p>
                    {plan.planItems[index].remainingBudget < 0
                      ? `You smashed your budget and are in dept with ${-plan
                          .planItems[index].remainingBudget} SEK`
                      : `You restrained and still have ${plan.planItems[index].remainingBudget} SEK to spare`}
                  </p>
                </Card>
                <section className={classes.listContainer}>
                  {plan.planItems.map((item) => {
                    // const totalPrice = item.price * item.quantity;
                    return (
                      <li key={item.id}>
                        <div>
                          <h3>Item: {item.name}</h3>
                          <p>
                            <b>Price:</b> {item.price}
                          </p>
                          <p>
                            <b>Quantity:</b> {item.quantity}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </section>
              </Card>
            </ul>
          ))}
      </section>
    </>
  );
};

// The data fetching function that runs at build time, probably should have used a custom hook here for the data fetching since I'm using it in at least 2 pages
export const getStaticProps = async () => {
  // Use a try/catch block to catch any errors
  try {
    // Fetch data from my firebase REST API using axios
    const res = await axios.get(
      "https://next-budget-app-default-rtdb.europe-west1.firebasedatabase.app/budgetplans.json"
    );
    // Parse the JSON response
    const data = res.data;
    // Convert the response data object into a budgetPlans array made of planItems
    const budgetPlans = Object.keys(data).map((key) => ({
      id: key,
      planItems: [...data[key]],
    }));
    // Return the budgetPlans as props
    return {
      props: {
        budgetPlans,
      },
      // Enable Incremental Static Regeneration with a revalidation time of 10 minutes
      revalidate: 600,
    };
  } catch (error) {
    // Handle the error by logging it and returning an empty array as props
    console.error(error);
    return {
      props: {
        budgetPlans: [],
      },
    };
  }
};
export default BudgetListsPage;