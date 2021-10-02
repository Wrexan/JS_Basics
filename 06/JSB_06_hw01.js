// 2 Сделать генерацию корзины динамической: верстка корзины не должна находиться в HTML-структуре.
// Там должен быть только div, в который будет вставляться корзина, сгенерированная на базе JS:
// Пустая корзина должна выводить строку «Корзина пуста»;
// Наполненная должна выводить «В корзине: n товаров на сумму m рублей».

Product = {
    div: document.getElementById('catalog'),
    bttext: ' onclick="ManageProducts.addBasket(this.id, 1)">Купить',
    isbask: 0,
    products: [
        { id: 1, name: 'Ванная', price: 5000 }, 7,
        { id: 2, name: 'Диван', price: 5500 }, 5,
        { id: 3, name: 'Шкаф', price: 5200 }, 5,
        { id: 4, name: 'Стул', price: 1450 }, 3,
        { id: 5, name: 'Полка', price: 850 }, 2,
        { id: 6, name: 'Стол', price: 2500 }, 9],

}

// Sold = {
//     div: document.getElementById('basket'),
//     products: [],
//     countPrice: function () {
//         let res = 0; let j = 0
//         for (let i of this.products) {
//             if (typeof (i) == 'object') { j = i.price } else { res += j * i }
//         }
//         return res
//     },
//     countAmt: function () {
//         let res = 0
//         for (let i = 0; i < this.products.length; i += 2) {
//             res += this.products[i + 1]
//         }
//         return res
//     }
// }

Basket = {
    div: document.getElementById('basket'),
    bttext: ' onclick="ManageProducts.remBasket(this.id, 1)">Удалить',
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
    move: function (from, to, id, amt) {
        let [item, amtx] = this.get(from, id, amt)
        if (item != 0) {
            check = this.add(to, item, amtx)
            if (check == 0) {
                console.log(to.name + ' db is damaged!')
                this.add(from, item, amtx)
            }
        } else console.log(from.name + ' db is damaged, or item not exist!')
    },
    search: function (src, id, amt) {
        for (let i = 0; i < src.products.length; i += 2) {
            if (typeof (src.products[i]) == 'object') {
                if (src.products[i].id == id) {
                    return [src.products[i], amt]
                }
            } else return 0
        }
        return 0
    },
    addBasket: function (id, amt) {
        console.log('нажата кнопка id=' + id)
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
        console.log('нажата кнопка id=' + id)
        let [item, amtx] = this.get(Basket, id, amt)
        console.log(check + ' ' + item)
        if (item != 0) {
            Shop.render(Basket)
        } else console.log('Basket db is damaged, or item not exist!')
    }
}

