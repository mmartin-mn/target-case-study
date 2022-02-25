# How to run

To run, you need to run `npm i` at the root level to install the npm packages. Then, you can simply run `npm start` at the root level to start the project.

To run the tests, simply run `npm test` or `npm test -- --coverage` if you want to see the code coverage. This should be done after npm packages are installed.

# Relavent packages

I started off by using create react app to start the project.

Pulling in primereact for components. It is what I am currently used to and for speed/familiarity I'm just going to use that.

Pulling in node-sass as I prefer to use scss instead of plain css. It just is easier to set up nested class name styles in case I need them.

# Dev decisions

Even though it wasn't specifically asked for, I am still setting up the components as if we wanted to do the "By Stop #" in the future. So I'm setting up the DepartureInfo component to be able to work independently from the selectors, so it could just be re-used in the future with minimal tweaks for the "By Stop #".

Seems like there is only ever 9 or so depatures returned at any time, so I'm just going to list them all. I can certainly add the ability to do something like they do on the website with a see more button, but since I have a ton of screen real-estate I'm going to keep it simple and list them all.

To make things simple, if any api error happens, I am just going to show a generic error to the user asking them to refresh.

# Below this is the default CRA readme, leaving it here just in case

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
