// 7. Сравнить null и 0. Попробуйте объяснить результат.

function doesEqual(a, b) {
    return a == b
}


a = 0
b = null
alert('(0 == null) = ' + doesEqual(a, b) +
    '\n0 - выделенная область в памяти определена как числовое значение' +
    '\nnull - выделенная область в памяти не определена и не является объектом')