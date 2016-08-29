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

addEmployee({name: 'name1', phone: '80000000000'});
addEmployee({name: 'name2', phone: '81111111111'});

export function addEmployee(attr) {
  const employee = new Employee();
  employee.id = `${employeeNextId++}`;
  employee.name = attr.name;
  employee.phone = attr.phone || '8xxxxxxxxxx';

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

export function removeEmployee(id) {
  employees = employees.filter(item => item.id !== id);
  return employees;
}