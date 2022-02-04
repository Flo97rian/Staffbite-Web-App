import { API } from "aws-amplify";
import { API_HOSTNAME, CONTACT_FORM } from "../../constants/ApiConstants";
export function thunkSendContactForm(form) {
    return async function sendContactForm(dispatch, getState) {
      const apiName = API_HOSTNAME; // replace this with your api name.
      const path = CONTACT_FORM; //replace this wi
      const myInit = { // OPTIONAL
          body: {
              subject: form.subject,
              message: form.message,
              firstname: form.firstname,
              lastname: form.lastname,
              email: form.email,
              tel: form.tel,
              org: form.org
          }
      };
      API.post(apiName, path, myInit)
      .then(response => {
        if (response === "Message send!") {
            dispatch({type: "setEmailIsSend"})
        } else {
            dispatch({type: "setEmailNotSend"})
        }
      })

    }
};