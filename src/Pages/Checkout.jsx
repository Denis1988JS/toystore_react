import React from 'react';
import style from './Styles/Checkout.module.css';//Стили
import CheckoutForm from '../Components/CheckoutForm/CheckoutForm';
import CheckoutUserCartItems from '../Components/CheckoutUserCartItems/CheckoutUserCartItems';

//Страница - подтверждение заказа - форма и так далее
function Checkout({ makeOrder, userCartItems, orderSuccessSubmit }){

	return(
		<section className={style.checkoutBlock}>
			<h3 className={style.checkoutBlockHeader}>Оформление заказа</h3>
			<div className={style.checkoutBlockContent}>
				<div className={style.checkoutBlockForm}>
					<CheckoutForm makeOrder={makeOrder} userCartItems={userCartItems} orderSuccessSubmit={orderSuccessSubmit}/>
				</div>
				<CheckoutUserCartItems userCartItems={userCartItems}/>
			</div>
		</section>
	)
}
export default Checkout;