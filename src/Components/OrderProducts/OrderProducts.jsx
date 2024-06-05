import React from 'react';
import s from './OrderProducts.module.css'//Стили

//Компонент список товаров в заказе

function OrderProducts({ product }){
	//Функция - подсчет общей стоимости товаров в корзине
	let totalPrice = 0
	const useCart = () => {
		totalPrice = product.reduce((sum, obj) => (obj.product_price * obj.product_quantity) + sum, 0);
		return { totalPrice };
	};
	useCart()
	return(
		<div className={s.userCartItemsBlock}>
			<h3 className={s.userCartItemsHeader}>Товары в заказе</h3>
			<div className={s.userCartItemsListBlock}>
				<div className={s.cartItemsListHeader}>
					<div>Наименование</div>
					<div>Сумма</div>
				</div>
				{
					product.map((item, ind) => {
						return <div className={s.userCartItems} key={ind}>
							<div className={s.product_data}>{item.product_name}  ({item.product_price} руб.) х {item.product_quantity} шт.</div>
							<div>{item.product_price * item.product_quantity} $.</div>
						</div>

					})
				}
				<div className={s.totalCart}>
					<p>Итого на сумму: {totalPrice} $.</p>
				</div>
			</div>
		</div>
	)
};

export default OrderProducts;