import React from 'react';
import s from './Styles/Orders.module.css'//Стили
import { NavLink, Link } from 'react-router-dom';//Для ссылок
//url json-server
let url = 'http://localhost:3001/' // url-для сапросов на сервер




//Компонент - страница список заказов пользователя
function OrdersRage({ userOrdersList, productInOrder }){

	return(
		<section className={s.orders_list_block}>
			<h3 className={s.order_list_header}>
				Список ваших заказов
			</h3>
			<div className={s.order_list}>
				{
					userOrdersList.map((order, index)=>{
						return (
							<Link to={`${order.id}`} key={index} state={{ "order": order, "products": productInOrder.filter(i=>i.order_id===order.id) }}>
								<div  className={s.order_item}>
									<div className={s.index_order}>
										<p>{index}</p>
									</div>
									<div className={s.number_order}>
										<p>{order.id}</p>
									</div>
									<div className={s.date_order}>
										<p>от {order.data.split('-')[0]}.{order.data.split('-')[2].slice(0, 2)}.{order.data.split('-')[1]}</p>
									</div>
									<div className={s.product_order}>
										<div className={s.product_order_img_list}>
										{
											productInOrder.map((product, ind)=>{
												if (product.order_id === order.id) {
													return <img className={s.img_list_item} key={ind} src={product.product_image}></img>
												}
												else return ""
											})
										}
										</div>
									</div>
									<div className={s.total_order_summ}>
										<p>Итого ${order.totalPrice} USD</p>
									</div>
								</div>
							</Link>
						)
					})
				}
			</div>
		</section>
	)
};
export default OrdersRage;