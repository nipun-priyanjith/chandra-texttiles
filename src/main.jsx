import React from 'react'
import ReactDOM from 'react-dom/client' // Importing ReactDOM for rendering
import App from './App.jsx' // Importing the main App component
import './index.css'// Importing styles
import { Provider } from 'react-redux'// Importing Provider to connect Redux store
import { store } from './redux/store.jsx'// Importing the Redux store
// Rendering the root component of the React application
// It uses ReactDOM's createRoot method to render the app into the DOM element with the ID 'root'
ReactDOM.createRoot(document.getElementById('root')).render(
  // Wrapping the entire app with React's StrictMode for additional checks and warnings
  <React.StrictMode>
    {/* Providing the Redux store to the entire app using Provider */}
    <Provider store={store}>
      {/* The main App component */}
      <App />
    </Provider>
  </React.StrictMode>,
)





