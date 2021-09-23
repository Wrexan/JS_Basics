// 1. Написать функцию, преобразующую число в объект.
// Передавая на вход число от 0 до 999, мы должны получить на выходе объект,
// в котором в соответствующих свойствах описаны единицы, десятки и сотни.
// Например, для числа 245 мы должны получить следующий объект:
// {‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}.
// Если число превышает 999, необходимо выдать соответствующее
// сообщение с помощью console.log и вернуть пустой объект.

function num999ToObj(num) {
    if (num > 999) { console.log('Слишком большое число'); return {} }
    nums_obj = {}
    i = num % 10; num = Math.trunc(num / 10)
    nums_obj.единицы = i
    i = num % 10; num = Math.trunc(num / 10)
    nums_obj.десятки = i
    i = num % 10
    nums_obj.сотни = i
    return nums_obj
}

function str999ToObj(num) {
    if (num > 999) { console.log('Слишком большое число'); return {} } else num = String(num)
    return { 'единицы': Number(num[2]), 'десятки': Number(num[1]), 'сотни': Number(num[0]) }
}

n = Number(prompt('Введите число от 0 до 999:'))
alert(JSON.stringify(num999ToObj(n)) + '\n' + JSON.stringify(str999ToObj(n)))