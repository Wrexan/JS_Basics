// 2 (*) У товара может быть несколько изображений. Нужно:
// a.Реализовать функционал показа полноразмерных картинок товара в модальном окне;
// b.Реализовать функционал перехода между картинками внутри модального окна.

Product = {
    div: document.getElementById('catalog'),
    name: 'Каталог',
    bttext: 'addBasket(this.id, 1)">Купить',
    isbask: 0,
    products: [
        { id: 1, name: 'Ванная', price: 5000, imgs: ['van1', 'van2', 'van3'] }, 7,
        { id: 2, name: 'Диван', price: 5500, imgs: ['div1', 'div2'] }, 5,
        { id: 3, name: 'Шкаф', price: 5200, imgs: ['shk1', 'shk2'] }, 5,
        { id: 4, name: 'Стул', price: 1450, imgs: ['stul1', 'stul2', 'stul3'] }, 3,
        { id: 5, name: 'Полка', price: 850, imgs: ['pol1', 'pol2', 'pol3'] }, 2,
        { id: 6, name: 'Стол', price: 2500, imgs: ['stol1', 'stol2'] }, 9],
}

Basket = {
    div: document.getElementById('basket'),
    name: 'Корзина',
    bttext: 'remBasket(this.id, 1)">Удалить',
    isbask: 1,
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
    addBasket: function (id, amt) {
        let [item, amtx] = this.search(Product, id, amt)
        if (item != 0) {
            check = this.add(Basket, item, amtx)
            Shop.render(Basket)
            if (check == 0) {
                console.log('Basket db is damaged!')
            }

        } else console.log('Product db is damaged, or item not exist!')
    },
    remBasket: function (id, amt) {
        let [item, amtx] = this.get(Basket, id, amt)
        if (item != 0) {
            Shop.render(Basket)
        } else console.log('Basket db is damaged, or item not exist!')
    }
}

Shop = {
    imgBig: '',
    iBMax: 0,
    iBNum: 0,
    iBItem: '',
    render: function (obj) {
        const isize = 160, mar = 16
        obj.div.style = "width:49%;"
        obj.div.style.backgroundColor = "#ddd"
        obj.div.style.display = "inline-block"
        obj.div.style.textAlign = "left"
        obj.div.style.verticalAlign = "top"
        obj.div.innerHTML = '<p style="background-color:#fff;text-align:center;margin:' + mar + 'px;font-weight: 900;">' + obj.name + '</p>'
        for (let i = 0; i < obj.products.length; i += 2) {
            obj.div.innerHTML +=
                '<id="itdiv" style="width:' + isize + 'px;height:' + isize + 'px;display:inline-block;border:1px solid #000;background-color:#fff;text-align:center;margin:' + mar + 'px;">' +
                '<img style="height: 100%; width: 100%; object-fit: contain;margin:0px;"' +
                'id=i' + obj.products[i].id + ' onclick="Shop.showImg(' + obj.products[i].id + ')" src="img/catalog/.thumbs/t' + obj.products[i].imgs[0] + '.jpg"alt="Item pic"></img>' +
                '<p style="margin:0px;"id=itname>' + obj.products[i].name + '</p>' +
                '<p style="margin:0px;"id=itcost>' + obj.products[i + 1] + 'шт. х ' + obj.products[i].price + ' рублей</p>' +
                '<button style="vertical-align:bottom;" id=' + obj.products[i].id + ' onclick="ManageProducts.' + obj.bttext + '</button></div>'
        }
        if (obj.isbask == 1) {
            obj.products.length == 0 ? obj.div.innerHTML += 'Корзина пуста' :
                obj.div.innerHTML += '<div style="vertical-align:middle;border:1px solid #000;background-color:#fff;">В корзине: '
                + obj.countAmt() + ' товаров на сумму ' + obj.countPrice() + ' рублей</div>'
        }
    },
    createImgWindow: function () {
        var imgWin = document.createElement('div')
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
            'id="imgBig" src="img/catalog/' + Product.products[0].imgs[0] + '.jpg"alt="Item pic"></img>' +
            '<div id="imgToL" onclick="Shop.listImg(0)" style="width: 25%;height:70%;margin: 10% auto;text-align:center;position: absolute;top:0%;left:25%"></div>' +
            '<div id="imgToR" onclick="Shop.listImg(1)"style="width: 25%;height:70%;margin: 10% auto;text-align:center;position: absolute;top:0%;left:50%"></div></div>'

        document.getElementById("shop").appendChild(imgWin)
        this.imgBig = document.getElementById("imgBig")
    },
    showImg: function (id) {
        this.iBNum = 0
        this.iBItem = ManageProducts.search(Product, id, 0), this.iBMax = this.iBItem.imgs.length - 1
        this.imgBig.src = 'img/catalog/' + this.iBItem.imgs[this.iBNum] + '.jpg'
        imgWin.style.display = 'block'
    },
    listImg: function (side) {
        side == 1 ? (this.iBNum < this.iBMax ? this.iBNum++ : this.iBNum = 0) : (this.iBNum > 0 ? this.iBNum-- : this.iBNum = this.iBMax)
        this.imgBig.src = 'img/catalog/' + this.iBItem.imgs[this.iBNum] + '.jpg'
    },
    hideImg: function (o) {
        o.style.display = 'none'
    }
}

function init() {
    Shop.createImgWindow()
    ManageProducts.addBasket(4, 1)
    ManageProducts.addBasket(5, 1)
    Shop.render(Product)
    Shop.render(Basket)
}


window.onload = init;