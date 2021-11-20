const { 
    Employee,
} = require('./Employee.js');

class Employees {
    constructor() {
        this.employees = null;
    }
    createUserObjects(users) {

        function getUserDetails(user) {
            return {
                name: user.name["S"],
                schichtenwoche: user.schichtenwoche["N"],
                erfahrung: user.erfahrung["S"],
                position: JSON.parse(user.position["S"]),
                bewerbungen: JSON.parse(user.bewerbungen["S"]),
                schichten: JSON.parse(user.schichten["S"])
            }
        }

        function getUserID(user) {
            return user.SK["S"];
        }

        function createUserObject (user) {
            let userObject = {};
            let userID = getUserID(user);
            let userDetails = getUserDetails(user);
            userObject[userID] = userDetails;
            return userObject;
        }

        function createAllUsersObject (users) {
            let usersObject = {};
            users.forEach(user => {
                let userObject = createUserObject(user);
                usersObject = {...usersObject, ...userObject};
            });
            return usersObject;
        }
        let newEmployees = createAllUsersObject(users);
        this.employees = newEmployees;
    }
    
    createEmployeesInstance(employees) {
        this.employees = employees;
    }
    
    filterCurrentWeekDetails(zeitraum) {
        
        function getBewerbungsObject(employee, zeitraum) {
            return filterBewerbungsZeitraum(employee.bewerbungen, zeitraum)
        }
        
        function setBewerbungsArray(bewerbungen, zeitraum) {
            return bewerbungen[zeitraum];
        }
        
        function filterBewerbungsZeitraum(bewerbungen, zeitraum) {
            let bewerbungsArray = [];
            if (getKeys(bewerbungen).includes(zeitraum)) {
                bewerbungsArray = setSchichtenArray(bewerbungen, zeitraum)
                bewerbungen = bewerbungsArray
            } else {
                bewerbungen = bewerbungsArray;
            }
            
            return bewerbungen;
        }
        
        function getKeys(targetObject) {
            return Object.keys(targetObject);
        }
        
        function getSchichtenObject(employee, zeitraum) {
            return filterSchichtenZeitraum(employee.schichten, zeitraum)
        }
        
        function setSchichtenArray(schichten, zeitraum) {
            return schichten[zeitraum];
        }
        
        function filterSchichtenZeitraum(schichten, zeitraum) {
            let schichtenArray = [];
            if (getKeys(schichten).includes(zeitraum)) {
                //schichtenArray = setSchichtenArray(schichten, zeitraum)
                schichten = schichtenArray
                
            } else {
                schichten = schichtenArray;
            }
            return schichten;
        }
        
        function filterForEachEmployee(employees, zeitraum) {
            let employeesIds = getKeys(employees);
            employeesIds.forEach( employee => {
                employees[employee].bewerbungen = getBewerbungsObject(employees[employee], zeitraum);
                employees[employee].schichten = getSchichtenObject(employees[employee], zeitraum);
            })
            return employees;
        }
        
        let newEmployees = filterForEachEmployee(this.employees, zeitraum);
        this.employees = newEmployees
    }

    orderEmployeesAfterSet(settedEmployee) {
        

        function getEmployeeShiftCount (user) {
            let currentUser = new Employee(user);
            return currentUser.getShiftsCount();
        }

        function compareTwoEmployeesShiftCount (settedEmployee, nextEmployee) {
            let lessShifts = !1;
            if (getEmployeeShiftCount(settedEmployee) < getEmployeeShiftCount(nextEmployee)) {
                lessShifts = !0;
            }
            return lessShifts;
        }

        function getOrderedArrayLength (employees) {
            return employees.length;
        }

        function createOrderedArray(settedEmployee, employees) {
            let settedEmployeeInOrderedArray = !1
            let currentIndex = 0;
            employees.indexOf(settedEmployee);
            let orderedArrayLenght = getOrderedArrayLength(employees);
            while (!settedEmployeeInOrderedArray) {
                if(compareTwoEmployeesShiftCount(settedEmployee, employees[currentIndex])) {
                    employees.splice(currentIndex, 0, settedEmployee);
                } else if (currentIndex === orderedArrayLenght - 1 ) {
                    settedEmployeeHasMostShifts(settedEmployee, employees);
                }
                currentIndex += 1;
            }
            return employees;
            }

        function settedEmployeeHasMostShifts (currentIndex, settedEmployee, employees) {
            employees.splice(currentIndex, 0, settedEmployee);
            return employees;
        }

        let newOrderedEmployees = createOrderedArray(settedEmployee, this.orderedEmployees);
        
        this.orderedEmployees = newOrderedEmployees;
    }

    initalOrderedEmployees(employees) {
        function pushEmployeesToList(employees) {
            let orderedEmployees = [];
            Object.keys(employees).forEach(employee => {
                orderedEmployees.push(employee);
            })
            return orderedEmployees;
        }
    
        this.orderedEmployees = pushEmployeesToList(employees);
    }
    
    addShiftToShiftObject(employeeId, shiftName, shiftDay, shiftPosition) {
        let copyEmployees = {...this.employees};
        
        function getEmployeeDetials(copyEmployees, employeeId) {
            return copyEmployees[employeeId];    
        }
        
        function addShift(employee, shiftName, shiftPosition, shiftDay) {
            let shiftId = createShiftId(shiftName, shiftPosition, shiftDay);
            employee.schichten.push(shiftId);
            return employee;
        }
        
        function createShiftId(shiftName, shiftPosition, shiftDay) {
            return shiftName + "#" + shiftPosition + "#" + shiftDay
        }
        
        let employee = getEmployeeDetials(copyEmployees, employeeId);
        addShift(employee, shiftName, shiftPosition, shiftDay);
        this.setUpdatedEmployee(employeeId, employee);
        
    }
    
    removeShiftFromEmployee(employeeId, shiftKey) {
        let employee = this.getEmployee(employeeId);
        let index = employee.schichten.indexOf(shiftKey);
        this.employees[employeeId].schichten.splice(index, 1)
    }
    
    getAllEmployees() {
        return this.employees;
        
    }
    
    getAllEmployeesIds() {
        return Object.keys(this.employees);
        
    }
    
    applicantExists(applicantId) {
        let valid = !1;
        let employeeIds = this.getAllEmployeesIds()
        if(employeeIds.includes(applicantId)) {
            valid = !0;
        }
        return valid;
    }
    
    setUpdatedEmployee(employeeId, employee) {
        this.employees[employeeId] = employee;
    }
    
    getEmployee(employeeId) {
        let employee = this.employees[employeeId];
        return employee;
    }
}
module.exports = Employees;
