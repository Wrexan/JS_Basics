// 2 (*) Для задачи со звездочкой из шестого урока реализовать функционал переключения между картинками по стрелкам на клавиатуре.

const isize = 160, mar = 16
var state = 0
Catalog = {
    div: document.getElementById('shop'),
    name: 'Каталог',
    bttext: 'addCart(this.id, 1)">Купить',
    isbask: 0,
    products: [
        { id: 1, name: 'Ванная', price: 5000, imgs: ['van1', 'van2', 'van3'] }, 7,
        { id: 2, name: 'Диван', price: 5500, imgs: ['div1', 'div2'] }, 5,
        { id: 3, name: 'Шкаф', price: 5200, imgs: ['shk1', 'shk2'] }, 5,
        { id: 4, name: 'Стул', price: 1450, imgs: ['stul1', 'stul2', 'stul3'] }, 3,
        { id: 5, name: 'Полка', price: 850, imgs: ['pol1', 'pol2', 'pol3'] }, 2,
        { id: 6, name: 'Стол', price: 2500, imgs: ['stol1', 'stol2'] }, 9],
}

Cart = {
    div: document.getElementById('shop'),
    stat: document.getElementById('status'),
    name: ['Состав корзины', 'Адрес доставки', 'Комментарий'],
    bttext: 'remCart(this.id, 1)">Удалить',
    products: [],
    countPrice: function () {
        let res = 0; let j = 0
        for (let i of this.products) {
            if (typeof (i) == 'object') { j = i.price } else { res += j * i }
        }
        return res
    },
    countAmt: function () {
        let res = 0
        for (let i = 0; i < this.products.length; i += 2) {
            res += this.products[i + 1]
        }
        return res
    }
}

ManageProducts = {
    add: function (src, prod, amt) {
        for (let i = 0; i < src.products.length; i += 2) {
            if (typeof (src.products[i]) == 'object') {
                if (src.products[i].id == prod.id) {
                    src.products[i + 1] += amt
                    return 1
                }
            } else return 0
        }
        src.products.push(prod, amt)
        return 2
    },
    get: function (src, id, amt) {
        for (let i = 0; i < src.products.length; i += 2) {
            if (typeof (src.products[i]) == 'object') {
                if (src.products[i].id == id) {
                    prod = src.products[i]
                    src.products[i + 1] > amt ? src.products[i + 1] -= amt : (amt = src.products[i + 1], src.products.splice(i, 2))
                    return [prod, amt]
                }
            } else return 0
        }
        return 0
    },
    // move: function (from, to, id, amt) {
    //     let [item, amtx] = this.get(from, id, amt)
    //     if (item != 0) {
    //         check = this.add(to, item, amtx)
    //         if (check == 0) {
    //             console.log(to.name + ' db is damaged!')
    //             this.add(from, item, amtx)
    //         }
    //     } else console.log(from.name + ' db is damaged, or item not exist!')
    // },
    search: function (src, id, amt) {
        for (let i = 0; i < src.products.length; i += 2) {
            if (typeof (src.products[i]) == 'object') {
                if (src.products[i].id == id) {
                    if (amt == 0) {
                        return src.products[i]
                    } else {
                        return [src.products[i], src.products[i + 1] > amt ? amt : src.products[i + 1]]
                    }
                }
            } else return 0
        }
        return 0
    },
    addCart: function (id, amt) {
        let [item, amtx] = this.search(Catalog, id, amt)
        if (item != 0) {
            check = this.add(Cart, item, amtx)
            UI.updStatus()
            if (check == 0) {
                console.log('Cart db is damaged!')
            }

        } else console.log('Catalog db is damaged, or item not exist!')
    },
    remCart: function (id, amt) {
        let [item, amtx] = this.get(Cart, id, amt)
        if (item != 0) {
            UI.updStatus()
            UI.updCartWindow()
        } else console.log('Cart db is damaged, or item not exist!')
    }
}

