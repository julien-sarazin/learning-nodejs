function f(condition, x) { // function scope
    if (condition) {
        let x = 100; // block scope
        return x;
    }

    return x;
}

console.log(f(false, 0)); // returns '0' from the function scope
console.log(f(true, 0));  // returns '100' from the block scope.
