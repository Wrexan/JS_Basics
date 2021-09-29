// 4 * Сделать так, чтобы товары в каталоге выводились при помощи JS:
// Создать массив товаров (сущность Product);
// При загрузке страницы на базе данного массива генерировать вывод из него.
// HTML-код должен содержать только div id=”catalog” без вложенного кода. Весь вид каталога генерируется JS.

Product = {
    div: document.getElementById('catalog'),
    products: [
        { id: 1, name: 'Ванная', price: 5000 }, 7,
        { id: 2, name: 'Диван', price: 5500 }, 5,
        { id: 3, name: 'Шкаф', price: 4200 }, 5,
        { id: 4, name: 'Стул', price: 1450 }, 3,
        { id: 5, name: 'Полка', price: 850 }, 2,
        { id: 6, name: 'Стол', price: 2500 }, 9],

}

Basket = {
    div: document.getElementById('basket'),
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
                    src.products[i + 1] > amt + 1 ? src.products[i + 1] -= amt : (amt = src.products[i + 1], src.products.splice(i, 2))
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
                console.log('Destination db is damaged!')
                this.add(from, item, amtx)
            }
        } else console.log('Source db is damaged, or item not exist!')
    }
}

Shop = {
    render: function (src, prod, amt) {
        Product.div.innerHTML = 'Магазин:'
        for (let i = 0; i < Product.products.length; i += 2) {
            Product.div.innerHTML += JSON.stringify(Product.products[i].name) + ' ' + Product.products[i + 1] + 'x' + JSON.stringify(Product.products[i].price) + 'р -'
        }
        Basket.div.innerHTML = '<br>Корзина:'
        for (let i = 0; i < Basket.products.length; i += 2) {
            Basket.div.innerHTML += JSON.stringify(Basket.products[i].name) + ' ' + Basket.products[i + 1] + 'x' + JSON.stringify(Basket.products[i].price) + 'р -'
        }
        Basket.products.length == 0 ? Basket.div.innerHTML += 'Корзина пуста' :
            Basket.div.innerHTML += '<br>В корзине: ' + Basket.countAmt() + ' товаров на сумму ' + Basket.countPrice() + ' рублей'
    }
}

ManageProducts.move(Product, Basket, 3, 2)
Shop.render()