import { API, Auth } from "aws-amplify";
import { API_HOSTNAME, FETCH_ADMIN } from "../../constants/ApiConstants";
import constants from "../constants";

export async function getAdmin(dispatch, getState) {
    const apiName = API_HOSTNAME; // replace this with your api name.
    const path = FETCH_ADMIN; //replace this with the path you have configured on your API
    const myInit = { // OPTIONAL
        headers: {
            Authorizer:`Bearer ${(await Auth.currentSession()).idToken.jwtToken}`,
      } // OPTIONAL
    };
    const response = await API.get(apiName, path, myInit)
    dispatch({type: "All/GetUser", payload: response})
    };