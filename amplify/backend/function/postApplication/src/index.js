/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_STAFFBITEDYNAMODB_ARN
	STORAGE_STAFFBITEDYNAMODB_NAME
	STORAGE_STAFFBITEDYNAMODB_STREAMARN
Amplify Params - DO NOT EDIT */

var AWS = require('aws-sdk');
AWS.config.apiVersions = {
  dynamodb: '2012-08-10',
  // other service API versions
};
var dynamodb = new AWS.DynamoDB();

exports.handler = async (event) => {
    let body = JSON.parse(event.body);
    let user = body.user;
    let id = body.id;
    let planDB = await getShiftplan(user, id);
    let mitarbeiter = await getUser(user);
    await setUpdatedPlan(user, planDB, body, mitarbeiter);
    await updateEmployeeBewerbungen(planDB, body, user, mitarbeiter);
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            "Access-Control-Allow-Credentials": "true"
        },
        body: JSON.stringify("Done!"),
    };
    return response;
};

const updateEmployeeBewerbungen = async (planDB, body, user, mitarbeiter) => {
    let updatedMitarbeiter = new Mitarbeiter(mitarbeiter);
    await updatedMitarbeiter.mergeBewerbungen(planDB, body.plan);
    let bewerbungenObj = updatedMitarbeiter.getBewerbungen();
    var empparams = {
    Key: {
    "PK": {
     "S": "ORG#" + user["custom:TenantId"]
    }, 
    "SK": {
     "S": mitarbeiter.SK["S"]
    }
    },
    ExpressionAttributeNames: {
    "#bewerbungen": "bewerbungen",
    }, 
    ExpressionAttributeValues: {
                ":bewerbungen": {
                 "S": JSON.stringify(bewerbungenObj)
                }
    }, 
    ReturnValues: "ALL_NEW", 
    TableName: "Staffbite-DynamoDB", 
    UpdateExpression: "SET #bewerbungen = :bewerbungen"
    };
    let data = null
    try {
        data = await dynamodb.updateItem(empparams).promise();
    } catch(error) {
        data = error
    }
    return data;
}

const getShiftplan = async (user, id) => {
    var plan = null
    var params = {
      Key: {
       "PK": {
         S: "ORG#" + user["custom:TenantId"]
        }, 
       "SK": {
         S: id
        }
      }, 
      TableName: "Staffbite-DynamoDB"
     };

    try {
        plan = await dynamodb.getItem(params).promise();
    } catch(error) {
        console.log(JSON.stringify(error))
    }
    return plan.Item;
}

const getUser = async (user) => {
    var params = {
      Key: {
       "PK": {
         S: "ORG#" + user["custom:TenantId"]
        }, 
       "SK": {
         S: "EMP#" + user.sub
        }
      }, 
      TableName: "Staffbite-DynamoDB"
     };
     
    var mitarbeiter = null

    try {
        mitarbeiter = await dynamodb.getItem(params).promise();
    } catch(error) {
        console.log(JSON.stringify(error))
    }
    return mitarbeiter.Item;
}


const setUpdatedPlan = async (user, planDB, body, mitarbeiter) => {
    let updatedPlan = new Shiftplan(planDB, body.plan);
    await updatedPlan.mergePlans(mitarbeiter);
    let plan = updatedPlan.getMergedPlan();
    console.log(plan);
    var params = {
        Key: {
        "PK": {
         "S": "ORG#" + user["custom:TenantId"]
        }, 
        "SK": {
          "S": body.id
        }
    },
      ExpressionAttributeNames: {
       "#data": "data",
      }, 
      ExpressionAttributeValues: {
                    ":data": {
                     "S": JSON.stringify(plan)
                    }
      }, 
      ReturnValues: "ALL_NEW", 
      TableName: "Staffbite-DynamoDB", 
      UpdateExpression: "SET #data = :data"
        };
     
    var updated = null

    try {
        updated = await dynamodb.updateItem(params).promise();
    } catch(error) {
        updated = error
    }
    return updated;
}
    
class Shiftplan {
  constructor(planDB, planUser)  {
      this.userPlan = planUser;
      this.DBplan = JSON.parse(planDB.data["S"]);
  }
  
