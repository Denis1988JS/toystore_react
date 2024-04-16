import React from 'react';
import s from './ToysCart.module.css'//Стили

//Компонент карточка товара
function ToyCart({id,image,title,price}){
	return(
		<div className={s.product_tabs_item} key={id}>
			<img src={image} alt="фото товара" className={s.product_image} />
			<p className={s.product_name}>{title}</p>
			<button type="text" className={s.btn_add_to_cart}>
				&#36; {parseFloat(price).toFixed(2)} USD
			</button>
		</div>
	)
};
export default ToyCart;