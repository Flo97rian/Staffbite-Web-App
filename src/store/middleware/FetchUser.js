import { API, Auth } from "aws-amplify";
import constants from "../constants";

export async function getUser(dispatch, getState) {
    const apiName = constants.env.apiGatewayPath; // replace this with your api name.
    const path = '/employee/get'; //replace this with the path you have configured on your API
    const myInit = { // OPTIONAL
        headers: {
            Authorizer:`Bearer ${(await Auth.currentSession()).idToken.jwtToken}`,
      } // OPTIONAL
    };
    const response = await API.get(apiName, path, myInit)
    dispatch({type: "All/GetUser", payload: response.Item})
    };