function User() {
    this.age = 0;

    setInterval(function() {
        this.age ++;
        console.log(`<User>: " I am older now! ${this.age} years old! "`);
    }, 1000)
}

var user = new User();

function ArrowUser() {
    this.age = 0;

    setInterval(() => {
        this.age ++;
        console.log(`<ArrowUser>: " I am older now! ${this.age} years old! "`);
    }, 1000)
}

var user = new ArrowUser();
