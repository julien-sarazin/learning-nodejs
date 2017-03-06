function User(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
}

User.prototype = {
    firstname: "unkown",
    lastname: "unkown"
};

User.prototype.sayHello = function(name) {
    console.log(`Hello ${name}, i'm ${this.firstname}`)
}

User.prototype.sayHelloBis = (name) => {
    console.log(`Hello ${name}, i'm ${this.firstname}`)
}

var user = new User("Foo", "Bar");

user.sayHello("Baz"); // Hello Baz, i'm Foo
user.sayHelloBis("Baz"); // Hello Baz, i'm undefined
