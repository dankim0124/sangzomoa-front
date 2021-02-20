import React from "react";
import ReactDOM from "react-dom";
import Amplify from 'aws-amplify';

import config from './aws-exports';
import "./index.css";
import App from "./App";

Amplify.configure({
  Auth: {
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
  API: {
    endpoints: [
      {
        name: "sanzo_backend",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
    ],
  },
});

ReactDOM.render(<App />, document.getElementById("root"));
