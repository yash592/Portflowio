import React, { Component } from 'react';
import logo from './logo.svg';
import ReactFilestack, {client} from 'filestack-react';
import stream from "getstream-node";
import Filestack from './components/Filestack';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import Land from './components/Okta/Land.js';
import Login from './components/Okta/Login.js';
import Protected from './components/Okta/Protected.js';
import Form from './components/Form/Form.js';


function onAuthRequired({history}) {
  history.push('/login');
}

const config = {
  issuer: 'https://dev-395184.oktapreview.com/oauth2/default',
  redirect_uri: 'http://localhost:3000/implicit/callback',
  client_id: "0oadot4zoxzmT4EZh0h7",
  scope: 'openid profile email'

};

class App extends Component {
  render() {
    return (
      <Router>

        <Security issuer= {config.issuer}
                   client_id= {config.client_id}
                   redirect_uri={config.redirect_uri}
                   onAuthRequired={onAuthRequired}
                    >
           <Route path='/' exact={true} component={Land} />
             <Route path='/login' render={()=><Login baseUrl="https://dev-395184.oktapreview.com"/>} />
             <SecureRoute path='/protected' component={Protected} />

           <Route path='/implicit/callback' component={ImplicitCallback} />
           </Security>
      </Router>
    );
  }
}



export default App;
