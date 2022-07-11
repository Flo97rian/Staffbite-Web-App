import ReactGA from "react-ga";
const CREATE_SHIFTPLAN = "Create Shiftplan";
const CONTINUE_SHIFTPLAN = "Continue Shiftplan";
const CREATE_SHIFT = "Create Shift";
const SHARE_INVITATION_LINK = "Share Link";
const EDIT_SHIFT = "Edit Shift";
const CANCEL_ONBOARDING = "Cancel Onboarding";
const ONBOARDING_ADMIN_VIEW_NEXT = "Start Onboarding";
const ONBOARDING_EDIT_SHIFT = "Edit Shift Onboarding";
const ONBOARDING_SAVE_EDIT_SHIFT = "Edit Shift save Onboarding";
const ONBOARDING_ADD_SHIFT = "Create Shift Onboarding";
const ONBOARDING_SAVE_ADD_SHIFT = "Create Shift save Onboarding";




const catchAnalyticsEvent = (eventIndex) => {
    function sendEvent(actionText) {
        ReactGA.event({
            category: 'Demo',
            action: actionText,
        });
    }
    if(process.env.NODE_ENV !== "development") {   
        switch (eventIndex) {
            case 1:
                sendEvent(CREATE_SHIFTPLAN)
                break;
            case 2:
                sendEvent(CONTINUE_SHIFTPLAN)
                break;
            case 3:
                sendEvent(CREATE_SHIFT)
                break;
            case 4:
                sendEvent(SHARE_INVITATION_LINK)
                break;
            case 5:
                sendEvent(EDIT_SHIFT)
                break;
            case 6:
                sendEvent(CANCEL_ONBOARDING)
                break;
            case 7:
                sendEvent(ONBOARDING_ADMIN_VIEW_NEXT)
                break;
            case 8:
                sendEvent(ONBOARDING_EDIT_SHIFT)
                break;
            case 9:
                sendEvent(ONBOARDING_SAVE_EDIT_SHIFT)
                break;
            case 10:
                sendEvent(ONBOARDING_ADD_SHIFT)
                break;
            case 11:
                sendEvent(ONBOARDING_SAVE_ADD_SHIFT)
                break;
            default:
                break;
        }
    }
}

export default catchAnalyticsEvent;