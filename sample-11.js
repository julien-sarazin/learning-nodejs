// Named function
function foo(bar) {
  console.log(bar)
}

foo("Hello world");

// Anonymous function
const baz = function(bim) {
  foo("Hello " + bim)
}

baz(" =)")

/**
Here @success and @error are callbacks, meaning that we know from the implementation
that at least one of them will be invoked. Since they are "referenced" from the
function, they are, by definition, accessible anywhere inside the function.
*/
const callback = function(condition, error, success) {
  if (condition) {
    return success(null, condition);
  }

  return error(condition);
}

callback(true,
  function() {
    console.log("error")
  },
  function() {
    console.log("success")
  }
);

callback(false, function() { console.log("error") }, function() { console.log("success") });

/** Class definition.
Nothing except the convention tells us that this function represent a class.
As you will notice in javascript, most of the time, rule are not defined by the
language itself, which is very permissive, but rather by the conventions
from the developer community
*/
function User(name, age) {
  if (!name || !age) {
    return;
  }

  this.name = name;
  this.age = age;
}

User.prototype = {
  name: 'unkown',
  age: 0
};

let user = User();
