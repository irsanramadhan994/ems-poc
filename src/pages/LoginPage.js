// src/LoginPage.js
import { Divider } from "@mui/material";
import { signIn } from "aws-amplify/auth";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import awsConfig from "../../aws-config";
import {
  cognitoOauth2,
  setAccessToken,
  setClockDrift,
  setIdToken,
  setLastAuthUser,
  setRefreshToken,
} from "../services/AuthServices";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();
  let [searchParams] = useSearchParams();

  useEffect(() => {
    checkSession();
    checkSSOSession();
  }, []);

  const handleSSOLogin = () => {
    window.location.href =
      "https://wfiws-dev-ems.auth.eu-west-1.amazoncognito.com/oauth2/authorize?identity_provider=wfiws-dev-ems-auth-azuresso&redirect_uri=http://localhost:3000/login&response_type=code&client_id=3fvarnllhmod5cm3aq845mlsfe&scope=aws.cognito.signin.user.admin%20email%20openid";
  };

  const checkSSOSession = () => {
    if (searchParams.get("code"))
      handleRedirectFromSso(searchParams.get("code"));
  };

  const handleRedirectFromSso = (code) => {
    cognitoOauth2(code).then((data) => {
      setRefreshToken(data);
      setClockDrift(data);
      setAccessToken(data);
      setLastAuthUser(data);
      setIdToken(data);
      navigation("/main");
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let auth = await signIn({
      username: email,
      password: password,
    });

    if (auth.isSignedIn) {
      navigation("/main");
    }
  };

  const checkSession = () => {
    let lastAuthUserSessionStorage = sessionStorage.getItem(
      "CognitoIdentityServiceProvider." +
        awsConfig.aws_user_pools_web_client_id +
        ".LastAuthUser"
    );
    let lastAuthUserlocalStorage = sessionStorage.getItem(
      "CognitoIdentityServiceProvider." +
        awsConfig.aws_user_pools_web_client_id +
        ".LastAuthUser"
    );
    let accessToken = "";
    if (lastAuthUserlocalStorage)
      accessToken = localStorage.getItem(
        "CognitoIdentityServiceProvider." +
          awsConfig.aws_user_pools_web_client_id +
          "." +
          lastAuthUserlocalStorage +
          ".accessToken"
      );
    if (lastAuthUserSessionStorage)
      accessToken = sessionStorage.getItem(
        "CognitoIdentityServiceProvider." +
          awsConfig.aws_user_pools_web_client_id +
          "." +
          lastAuthUserlocalStorage +
          ".accessToken"
      );

    if (accessToken) {
      navigation("/main");
    }
  };

  return (
    <Container id="loginContainer">
      <Row className="justify-content-md-center w-100">
        <Col xs={12} className="d-flex flex-column align-items-center gap-20">
          <h4>Sign In With</h4>
          <Button variant="primary" className="w-100" onClick={handleSSOLogin}>
            PMI AZURE SSO
          </Button>
          <Divider className="w-100 bg-dark" />

          <span>Or Sign In With Credentials</span>

          <Form
            id="loginForm"
            onSubmit={handleSubmit}
            className="w-100 d-flex flex-column align-items-center gap-20"
          >
            <Form.Group controlId="formEmail" className="w-100">
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="w-100">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Sign In
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
