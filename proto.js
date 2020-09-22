function SuperType(name) {
  this.name = name
  this.fruits = ['apple', 'banana']
}

SuperType.prototype.sayName = function () {
  console.log(this.name)
}

function SubType(name, age) {
  SuperType.call(this, name)
  this.age = age
}

SubType.prototype = new SuperType()
SubType.prototype.contructor = SubType // change
SubType.prototype.sayAge = function () {
  console.log(this.age)
}


function proto (ob) {
  function F() {}
  F.prototype = ob
  return new F()
}