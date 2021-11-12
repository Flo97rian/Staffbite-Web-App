const { 
    Employee,
} = require('./Employee.js');

export class Employees {
    createUserObject(users) {

        function getUserDetails(user) {
            return {
                name: user.name,
                email:user.email,
                schichtenwoche: user.schichtenwoche,
                erfahrung: user.erfahrung,
                position: user.position,
                stundenlohn: user.stundenlohn,
                zielmtleuro:user.zielmtleuro,
                zielmtlh:user.zielmtlh,
            }
        }

        function getUserID(user) {
            return user.SK;
        }

        function createUserObject (user) {
            let userObject;
            let userID = getUserID(user);
            let userDetails = getUserDetails(user);
            userObject = {[userID]: userDetails}
            return userObject;
        }

        function createAllUsersObject (users) {
            let usersObject = {};
            users.forEach(user => {
                let userObject = createUserObject(user);
                usersObject = {...usersObject, userObject};
            });
            return usersObject;
        }

        this.employees = createAllUsersObject(users);
    }

    orderEmployeesAfterSet (settedEmployee) {
        

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
}

