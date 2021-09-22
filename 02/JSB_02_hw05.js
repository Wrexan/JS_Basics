//5. Реализовать четыре основные арифметические операции в виде функций с двумя параметрами. Обязательно использовать оператор return.

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

a = Number(prompt('Введите число а:'))
b = Number(prompt('Введите число b:'))
alert('a + b =' + sum(a, b) + '\na - b =' + sub(a, b) + '\na * b =' + mul(a, b) + '\na / b =' + div(a, b))