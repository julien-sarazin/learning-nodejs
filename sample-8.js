function f(input) {
    let a = 100;

    if (input) {
        // Still okay to reference 'a'
        let b = a + 1;
        return b;
    }

    // Reference Error: 'b' doesn't exist here
    return b;
}

f(true);
f(false);
