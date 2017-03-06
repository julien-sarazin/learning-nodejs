function f(x) {
    var a = x || 0;
    return function g() {
        var b = x + 1;
        return b;
    }
}

var g = f(10);
console.log(g()); // returns '11'
g = f(2);
console.log(g()); // returns '3'
