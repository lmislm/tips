// call继承
// function Parent() {
// }
// function Child () {
//   Parent.call(this)
// }

// prototype的继承
// function Parent() {}
// function Child () {}
// Child.prototype = new Parent()

// 组合继承
// function Parent () {}
// function Child () {
//   Parent.call(this)
// }
// Child.prototype = new Parent()

// 寄生组合继承，组合继承的优化
function Parent() {}
function Child() {
  Parent.call(this);
}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;
/**
 * 寄生组合继承，范例
 * @param {*} name
 */
function Person(name) {
  this.name = name;
}
Person.prototype.sayName = function () {
  console.log("My name is " + this.name);
};

function Student(name, grade) {
  Person.call(this, name);
  this.grade = grade;
}
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;
Student.prototype.sayMyGrade = function () {
  console.log("My grade is" + this.grade);
};

// 原型式继承
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
// function Bromise () {
//   var self = this

//   self.status = 'pending'
//   self.data = undefined
//   self.onResolvedCallback = []
//   self.onRejectedCallback = []

// }

// Bromise.prototype.then = function (resolved, rejected) {

// }

// funtion resolvePromise() {

// }
