//3 * Заполнить созданную таблицу буквами, отвечающими за шахматную фигуру,
// например К – король, Ф – ферзь и т.п.,
// причем все фигуры должны стоять на своих местах и быть соответственно черными и белыми.

function createChessDeck(w) {
    let body = document.body,
        tbl = document.createElement('table'); tbl.setAttribute('id', 'tdk')
    tbl.style.width = w + 'px'; tbl.style.height = w + 'px'; tbl.style.fontFamily = 'arial'
    tbl.style.borderCollapse = 'collapse'
    tbl.style.textAlign = 'center'; tbl.style.fontSize = (w / 16) + 'px'
    for (let r = 0; r < 10; r++) {
        let tr = tbl.insertRow()
        for (let c = 0; c < 10; c++) {
            let td = tr.insertCell()
            if ((0 < r && r < 9) && (0 < c && c < 9)) {
                td.style.width = '10%'; td.style.height = '10%'
                td.style.border = (1 + Math.trunc(w / 500)) + 'px solid #444';
                ((r + c) % 2 > 0) ? td.style.backgroundColor = '#742' : td.style.backgroundColor = '#ca7'
            } else {
                (0 < r && r < 9) ? td.textContent = 9 - r : (0 < c && c < 9) ? td.textContent = String.fromCharCode(64 + c) : true;
            }
        }
    }
    body.appendChild(tbl);
}

function resetChess(w) {//1, 0
    let figFld = [
        'л', 'к', 'с', 'ф', 'к', 'с', 'к', 'л',
        'п', 'п', 'п', 'п', 'п', 'п', 'п', 'п',
        ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
        'П', 'П', 'П', 'П', 'П', 'П', 'П', 'П',
        'Л', 'К', 'С', 'Ф', 'К', 'С', 'К', 'Л']
    let fn = 0
    // let deck = document.getElementById('tdk')
    let deck = document.getElementById('tdk').getElementsByTagName("td")
    w == 1 ? true : figFld = figFld.reverse()
    for (let x = 10; x <= 80; x += 10) {
        for (let y = 1; y <= 8; y++) {
            let c = x + y
            deck[c].style.color = (figFld[fn] == figFld[fn].toUpperCase() ? 'white' : 'black')
            deck[c].style.fontWeight = 'bold'
            deck[c].textContent = figFld[fn].toUpperCase()
            fn++
        }
    }
}

createChessDeck(500)
resetChess(1)