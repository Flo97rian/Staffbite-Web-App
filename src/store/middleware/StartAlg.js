import { API, Auth } from "aws-amplify";
import { FetchFromDB } from "./FetchPlansFromDB";

export function thunkStartAlg(id) {
    return async function startAlg(dispatch, getState) {
    const planid = id
    const apiName = 'api00f496d2'; // replace this with your api name.
    const path = '/schichtplan/befuellen'; //replace this with the path you have configured on your API
    const myInit = { // OPTIONAL
        headers: {
            Authorizer:`Bearer ${(await Auth.currentSession()).idToken.jwtToken}`,
      },
      body: planid
    };
    const response = await API.post(apiName, path, myInit)
    console.log("response", response)
    dispatch(FetchFromDB)
    }
}