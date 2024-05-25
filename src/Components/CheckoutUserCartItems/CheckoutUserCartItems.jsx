import React from 'react';
import s from './CheckoutUserCartItems.module.css'//Стили


//Компонент список товаров в корзине покупок - на странице подтверждения заказа
function CheckoutUserCartItems({ userCartItems }){
	//Функция - подсчет общей стоимости товаров в корзине
	let totalPrice = 0
	const useCart = () => {
		totalPrice = userCartItems.reduce((sum, obj) => (obj.product_price * obj.product_quantity) + sum, 0);
		return { totalPrice };
	};
	useCart()

	return(
		<div className={s.userCartItemsBlock}>
			<h3 className={s.userCartItemsHeader}>Товары к оформлению</h3>
			<div className={s.userCartItemsListBlock}>
				<div className={s.cartItemsListHeader}>
					<div>Наименование</div>
					<div>Сумма</div>
				</div>
				{
					userCartItems.map((item, ind)=>{
						return <div className={s.userCartItems} key={ind}>
							<div className={s.product_data}>{item.product_name}  ({item.product_price} руб.) х {item.product_quantity} шт.</div>
							<div>{item.product_price * item.product_quantity} руб.</div>
							</div>
							
					})
				}
				<div className={s.totalCart}>
					<p>Итого на сумму: {totalPrice} руб.</p>
				</div>
			</div>
		</div>
	)
};

export default CheckoutUserCartItems;