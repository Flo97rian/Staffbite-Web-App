import { API, Auth } from "aws-amplify";
import { FetchFromDB } from "./FetchPlansFromDB";

export function thunkDeleteShiftPlan({index, Plans}) {
  return async function deleteShiftPlan(dispatch, getState) {
    const plans = { Plans }
    const shiftplanIndex = { index }
    const apiName = 'api00f496d2'; // replace this with your api name.
    const path = '/schichtplan/delete'; //replace this with the path you have configured on your API
    const myInit = { // OPTIONAL
        headers: {
        Authorizer:`Bearer ${(await Auth.currentSession()).idToken.jwtToken}`,
      },
      body: plans.Plans[shiftplanIndex.index].id
    };
    const response = await API.post(apiName, path, myInit)
    dispatch(FetchFromDB)
    }}