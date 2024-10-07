// src/index.js
import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import {  Amplify } from 'aws-amplify'
import 'bootstrap/dist/css/bootstrap.min.css';

import awsconfig from '../aws-config'




Amplify.configure(awsconfig)
const domNode = document.getElementById('root');

const root = createRoot(domNode);


root.render(

      <App />

)
