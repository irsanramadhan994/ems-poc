// src/index.js
import { Amplify } from "aws-amplify";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { createRoot } from "react-dom/client";
import awsconfig from "../aws-config";
import App from "./App";

Amplify.configure(awsconfig);

createRoot(document.getElementById("root")).render(<App />);