  mergePlans(mitarbeiter) {
   let copyDBPlan = [...this.DBplan];
   let copyUserPlan = [...this.userPlan];

  function setApplicantInShiftplan(copyDetails) {
    if (copyDetails.key !== "Wochentag") {
            if ("applicants" in copyDetails.value) {
            setFurtherApplicant(copyDetails);
        } else {
            setFirstApplicant(copyDetails);
        }       
    return copyDBPlan;
    };
  };
  
    function removeApplicantInShiftplan(copyDetails) {
        if (copyDetails.key !== "Wochentag") {
                if ("applicants" in copyDetails.value) {
                    removeApplicant(copyDetails)  
                }    
        return copyDBPlan;
        };
      };
    
    function filterValidShifts (copyDetails) {
        copyDetails.copyDBPlan.forEach((item,index) => {
            if (index !== 0 && index !== 1 && index !== copyDetails.copyPlanLength - 1 ) {
                for (let [key, value] of Object.entries(item)) {
                    if (checkAddApplicant(copyDetails.copyDBPlan[index][key], copyDetails.copyUserPlan[index][key])) {
                        console.log("checked add ", index, key)
                        setApplicantInShiftplan({...copyDetails, index: index, key, key, value: value});
                    } else if (checkRemoveApplicant(copyDetails.copyDBPlan[index][key], copyDetails.copyUserPlan[index][key])) {
                        console.log("checked remove ", index, key)
                        removeApplicantInShiftplan({...copyDetails, index: index, key, key, value: value});
                    };
                };
            };
        });
        return copyDBPlan;
    }
    
    function getCopyPlanLength (copyDBPlan) {
        return copyDBPlan.length
    }
    
    function setFirstApplicant(copyDetails) {
        let DBplan = copyDetails.copyDBPlan[copyDetails.index][copyDetails.key]
        let Userplan = copyDetails.copyUserPlan[copyDetails.index][copyDetails.key]
        if ("applicants" in Userplan) {
            if ( !("applicants" in DBplan)) {
                console.log("try set first")
                let newApplicant = Userplan["applicants"]
                copyDetails.copyDBPlan[copyDetails.index][copyDetails.key]["applicants"] = {...newApplicant}
            }
        }  
    return copyDetails.copyDBPlan;
    }

    function setFurtherApplicant(copyDetails) {
        
        let DBplan = copyDetails.copyDBPlan[copyDetails.index][copyDetails.key]
        let Userplan = copyDetails.copyUserPlan[copyDetails.index][copyDetails.key]
        if ("applicants" in Userplan) {
            if ( "applicants" in DBplan) {
                console.log("try set further", mitarbeiter.SK)
                if (mitarbeiter.SK["S"] in Userplan.applicants && !(mitarbeiter.SK["S"] in DBplan.applicants)) {
                    console.log("is setting")
                let currentApplicants = DBplan.applicants
                 copyDetails.copyDBPlan[copyDetails.index][copyDetails.key]["applicants"] = {...currentApplicants, [mitarbeiter.SK["S"]]: mitarbeiter.name["S"]};
                }
            }
        }
        return copyDetails.copyDBPlan;
    };
    
    function removeApplicant (copyDetails) {
        let DBplan = copyDetails.copyDBPlan[copyDetails.index][copyDetails.key]
        let Userplan = copyDetails.copyUserPlan[copyDetails.index][copyDetails.key]
        if ("applicants" in Userplan) {
            if ( "applicants" in DBplan) {
                console.log("try remove", mitarbeiter.SK)
                if (mitarbeiter.SK["S"] in DBplan.applicants && !(mitarbeiter.SK["S"] in Userplan.applicants)) {
                    let currentApplicants = DBplan.applicants
                    delete copyDetails.copyDBPlan[copyDetails.index][copyDetails.key]["applicants"][mitarbeiter.SK["S"]];
                }
            }
        }
        return copyDetails.copyDBPlan;
    }


    function checkAddApplicant(planDB, planUser) {
        let response = !1;
        let planDBHasApplicants = "applicants" in planDB;
        let planUserHasApplicants = "applicants" in planUser;
        if (planDBHasApplicants && planUserHasApplicants) {
            if (Object.keys(planDB.applicants).length < Object.keys(planUser.applicants).length && Object.keys(planUser.applicants).length !== 0) {
                console.log("IT ISS NEW")
                response = !0;
            }
        }
        else if (planUserHasApplicants && !planDBHasApplicants) {
            response = !0
        }
        return response;
    }
    
    function checkRemoveApplicant(planDB, planUser) {
        let response = !1;
        let planDBHasApplicants = "applicants" in planDB;
        let planUserHasApplicants = "applicants" in planUser;
        if (planDBHasApplicants && planUserHasApplicants) {
            if (Object.keys(planDB.applicants).length > Object.keys(planUser.applicants).length) {
                console.log("Remove")
                response = !0;
            }
        }
        else if (planUserHasApplicants && !planDBHasApplicants) {
            response = !0
        }
        return response;
    }
    let copyPlanLength = getCopyPlanLength(copyDBPlan);
    filterValidShifts({copyDBPlan: copyDBPlan, copyUserPlan: copyUserPlan, copyPlanLength: copyPlanLength, mitarbeiter: mitarbeiter});
    console.log(copyDBPlan);
    this.DBplan = [...copyDBPlan];
  };
  
  getAllDetails () {
      return {
          updatedPlan: this.DBplan,
          zeitraum: this.zeitraum,
      }
  };
  
