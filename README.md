# diaponeoneone-budget-checker
DiapOneOne is an app used to create a budget plan, choose items to be bought and then calculate prices, expenses...
Mainly for parents who can't control their shopping urges.

# Technology/methods
- The app is a Next.js app and utilises the getStaticProps method to fetch data and SSG (static site generation) during the build process,which is used to prerender the pages with data
if there's a request sent and it helps with SEO. 
- It alsos uses Firebase as a database/backend via the REST API

## **Preview**
The home page
<img width="1100" alt="image" src="https://github.com/AeosKayl/diaponeoneone-budget-checker/assets/91140647/e9f955ad-cfd6-426b-961c-24d2a95599a4">

DIAP page
<img width="1100" alt="image" src="https://github.com/AeosKayl/diaponeoneone-budget-checker/assets/91140647/858faf18-a292-4a03-a42f-8773c5c9a4a6">
<img width="1062" alt="image" src="https://github.com/AeosKayl/diaponeoneone-budget-checker/assets/91140647/3017f5ad-9ba5-4613-aa8d-500f777edd7b">



## **Before Installation**
Make sure that you are using node.js version of 18.16.0 in order to avoid issues with npm packages
if you have nvm installed, use the following code in your terminal to check if you have the mentioned version already

```
nvm list
```

if you have the version installed, type

```
nvm use 18.16.0
```
and you'll be using the above version of node

otherwise, you can install the required node version by visiting https://nodejs.org/en

## **Installation**
Open the folder in VSCode and using the terminal in the root folder type the following command to install

```
npm install
```

## **Using the app in dev mode**
To use the app in dev mode, run the following command in your terminal while you are in the root folder of the project

```
npm run dev
```
This will start the project in development mode and run the app on localhost, you can then click on the link in the terminal to open the app in the browser

# Budget Planner
You can then click on the DIAPP link in the navbar at the top or the explore button on the home page to get the the actual budget planner/checker page.
Note that this is still in development and it will be prompt to changes and updates since all the functionalities that I wish to include are not there yet.

## **Usage**
Just type a budget amount and click on the button to begin. Just for your info, the prices are not dynamic and do not reflect the actual prices of the items
you may find in the dropdown menu.
Nothing will happen if you go over budget, so go wild!
