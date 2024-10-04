import config from '../../config.js';
import awsConfig from "../../aws-config.js";
import axios from 'axios';


export const cognitoOauth2 = async (code) => {
  try {
    let strUrl = config.CognitoCustomDomain;
    const details = {
      grant_type: "authorization_code",
      code: code,
      client_id: awsConfig.aws_user_pools_web_client_id,
      redirect_uri: config.SSO_CallbackUrl,
    };
    const formBody = Object.keys(details)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(details[key])}`
      )
      .join("&");
    let headers = {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    };
    let response = await axios.post(
      strUrl + "/oauth2/token",
      formBody,
      headers
    );
    headers.Authorization = "Bearer " + response.data.access_token;
    let userInfo = await axios.get(strUrl + "/oauth2/userInfo", {
      headers: headers,
    });

    return {
      token_info: response.data,
      user_info: userInfo.data,
    };
  } catch (error) {
    console.log(error);
    return {
      token_info: null,
      user_info: null,
    };
  }
};


export function setRefreshToken(data) {
    sessionStorage.setItem(
        "CognitoIdentityServiceProvider." +
        awsConfig.aws_user_pools_web_client_id +
        "." +
        data.user_info.sub +
        ".refreshToken",
        data.token_info.refresh_token
    );
}


export function setClockDrift(data) {
    sessionStorage.setItem(
        "CognitoIdentityServiceProvider." +
        awsConfig.aws_user_pools_web_client_id +
        "." +
        data.user_info.sub +
        ".clockDrift",
        1
    );
}

export function setAccessToken(data) {
    sessionStorage.setItem(
        "CognitoIdentityServiceProvider." +
        awsConfig.aws_user_pools_web_client_id +
        "." +
        data.user_info.sub +
        ".accessToken",
        data.token_info.access_token
    );
}

export function setLastAuthUser(data) {
    sessionStorage.setItem(
        "CognitoIdentityServiceProvider." +
        awsConfig.aws_user_pools_web_client_id +
        ".LastAuthUser",
        data.user_info.sub
    );
}

export function setIdToken(data) {
    sessionStorage.setItem(
        "CognitoIdentityServiceProvider." +
        awsConfig.aws_user_pools_web_client_id +
        "." +
        data.user_info.sub +
        ".idToken",
        data.token_info.id_token
    );
}