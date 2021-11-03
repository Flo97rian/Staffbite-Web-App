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
    console.log(event)
    console.log(event.body)
    let body = JSON.parse(event.body)
    let employees = await getEmployees(event)
    console.log(employees);
    let start = getStartDate(event);
    let end = getEndDate(event);
    let employeesReport = null
    if (body.auswahl.bewerbungen) {
    employeesReport = setBewerbungsCount(employees, start, end)
    }
    if (body.auswahl.schichten) {
    employeesReport = setSchichtenCount(employees, start, end)
    }
    console.log(employeesReport)
    
    //response
      const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        body: JSON.stringify(employeesReport),
    };
    return response
};

function getStartDate(event) {
  let body = JSON.parse(event.body)
  let startDateArray = body.auswahl.start.split(".")
  let start = new Date(startDateArray[2], startDateArray[1], startDateArray[0])
  return start
}

function getEndDate(event) {
  let body = JSON.parse(event.body)
  let endDateArray = body.auswahl.ende.split(".")
  let end = new Date(endDateArray[2], endDateArray[1], endDateArray[0])
  return end
}

const getEmployees = async (event) => {
      var ORG = "ORG#" + event.requestContext.authorizer["claims"]["custom:TenantId"];
    console.log(ORG);
     var params = {
        TableName: "Staffbite-DynamoDB",
        KeyConditionExpression: "#PK = :PK AND begins_with(#SK, :SK)",
        ExpressionAttributeNames: { "#PK": "PK" , "#SK": "SK" }, 
        ExpressionAttributeValues: { 
          ":PK": {"S": ORG},
          ":SK": {"S": "EMP#"}
        },
     };
    let data = null;
    try {
        data = await dynamodb.query(params).promise();
    } catch(error) {
      console.log(error);
      };
 return data.Items
};

function setBewerbungsCount(employees, start, end) {
  let copyEmployees = employees
  employees.forEach( employee => {
    copyEmployees[employee] = compareDatesBewerbung(employee, start, end)
    if (!Object.keys(copyEmployees[employee]).includes("bewerbungscount")) {
      copyEmployees[employee]["bewerbungscount"] = 0
    }
  })
  return copyEmployees;
}

function compareDatesBewerbung(employee, start, end) {
  let bewerbungen = JSON.parse(employee.bewerbungen["S"])
  Object.keys(bewerbungen).forEach(zeitraum => {
    let startDateArray = zeitraum.split(" - ")[0].split(".")
    let endDateArray = zeitraum.split(" - ")[1].split(".")
    let startDate = new Date(startDateArray[2], startDateArray[1], startDateArray[0])
    let endDate = new Date(startDateArray[2], startDateArray[1], startDateArray[0])
    let isStart = startDate.getTime() == start.getTime()
    let isBetweenStart = start.getTime() <= startDate.getTime()
    let isBetweenEnd = end.getTime() >= endDate.getTime()
    let isEnd = endDate.getTime() == end.getTime()
    console.log(isStart, isEnd)
    console.log(start, startDate)
    console.log(end, endDate)
    if ((isStart || isBetweenStart ) && ((isEnd || isBetweenEnd )) ) {
      if (Object.keys(employee).includes("bewerbungscount")) {
      employee["bewerbungscount"] = Number(employee["bewerbungscount"]) + Number(bewerbungen[zeitraum].length)
      } else {
        employee["bewerbungscount"] = Number(bewerbungen[zeitraum].length)
      }
    }
  });
  return employee
}

function setSchichtenCount(employees, start, end) {
  let copyEmployees = employees
  employees.forEach(employee => {
    copyEmployees[employee] = compareDatesSchichten(employee, start, end)
    if (!Object.keys(copyEmployees[employee]).includes("schichtencount")) {
      copyEmployees[employee]["schichtencount"] = 0
    }
  })
  return copyEmployees;
}
function compareDatesSchichten(employee, start, end) {
  let schichten = JSON.parse(employee.schichten["S"])
  Object.keys(schichten).forEach(zeitraum => {
    let startDateArray = zeitraum.split(" - ")[0].split(".")
    let endDateArray = zeitraum.split(" - ")[1].split(".")
    let startDate = new Date(startDateArray[2], startDateArray[1], startDateArray[0])
    let endDate = new Date(startDateArray[2], startDateArray[1], startDateArray[0])
    let isStart = startDate.getTime() == start.getTime()
    let isBetweenStart = start.getTime() <= startDate.getTime()
    let isBetweenEnd = end.getTime() >= endDate.getTime()
    let isEnd = endDate.getTime() == end.getTime()
    console.log(isStart, isEnd)
    console.log(start, startDate)
    console.log(end, endDate)
    if ((isStart || isBetweenStart ) && ((isEnd || isBetweenEnd )) ) {
      console.log("here")
      if (Object.keys(employee).includes("schichtencount")) {
      employee["schichtencount"] = Number(employee["schichtencount"]) + Number(schichten[zeitraum].length)
      } else {
        employee["schichtencount"] = Number(schichten[zeitraum].length)
      }
    }
  });
  return employee
}