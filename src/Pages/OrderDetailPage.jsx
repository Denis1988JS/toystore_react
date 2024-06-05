import React from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';//Для получения параметров get
import s from './Styles/OrderDetailPage.module.css'//Стили
import OrderContent from '../Components/OrderContent/OrderContent';
import OrderProducts from '../Components/OrderProducts/OrderProducts';


//url json-server
let url = 'http://localhost:3001/' // url-для сапросов на сервер


//Компонент - страница отдельно заказ и товары в заказе
function OrderDetail(){
	const {id}=useParams();
	//Получаем необходимый заказ
	const location = useLocation();
	//Получаем заказ из state link и передаем в компонент OrderContent
	let order = location.state.order;
	let product = location.state.products
	console.log(location)
	return(
		<section className={s.order_detail_block}>
			<h3 className={s.order_detail_header}>
				Заказ № {id} от {order.data.split('-')[0]}.{order.data.split('-')[1]}.{order.data.split('-')[2].slice(0,2)}.
			</h3>
			<div className={s.order_block_content}>
				<OrderContent order={order}/>
				<OrderProducts product={product}/>
			</div>
		</section>
	)
};
export default OrderDetail;
