# Super Health Inc.

This is a starter project for Super Health Inc. that was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
This application serves as a service for a hospital/clinic where it is supposed to keep track of its patients and their encounters/visits with our doctors. The application allows for the user to edit, add, and delete a patient. Although, a patient may only be deleted if they had no encounters linked to them. You can also add and edit encounters once you're in a specific patient's details page.

## Install Prerequisites

### Node Version Manager (NVM)

NVM is a utility to help you quickly install and switch between Node versions. With NVM, there is no need to manually install and uninstall versions.

Follow the Installation Steps for [NVM on GitHub](https://github.com/coreybutler/nvm-windows).

## Getting Started

1. Clone this project locally.
1. CD into the root folder
1. Run `npm install` in the root folder to install dependencies.

This command installs a package, and any packages that it depends on.

1. Run `npm start`.

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Dependencies
* Super Health Inc. api must be running. Confer with team resources if you are unsure. Make sure the front end is callign the same port as the backend.
* React Bootstrap version 2.5.0 is used in the project. To install it, run: npm install react-bootstrap bootstrap. It's called "react-boostrap"
* React-Router-Dom version 6.4.2 is used in the project. If it's not in the package.json, run: npm install react-router-dom@6
* Here is the link to the API for this project: (https://gitlab.ce.catalyte.io/training/cycleworkinggroups/nationwide/associates/brandon-alfaro/final-health-project-api/-/tree/main)

## Testing
* You can run tests with coverage via `npm run test:coverage`
* Tests are written using jest and 
* To run individual tests, type 'npm test testName'

# ESLint
* Maku sure ESLint is installed as an extension
* To validate all JS code and auto-format some easily reparable mistakes, run the linter: npm run lint. This is how you lint
* It's used to check sysntax and find problems and it uses commonJS modules
* The project is using Eslint-config-airbnb version 18.2.1.
* If Eslint-config is not on the cloned down project, run "npm install eslint-config-airbnb —-save-dev"
* In the .eslinrc file, make sure it extends ""airbnb" and "airbnb/hooks"
