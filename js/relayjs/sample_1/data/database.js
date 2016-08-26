export class User {
  constructor(props) {
    if(props) {
      this.id = props.id;
      this.name = props.name;
    }
  }
}

export class Employee {};

var viewer = new User({id: '1', name: 'name'});

var employees = [];
var employeeByID = {};
var employeeNextId = 0;

addEmployee('name1');
addEmployee('name2');

export function addEmployee(name) {
  const employee = new Employee();
  employee.id = `${employeeNextId++}`;
  employee.name = name;

  employeeByID[employee.id] = employee;
  employees.push(employee);

  return employee.id;
}

export function getUser() {
  return viewer;
}

export function getEmployee(id) {
  return employeeByID[id];
}

export function getEmployees() {
  return employees;
}