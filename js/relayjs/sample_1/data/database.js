export class User {
  constructor(props) {
    if(props) {
      this.id = props.id;
      this.name = props.name;
    }
  }
}

export class Employee {};
export class Tag {};

var viewer = new User({id: '1', name: 'name'});

var employees = [];
var employeeByID = {};
var employeeNextId = 0;

var tags = [];
var tagByID = {};
var tagNextId = 0;


addEmployee({name: 'name1', phone: '80000000000', tags: [1, 2]});
addEmployee({name: 'name2', phone: '81111111111', tags: [0]});

addTag({name: "Manager"});
addTag({name: "CEO"});
addTag({name: "Developer"});

export function addEmployee(attr) {
  const employee = new Employee();
  employee.id = `${employeeNextId++}`;
  employee.name = attr.name;
  employee.phone = attr.phone || '8xxxxxxxxxx';
  employee.tags = attr.tags || [];

  employeeByID[employee.id] = employee;
  employees.push(employee);

  return employee.id;
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

export function addTag(attr) {
  const tag = new Tag();
  tag.id = `${tagNextId++}`;
  tag.name = attr.name;

  tagByID[tag.id] = tag;
  tags.push(tag);

  return tag.id;
}

export function getTag(id) {
  return tagByID[id];
}

export function getTags(id) {
  return employeeByID[id].tags.map((_id) => {
    return tagByID[_id];
  });
}

export function getUser() {
  return viewer;
}