import React from 'react';
import s from './ToysCart.module.css'//Стили

//Компонент карточка товара
function ToyCart({ id, image, title, price, addToCart, addLikes, likesGoods }){
	//Создаем объект - товар для передачи в функции
	const objToy = {
		toyId:id,
		title:title,
		price:price,
		image: image
	}
	//Обработка клика мыши + функция добавить в корзину
	const addToy = (obj) => {
		addToCart(obj);
		console.log('Клик')
	}
	//Обработка клика мыши + функция добавить в избранные товары
	const addToyLikes = (obj) => {
		addLikes(obj);
		console.log('Клик  избранные')
	}

	
	return(
		<div className={s.product_tabs_item} key={id}>
			<img src={image} alt="фото товара" className={s.product_image} />
			<p className={s.product_name}>{title}</p>
			<button type="text" className={s.btn_add_to_cart} onClick={() => addToy(objToy)}>
				&#36; {parseFloat(price).toFixed(2)} USD
			</button>
			
			{
				likesGoods.find(like => like.product_id === id)?		
					(<div className={s.btn_add_likes} >
						
						<img src="images/toysCart/liked.svg" alt="-" onClick={() => { addLikes(objToy, ) }} />
					</div>):
					
					<div className={s.btn_add_likes}>
						<img src="images/toysCart/unliked.svg" alt="-" onClick={() => { addLikes(objToy) }} />
					</div>
			}
		</div>
	)
};
export default ToyCart;