Shop = {
    // renderA: function () {
    //     // let itDesign = document.createElement('div')
    //     // itDesign.innerHTML = 
    //     // '<id="itdiv" style="width:200px;height:400px;border:1px solid #000;background-color= #eee">'+
    //     // //'<img src="/media/examples/leopard.jpg"alt="Item pic">'+
    //     // '<p id=itname>Название товара</p>'+
    //     // '<button id=itbuybbt onclick="ManageProducts.toBasket(this.id)">Купить</button>'
    //     // // <button id=itbuy onclick="ManageProducts.addToCart()">Купить</button>
    //     // Product.div.innerHTML = '<div style="width:500px;height:1600px;border:1px solid #000;background-color= #efe"></div>'
    //     // Product.div.style = "width:560px;height:544px;"
    //     const isize = 160, pad = 16, mar = 16
    //     // let b = ((Product.products.length / 2) * (isize + mar * 2) + mar)
    //     // let a = "width:40%;height:" + b + "px;"
    //     Product.div.style = "width:46%;"
    //     // Product.div.style += "height:" + b + "px;"
    //     // Product.div.style = a//"width:40%;height:" + ((Product.products.length / 2) * (isize + mar * 2)) - pad * 2 + "px;"
    //     // Product.div.style.padding = pad + "px"
    //     // Product.div.style.justifyContent = "space-evenly"
    //     Product.div.style.backgroundColor = "#ddd"
    //     Product.div.style.display = "inline-block"
    //     Product.div.style.textAlign = "center"
    //     for (let i = 0; i < Product.products.length; i += 2) {
    //         let itDesign = document.createElement('div')
    //         // itDesign.innerHTML =
    //         Product.div.innerHTML +=
    //             '<id="itdiv" style="width:' + isize + 'px;height:' + isize + 'px;display:inline-block;border:1px solid #000;background-color:#fff;text-align:center;margin:' + mar + 'px;">' +
    //             // '<img src="/media/examples/leopard.jpg"alt="Item pic">123</img>' +
    //             '<p id=itname>' + Product.products[i].name + '</p>' +
    //             '<p id=itname>' + Product.products[i].price + ' рублей</p>' +
    //             '<button id=' + Product.products[i].id + ' onclick="ManageProducts.toBasket(this.id)">Купить</button></div>'
    //         // itDesign.element.setAttribute("id", Product.products[i].id)
    //         // Product.div.appendChild(itDesign)
    //         // document.getElementById("itbuybbt").setAttribute("id", Product.products[i].id)
    //         // itDesign.innerHTML += 
    //         // '<button id='+Product.products[i].id+' onclick="ManageProducts.toBasket(this.id)">Купить</button>'
    //         // Product.div.innerHTML += JSON.stringify(Product.products[i].name) + ' '
    //         //     + Product.products[i + 1] + 'x' + JSON.stringify(Product.products[i].price) + 'р -'
    //     }
    //     // Basket.div.innerHTML += '<div style="vertical-align:bottom;"><br>Корзина:'
    //     // for (let i = 0; i < Basket.products.length; i += 2) {
    //     //     Basket.div.innerHTML += JSON.stringify(Basket.products[i].name) +
    //     //         ' ' + Basket.products[i + 1] + 'x' + JSON.stringify(Basket.products[i].price) + 'р -'
    //     // }
    //     // Basket.products.length == 0 ? Basket.div.innerHTML += 'Корзина пуста' :
    //     //     Basket.div.innerHTML += '<br>В корзине: ' + Basket.countAmt() + ' товаров на сумму ' + Basket.countPrice() + ' рублей</div>'
    // },
    render: function (obj) {
        const isize = 160, pad = 16, mar = 16
        obj.div.style = "width:49%;"
        obj.div.style.backgroundColor = "#ddd"
        obj.div.style.display = "inline-block"
        obj.div.style.textAlign = "left"
        obj.div.style.verticalAlign = "top"
        obj.div.innerHTML = ''
        for (let i = 0; i < obj.products.length; i += 2) {
            let itDesign = document.createElement('div')
            obj.div.innerHTML +=
                '<id="itdiv" style="width:' + isize + 'px;height:' + isize + 'px;display:inline-block;border:1px solid #000;background-color:#fff;text-align:center;margin:' + mar + 'px;">' +
                //'<img src="/media/examples/leopard.jpg"alt="Item pic">123</img>' +
                '<p id=itname>' + obj.products[i].name + '</p>' +
                '<p id=itname>' + obj.products[i + 1] + 'шт. х ' + obj.products[i].price + ' рублей</p>' +
                '<button style="vertical-align:bottom;" id=' + obj.products[i].id + obj.bttext + '</button></div>'
        }
        if (obj.isbask == 1) {
            // let b = '<div style="vertical-align:bottom;border:1px solid #000;background-color:#fff;"><br>Корзина:'
            // for (let i = 0; i < obj.products.length; i += 2) {
            //     b += JSON.stringify(obj.products[i].name) +
            //         ' ' + obj.products[i + 1] + 'x' + JSON.stringify(obj.products[i].price) + 'р -'
            // }
            // obj.div.innerHTML += b
            obj.products.length == 0 ? obj.div.innerHTML += 'Корзина пуста' :
                obj.div.innerHTML += '<div style="vertical-align:middle;border:1px solid #000;background-color:#fff;">В корзине: '
                + obj.countAmt() + ' товаров на сумму ' + obj.countPrice() + ' рублей</div>'
        }
    },
}

function init() {
    // ManageProducts.move(Product, Basket, 3, 2)
    // ManageProducts.addBasket(1, 1)
    // ManageProducts.addBasket(2, 1)
    // ManageProducts.addBasket(3, 1)
    ManageProducts.addBasket(4, 1)
    ManageProducts.addBasket(5, 1)
    Shop.render(Product)
    Shop.render(Basket)
}


window.onload = init;