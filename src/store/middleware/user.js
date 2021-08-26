import { Auth } from "@aws-amplify/auth";

export async function user(dispatch, getState) {
    const jwtToken =  (await Auth.currentSession()).idToken.jwtToken;
    const username =  (await Auth.currentSession()).idToken.payload.sub;
    const tenantid =  (await Auth.currentSession()).idToken.payload["custom:TenantId"];
    dispatch({type: "jwt", payload: jwtToken});
    dispatch({type: "username", payload: username});
    dispatch({type: "tenantid", payload: tenantid});
};