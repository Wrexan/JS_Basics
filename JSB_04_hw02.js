// 2. Продолжить работу с интернет-магазином:
// В прошлом домашнем задании вы реализовали корзину на базе массивов.
// Какими объектами можно заменить их элементы? Реализуйте такие объекты.
// Перенести функционал подсчета корзины на объектно-ориентированную базу.

Basket = {
    products: [
        { name: 'Ванная', price: 5000 }, 1,
        { name: 'Шкаф', price: 5500 }, 1,
        { name: 'Стул', price: 1450 }, 3,
        { name: 'Полка', price: 850 }, 2,
        { name: 'Стол', price: 2500 }, 1],

    countPrice: function () {
        let res = 0; let j = 0
        for (let i of this.products) {
            if (typeof (i) == 'object') { j = i.price } else { res += j * i }
        }
        return res
    }
}

alert('Корзина содержит:\n' + JSON.stringify(Basket.products) +
    '\nСтоимость всей корзины:\n' + JSON.stringify(Basket.countPrice()))