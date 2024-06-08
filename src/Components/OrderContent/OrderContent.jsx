import React from 'react';
import s from './OrderContent.module.css'//Стили

//Компонент - данные о заказе
function OrderContent({ order }){
	
	return(
		<div className={s.order_block}>
			<h3 className={s.order_content_header}>
				Данные о заказе
			</h3>
			<div className={s.order_content}>
				<div className={s.order_value}>
					<p className={s.order_title}>Получатель: </p>
					<p className={s.order_info}>{order.name}</p>
				</div>
				<div className={s.order_value}>
					<p className={s.order_title}>Контактный email: </p>
					<p className={s.order_info}>{order.email}</p>
				</div>
				<div className={s.order_value}>
					<p className={s.order_title}>Контактный номер телефона: </p>
					<p className={s.order_info}>{order.phone}</p>
				</div>
				<div className={s.order_value}>
					<p className={s.order_title}>Форма оплаты:</p>
					<p className={s.order_info}>
						{(() => {
							if (order.paymentType === "cash") {
								return (
									"Наличная при получении"
								)
							} else if (order.paymentType === "cashlessOnReceiving") {
								return (
									"Безналичная при получении"
								)
							} else {
								return (
									"Оплата при заказе"
								)
							}
						})()}
					</p>
				</div>
				<div className={s.order_value}>
					<p className={s.order_title}>Адрес доставки: </p>
					<p className={s.order_info}>{order.city.region} г.{order.city.city} ул. {order.adress} </p>
				</div>
				<div className={s.order_value}>
					<p className={s.order_title}>Ваш комментарий к заказу: </p>
					<p className={s.order_info}>{order.comment}</p>
				</div>
				<div className={s.order_value}>
					<p className={s.order_title}>Сумма заказа</p>
					<p className={s.order_info}>{order.totalPrice}  $.</p>
				</div>
			</div>
		</div>
	)
};

export default OrderContent;
