//4. Присвоить переменной а значение в промежутке [0..15]. С помощью оператора switch организовать вывод чисел от a до 15.

var a = i = 7; var lim = 15; res = ''

switch (i) {
    case lim - 15:
        res += i++ + ', '
    case lim - 14:
        res += i++ + ', '
    case lim - 13:
        res += i++ + ', '
    case lim - 12:
        res += i++ + ', '
    case lim - 11:
        res += i++ + ', '
    case lim - 10:
        res += i++ + ', '
    case lim - 9:
        res += i++ + ', '
    case lim - 8:
        res += i++ + ', '
    case lim - 7:
        res += i++ + ', '
    case lim - 6:
        res += i++ + ', '
    case lim - 5:
        res += i++ + ', '
    case lim - 4:
        res += i++ + ', '
    case lim - 3:
        res += i++ + ', '
    case lim - 2:
        res += i++ + ', '
    case lim - 1:
        res += i++ + ', '
    case lim:
        res += i
}

alert('a = ' + a + '; ' + a + ' to ' + lim + " =\n" + res)