UI = {
    imgBig: '',
    imgWin: 0,
    iBMax: 0,
    iBNum: 0,
    iBItem: '',
    updCatWindow: function () {
        state = 0; UI.updStatus()
        Catalog.div.style = "width:100%;"
        Catalog.div.style.backgroundColor = "rgb(200, 215, 220)"
        Catalog.div.style.display = "inline-block"
        Catalog.div.style.textAlign = "center"
        Catalog.div.style.verticalAlign = "top"
        Catalog.div.innerHTML = `<p style="background-color:#fff;text-align:center;margin:${mar}px;font-weight: 900;">${Catalog.name}</p>`
        for (let i = 0; i < Catalog.products.length; i += 2) {
            Catalog.div.innerHTML +=
                `<id="itdiv" style="width:${isize}px;height:${isize}px;display:inline-block;border:1px solid #000;background-color:#fff;text-align:center;margin:${mar}px;">
                <img style="height: 100%; width: 100%; object-fit: contain;margin:0px;"
                id=i${Catalog.products[i].id} onclick="UI.updBImg(${Catalog.products[i].id})" src="img/catalog/.thumbs/t${Catalog.products[i].imgs[0]}.jpg"alt="Item pic"></img>
                <p style="margin:0px;"id=itname>${Catalog.products[i].name}</p>
                <p style="margin:0px;"id=itcost>${Catalog.products[i].price} рублей</p>
                <button style="vertical-align:bottom;" id=${Catalog.products[i].id} onclick="ManageProducts.${Catalog.bttext}</button></div><br>`
        }
        Catalog.div.innerHTML += `<br><br><br>`
    },
    updStatus: function () {
        let buttons = ''
        switch (state) {
            case 0: buttons = `<button onclick="UI.updCartWindow()">Корзина --></button>`; break
            // case 1: buttons = `<button onclick="UI.updCatWindow()"><-- Назад</button><button onclick="UI.updCartWindow()">Оформить покупку --></button>`; break
            // case 2: buttons = `<button onclick="UI.updCatWindow()"><-- Назад</button><button onclick="UI.updCartWindow()">Оформить покупку --></button>`; break
        }
        Cart.stat.style = "width:100%;"
        Cart.stat.style.backgroundColor = "rgb(200, 215, 220)"
        Cart.stat.style.display = "inline-block"
        Cart.stat.style.textAlign = "right"
        // Cart.stat.style.marginRight = `${mar}px`
        // Cart.stat.style.verticalAlign = "top"
        Cart.stat.innerHTML = Cart.products.length == 0 ? 'Корзина пуста' : `<div style="border:1px solid #444;margin-right:${mar}px;margin-left:${mar}px;vertical-align:middle;background-color:#fff;">
            Товаров в корзине: ${Cart.countAmt()} на сумму ${Cart.countPrice()} рублей
            ${buttons}</div>`
    },
    updCartWindow: function () {
        state = 1; UI.updStatus()
        Cart.div.style = "width:100%;"
        Cart.div.style.backgroundColor = "rgb(200, 215, 220)"
        Cart.div.style.display = "inline-block"
        Cart.div.style.textAlign = "center"
        Cart.div.style.verticalAlign = "top"
        Cart.div.innerHTML = ''
        carthead0 = document.createElement('carthead0')
        carthead0.innerHTML = `<div style="background-color:#fff;text-align:center;margin:${mar}px;font-weight: 900;">${Cart.name[0]}</div>`
        cartcont0 = document.createElement('cartcont0')
        for (let i = 0; i < Cart.products.length; i += 2) {
            cartcont0.innerHTML +=
                `<id="itdiv" style="width:${isize}px;height:${isize}px;display:inline-block;border:1px solid #000;background-color:#fff;text-align:center;margin:${mar}px;">
                <img style="height: 100%; width: 100%; object-fit: contain;margin:0px;"
                id=i${Cart.products[i].id} onclick="UI.updBImg(${Cart.products[i].id})" src="img/catalog/.thumbs/t${Cart.products[i].imgs[0]}.jpg"alt="Item pic"></img>
                <p style="margin:0px;"id=itname>${Cart.products[i].name}</p>
                <p style="margin:0px;"id=itcost>${Cart.products[i + 1]}шт. х ${Cart.products[i].price} рублей</p>
                <button style="vertical-align:bottom;" id=${Cart.products[i].id} onclick="ManageProducts.${Cart.bttext}</button></div>`
        }
        cartcont0.innerHTML += `<br><br><div style="margin:${mar}px;"><button onclick="UI.updCatWindow()"><-- Назад</button>
            <button onclick="{cartcont0.style.display='none';cartcont1.style.display='block'}">Оформить покупку --></button></div>`

        carthead1 = document.createElement('carthead1')
        carthead1.innerHTML = `<div style="background-color:#fff;text-align:center;margin:${mar}px;font-weight: 900;">${Cart.name[1]}</div>`
        cartcont1 = document.createElement('cartcont1')
        cartcont1.style.display = 'none'
        cartcont1.innerHTML = `<form name="adress"><input type="text" name="selo" size="32" maxlength="32" value="Забугровка" /></form>`
        cartcont1.innerHTML += `<br><br><div style="margin:${mar}px;"><button onclick="{cartcont1.style.display='none';cartcont0.style.display='block'}"><-- Назад</button>
            <button onclick="{cartcont1.style.display='none';cartcont2.style.display='block'}">Подтвердить адрес --></button></div>`

        carthead2 = document.createElement('carthead2')
        carthead2.innerHTML = `<div style="background-color:#fff;text-align:center;margin:${mar}px;font-weight: 900;">${Cart.name[2]}</div>`
        cartcont2 = document.createElement('cartcont1')
        cartcont2.style.display = 'none'
        cartcont2.innerHTML = `<form name="what"><textarea rows="15" cols="40" name="textArea"></textarea></form>`
        cartcont2.innerHTML += `<br><br><div style="margin:${mar}px;"><button onclick="{cartcont2.style.display='none';cartcont1.style.display='block'}"><-- Назад</button>
            <button onclick="{cartcont0.style.display='hide';cartcont2.style.display='none'}">Оплатить</button></div>`


        Cart.div.appendChild(carthead0)
        Cart.div.appendChild(cartcont0)
        Cart.div.appendChild(carthead1)
        Cart.div.appendChild(cartcont1)
        Cart.div.appendChild(carthead2)
        Cart.div.appendChild(cartcont2)


    },
    crtBImgWindow: function () {
        imgWin = document.createElement('div')
        imgWin.style = 'width:100%;height:100%;'
        imgWin.style.position = 'absolute'
        imgWin.style.left = '0'
        imgWin.style.top = '0'
        imgWin.style.display = 'none'
        imgWin.id = 'imgWin'
        imgWin.style.zIndex = "1"
        imgWin.style.backgroundColor = "rgba(0, 0, 0, 0.3)"
        imgWin.onclick = function (t) {
            let w = window.screen.width, h = window.screen.height
            if (t.clientX < (w / 4) || t.clientX > w - (w / 4) || t.clientY < (h / 7) || t.clientX > w - (w / 4)) imgWin.style.display = 'none'
        }
        imgWin.innerHTML +=
            '<div id="imgBack" style="width: 50%;height:70%;margin: 10% auto;border:1px solid #000;background-color:#fff;text-align:center;">' +
            '<img style="height: 100%; width: 100%; object-fit: contain;margin:0px;"' +
            'id="imgBig" src="img/catalog/' + Catalog.products[0].imgs[0] + '.jpg"alt="Item pic"></img>' +
            '<div id="imgToL" onclick="UI.slideBImg(0)" style="width: 25%;height:70%;margin: 10% auto;text-align:center;position: absolute;top:0%;left:25%"></div>' +
            '<div id="imgToR" onclick="UI.slideBImg(1)"style="width: 25%;height:70%;margin: 10% auto;text-align:center;position: absolute;top:0%;left:50%"></div></div>'

        document.getElementById("header").appendChild(imgWin)
        this.imgBig = document.getElementById("imgBig")
    },
    updBImg: function (id) {
        this.iBNum = 0
        this.iBItem = ManageProducts.search(Catalog, id, 0), this.iBMax = this.iBItem.imgs.length - 1
        this.imgBig.src = 'img/catalog/' + this.iBItem.imgs[this.iBNum] + '.jpg'
        imgWin.style.display = 'block'
    },
    slideBImg: function (side) {

        side == 1 ? (this.iBNum < this.iBMax ? this.iBNum++ : this.iBNum = 0) : (this.iBNum > 0 ? this.iBNum-- : this.iBNum = this.iBMax)
        this.imgBig.src = 'img/catalog/' + this.iBItem.imgs[this.iBNum] + '.jpg'
    },
    keyControl: function (k) {
        if (imgWin.style.display == 'block') {
            if (k.code = 'ArrowLeft') UI.slideBImg(0); else if (k.code = 'ArrowRight') UI.slideBImg(1)
        }
        // console.log('slideBImg: ' + k.code)
    },
}
function updHead() {
    let h = document.getElementById('header')
    h.style = 'width:100%;height:100%;'
    h.style.textAlign = 'center'
    h.style.backgroundColor = "rgb(200, 215, 220)"
    h.innerHTML = `<br><strong>Текстовый магазин 3000</strong><br><br>`
}

function init() {
    updHead()
    UI.crtBImgWindow()
    ManageProducts.addCart(4, 1)
    ManageProducts.addCart(5, 1)
    UI.updStatus()
    UI.updCatWindow()
    window.addEventListener('keydown', UI.keyControl)
}


window.onload = init;