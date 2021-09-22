//6. Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation), где arg1, arg2 — значения аргументов, operation — строка с названием операции. В зависимости от переданного значения выполнить одну из арифметических операций (использовать функции из пункта 5) и вернуть полученное значение (применить switch).

function sum(a, b) {
    return a + b
}
function sub(a, b) {
    return a - b
}
function mul(a, b) {
    return a * b
}
function div(a, b) {
    return a / b
}
function mathOperation(arg1, arg2, operation) {
    switch (operation) {
        case 'sum':
            return sum(arg1, arg2)
        case 'sub':
            return sub(arg1, arg2)
        case 'mul':
            return mul(arg1, arg2)
        case 'div':
            return div(arg1, arg2)
    }
}


a = Number(prompt('Введите число а:'))
b = Number(prompt('Введите число b:'))
alert('a + b =' + mathOperation(a, b, 'sum') +
    '\na - b =' + mathOperation(a, b, 'sub') +
    '\na * b =' + mathOperation(a, b, 'mul') +
    '\na / b =' + mathOperation(a, b, 'div'))