  getMergedPlan() {
      return this.DBplan;
  }
  
  
};

class Mitarbeiter {
    constructor(mitarbeiter) {
        this.SK = mitarbeiter.SK["S"]
        this.bewerbungen = JSON.parse(mitarbeiter.bewerbungen["S"]);
    }
    
    
    mergeBewerbungen (copyDBPlan, copyUserPlan) {
    let bewerbungsArray = [];
    let copyBewerbungen = {...this.bewerbungen};
    
    
    function getZeitraum (copyPlan) {
        let zeitraum = copyPlan.zeitraum["S"]; 
        return zeitraum;
    }
    
    function filterValidShifts (bewerbungsArray, copyDetails) {
        let plan = JSON.parse(copyDetails.copyDBPlan.data["S"])
        plan.forEach((item,index) => {
            if (index !== 0 && index !== 1 && index !== copyDetails.copyPlanLength - 1 ) {
                    for (let [key, value] of Object.entries(item)) {
                        if (checkUnequalApplicants(plan[index][key], copyDetails.copyUserPlan[index][key])) {
                            getBewerbungsDetails(bewerbungsArray, {...copyDetails, index: index, key, key, value: value});
                        } else if(checkRemoveApplicant(plan[index][key], copyDetails.copyUserPlan[index][key])) {
                            removeBewerbungsDetails(bewerbungsArray, {...copyDetails, index: index, key, key, value: value});
                        }
                    };
                };
        });
    return  bewerbungsArray;
    }
    
    function checkUnequalApplicants(planDB, planUser) {
        let response = !1;
        let planDBHasApplicants = "applicants" in planDB;
        let planUserHasApplicants = "applicants" in planUser;
        if (planDBHasApplicants && planUserHasApplicants) {
            if (Object.keys(planDB.applicants).length < Object.keys(planUser.applicants).length && Object.keys(planUser.applicants).length !== 0) {
                response = !0;
            }
        }
        else if (planUserHasApplicants && !planDBHasApplicants) {
            response = !0
        }
        return response;
    }
    function checkRemoveApplicant(planDB, planUser) {
        let response = !1;
        let planDBHasApplicants = "applicants" in planDB;
        let planUserHasApplicants = "applicants" in planUser;
        if (planDBHasApplicants && planUserHasApplicants) {
            if (Object.keys(planDB.applicants).length > Object.keys(planUser.applicants).length) {
                console.log("Remove")
                response = !0;
            }
        }
        else if (planUserHasApplicants && !planDBHasApplicants) {
            response = !0
        }
        return response;
    }
    
    function getBewerbungsDetails (bewerbungsArray,copyDetails) {
        let plan = JSON.parse(copyDetails.copyDBPlan.data["S"])
        let getDay = copyDetails.key
        let getShiftName = plan[copyDetails.index]["Wochentag"].ShiftName;
        let getPosition = plan[copyDetails.index]["Wochentag"].ShiftPosition;
        bewerbungsArray.push(String(getShiftName + "#" + getPosition + "#" + getDay))
        return bewerbungsArray;
    }
    
    function removeBewerbungsDetails (bewerbungsArray, copyDetails) {
        let plan = JSON.parse(copyDetails.copyDBPlan.data["S"])
        let getDay = copyDetails.key
        let getShiftName = plan[copyDetails.index]["Wochentag"].ShiftName;
        let getPosition = plan[copyDetails.index]["Wochentag"].ShiftPosition;
        bewerbungsArray.push(String(getShiftName + "#" + getPosition + "#" + getDay))
        return bewerbungsArray;
    }
    
    function getCopyPlanLength (copyDBPlan) {
        return JSON.parse(copyDBPlan.data["S"]).length
    }
    
        let copyPlanLength = getCopyPlanLength(copyDBPlan);
        let zeitraum = getZeitraum(copyDBPlan);
        filterValidShifts (bewerbungsArray, {copyDBPlan: copyDBPlan, copyUserPlan: copyUserPlan, copyPlanLength: copyPlanLength});
        if (Object.keys(copyBewerbungen).includes(zeitraum)) {
            let copyBewerbung = copyBewerbungen[zeitraum];
            console.log(copyBewerbungen, bewerbungsArray)
            console.log(copyBewerbungen[zeitraum]);
            bewerbungsArray.forEach(item => {
                if (copyBewerbung.includes(item)) {
                    let index = copyBewerbung.indexOf(item);
                    copyBewerbung.splice(index, 1);
                } else {
                    copyBewerbung.push(item);
                }})
            console.log(copyBewerbung);
            this.bewerbungen = {...this.bewerbungen, [zeitraum]: copyBewerbung};
        } else {
            this.bewerbungen = {...this.bewerbungen, [zeitraum]: bewerbungsArray};
        }
    }
      
  getBewerbungen() {
      return this.bewerbungen;
  }
}