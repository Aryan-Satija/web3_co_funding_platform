import React from "react";
import  ReactDOM  from "react-dom/client";
import { BrowserRouter as Router} from "react-router-dom";
import {  ThirdwebProvider } from "@thirdweb-dev/react";
import {Sepolia} from '@thirdweb-dev/chains';
import { StateContextProvider } from "./utils/index.jsx";
import App from './App.jsx';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
const CLIENT_ID = process.env.CLIENT_ID;
// console.log("client id : ", CLIENT_ID);
root.render(
    <ThirdwebProvider activeChain={Sepolia} clientId="8d9aff97681664e8c9bd29636b65ffe4">
      <Router>
        <StateContextProvider>
          <App/>
          <ToastContainer/>
        </StateContextProvider>
      </Router>
    </ThirdwebProvider>
)