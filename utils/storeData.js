import axios from "axios";
// A function to store data in Firebase Realtime Database using axios and the REST API, if no URL is provided, uses the url provided in here. not the best way to handle it
const storeData = async (data, URL) => {
  // The URL of my database, tweaked as I add an endpoint and .json so that items is created in the the db
  const url =
    "https://next-budget-app-default-rtdb.europe-west1.firebasedatabase.app/items.json";
  try {
    // The response from the post request
    if (URL) {
      const response = await axios.post(URL, data);
      console.log(response);
    } else {
      const response = await axios.post(url, data);
      // Log the response
      console.log(response);
    }
  } catch (error) {
    //TODO Display the error message in a better way
    alert(error.message);
    //* Or maybe use console.error(error.message)?
  }
};

export { storeData };
