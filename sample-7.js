for (var i = 0; i < 10; i++) {
    setTimeout((function(i) { return function() { console.log(i); } }(i)), 100 * i);
}
