// 1. С помощью цикла while вывести все простые числа в промежутке от 0 до 100.

lim_min = 0; var lim_max = 100;
var result = ''

function simples(l0, l1) {
    if (l0 < 2) l0 = 2
    var i = l0 + 1; result += 1 + ' '
    while (i <= l1) {
        got_it = 1; a = l0
        while (a < i) {
            if ((i % a) == 0) {
                got_it = 0
                break
            }
            a++
        }
        if (got_it) {
            result += i + ' '
        }
        i++
    }
    return result
}

alert('Простые числа от ' + lim_min + ' до ' + lim_max + ':\n' + simples(lim_min, lim_max))