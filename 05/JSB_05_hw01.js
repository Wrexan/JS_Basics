//1 Создать функцию, генерирующую шахматную доску.
// Можно использовать любые html-теги. Доска должна быть верно разлинована на черные и белые ячейки.
// Строки должны нумероваться числами от 1 до 8, столбцы — латинскими буквами A, B, C, D, E, F, G, H.

function createChessDeck(w) {
    var body = document.body,
        tbl = document.createElement('table')
    tbl.style.width = w + 'px'; tbl.style.height = w + 'px'
    tbl.style.borderCollapse = 'collapse'
    tbl.style.textAlign = 'center'; tbl.style.fontSize = (w / 16) + 'px'
    for (var r = 0; r < 10; r++) {
        var tr = tbl.insertRow()
        for (var c = 0; c < 10; c++) {
            var td = tr.insertCell()
            if ((0 < r && r < 9) && (0 < c && c < 9)) {
                td.style.width = '10%'; td.style.height = '10%'
                td.style.border = (1 + Math.trunc(w / 500)) + 'px solid #444';
                ((r + c) % 2 > 0) ? td.style.backgroundColor = '#742' : td.style.backgroundColor = '#fda'
            } else {
                (0 < r && r < 9) ? td.textContent = r : (0 < c && c < 9) ? td.textContent = String.fromCharCode(64 + c) : true;
            }
        }
    }
    body.appendChild(tbl);
}

createChessDeck(500)