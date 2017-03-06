function total(matrix) {
    var total = 0;
    for (var i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i];
        for (var j = 0; j < currentRow.length; j++) {
            var v = currentRow[j];
            total += v
        }
    }

    return total;
}


console.log(total([
  [1, 1, 0, 1, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 1, 0, 1]
]))
