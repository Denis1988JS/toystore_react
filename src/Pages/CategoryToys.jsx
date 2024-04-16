import React, { useState } from 'react';
import s from './Styles/CategoryToys.module.css'//Стили
import { useParams } from 'react-router-dom';//Для получения параметров get
import { useLocation } from 'react-router-dom';//Для получения параметров get
import ToyCart from '../Components/ToysCart/ToysCart';//Карточки товаров


//Компонент товары определенной категории
function CategoryToys(props){
	const [filterToys, setFilterToys] = useState([])
	let { slug } = useParams();//Получаем параметр
	//Получить данные определенной категории
	const location = useLocation();
	const cat_name = location.state['cat_name'];
	const cat_id = location.state['cat_id'];

	//Функция получить товары определенной категории
	React.useEffect(()=>{
		const takeCategoryToys =  async(cat_id,) => {
		await fetch(`http://localhost:3001/toys/?category_id=${cat_id}`)
			.then((response) => response.json())
			.then((result) => { setFilterToys(result) ; console.log(result) })
			.catch((error) => console.error(error));
	}
	takeCategoryToys(cat_id)
	},[])
	
	return(
		
		<section className={s.product_list}>	
			<h3 className={s.product_list_header}>{cat_name} </h3>
			<div className={s.product_tabs_list}>
				<div className={s.product_tabs_list}>
					{
						filterToys.map((e) => {
							return <ToyCart key={e.id} id={e.id} image={e.image} title={e.name} price={e.price} />
						})
					}
				</div>
			</div>
		</section>
	)
}

export default CategoryToys;