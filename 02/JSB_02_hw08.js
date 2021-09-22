// 8. *С помощью рекурсии организовать функцию возведения числа в степень.
// Формат: function power(val, pow), где val – заданное число, pow – степень.

function power(val, pow) {
    if (pow > 1) {
        val *= power(val, --pow)
    }
    return val
}

a = Number(prompt('Введите число, которое надо возвести в степень:\n'))
b = Number(prompt('Введите степень:\n'))
alert('a ^ b = ' + power(a, b))