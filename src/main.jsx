import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from "@react-oauth/google"

import store from "./store"
import { Provider } from "react-redux"

console.log()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={ store }>
      <GoogleOAuthProvider clientId={ import.meta.env.VITE_GOOGLE_CLIENTID }>
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>,
)
