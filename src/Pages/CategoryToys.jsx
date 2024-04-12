import React from 'react';
import s from './Styles/CategoryToys.module.css'//Стили
import { useParams } from 'react-router-dom';//Для получения параметров get
import { useLocation } from 'react-router-dom';//Для получения параметров get
//Компонент товары определенной категории
function CategoryToys(props){
	let { slug } = useParams();//Получаем параметр

	//Получить данные определенной категории
	const location = useLocation();
	const cat_name = location.state['cat_name'];
	const toys_list = location.state['product_list'];
	const cat_id = location.state['cat_id'];
	let filterToys = []
	const renderToysList = () => {
		toys_list.filter((item)=> {
			item.category_id.includes(cat_id)
			if (item.category_id.includes(cat_id)) {
				filterToys.push(item)
			}
		})
	}
	renderToysList()

	return(
		<section className={s.product_list}>	
			<h3 className={s.product_list_header}>{cat_name} </h3>
			<div className={s.product_tabs_list}>
				<div className={s.product_tabs_list}>
					{filterToys.map((toy) => {
						return (
							<div className={s.product_tabs_item} key={toy.id}>
								<img src={toy.image} alt="фото товара" className={s.product_image} />
								<p className={s.product_name}>{toy.name}</p>
								<button type="text" className={s.btn_add_to_cart}>
									&#36; {parseFloat(toy.price).toFixed(2)} USD
								</button>
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}

export default CategoryToys;