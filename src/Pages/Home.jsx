import React from 'react';
import s from './Styles/Home.module.css'//Стили
import { NavLink , Link } from 'react-router-dom';//Для ссылок
import VideoContent from '../Components/VideoContent/VideoContent';//Блок видео-контент
import EcommerceTemplate from '../Components/EcommerceTemplate/EcommerceTemplate';//Блок электронная комменрция
import Subscribe from '../Components/Subscribe/Suscribe';//Блок подписка на скидку
import ToysPhotos from '../Components/ToysPhotos/ToysPhotos';//Блок список фотографий игрушек
//импорт компонентом

function Home(props){
	//Получаем пропсы по отдельности
	let cat_list = props.category;
	let product_list = props.toys;


	return (
		<main className={s.wrapper_page}>
			<section className={s.banner}>
				<img src="images/home/banner_bg.jpg" alt="Баннер" className={s.banner_bg}/>
				<div className={s.banner_content_block}>
					<p>
						Say Hello to ToyStore!
					</p>
					<h2>
						Free Ecommerce Template for Webflow
					</h2>
					<div className={s.link_block_green}>
						<NavLink to="#">Open Catalog</NavLink>
					</div>
				</div>
			</section>
			<section className={s.products_section}>
				<div className={s.category_links_list}>
					{cat_list.map((e, counter=0 )=>{
						counter +=1;
						return(
						counter%2!==0?(
							<div className={s.category_link_item_stuffed} key={counter}>
								<div className={s.item_stuffed_content}>
									<div className={s.item_stuffed_content_image}>
										<img src="images/home/stuffed_banner.svg" alt="Баннер" />
									</div>
									<div className={s.stuffed_content}>
										<h2 className={s.content_title}>
											{e.name}
										</h2>
											<Link to={`/product/category/${e.slug}`} className={s.link_btn} state={{ "product_list": product_list, "cat_id": e.id, "cat_name": e.name }}>Shop Now</Link>
									</div>
								</div>
							</div>
							) : (<div className={s.category_link_item_wooden} key={counter}>
							<div className={s.item_wooden_content}>
								<div className={s.wooden_content}>
									<h2 className={s.content_title}>
										{e.name}
									</h2>
											<Link to={`/product/category/${e.slug}`} className={s.link_btn} state={{ "product_list": product_list, "cat_id": e.id, "cat_name": e.name }}>Shop Now</Link>
								</div>
								<div className={s.item_wooden_content_image}>
									<img src="images/home/wooden_banner.svg" alt="Баннер" />
								</div>
							</div>
						</div>)
						)

					})}
					{/*
					<div className={s.category_link_item_stuffed}>
						<div className={s.item_stuffed_content}>
							<div className={s.item_stuffed_content_image}>
								<img src="images/home/stuffed_banner.svg" alt="Баннер" />
							</div>
							<div className={s.stuffed_content}>
								<h2 className={s.content_title}>
									Stuffed Animals
								</h2>
								<NavLink to="#" className={s.link_btn}>Shop Now</NavLink>
							</div>
						</div>
					</div>

					<div className={s.category_link_item_wooden}>
						<div className={s.item_wooden_content}>
							<div className={s.wooden_content}>
								<h2 className={s.content_title}>
									Wooden Animals
								</h2>
								<NavLink to="#" className={s.link_btn}>Shop Now</NavLink>
							</div>
							<div className={s.item_wooden_content_image}>
								<img src="images/home/wooden_banner.svg" alt="Баннер" />
							</div>
						</div>
				</div>*/}
				</div>
			</section>
			<section className={s.product_list}>
				{cat_list.map((cat)=>{
					return <div className={s.product_list_block} key={cat.id}>
								<h3 className={s.product_list_header}>{cat.name}</h3>
								<div className={s.product_tabs_list}>
									{product_list.map((toy)=>{
										return toy.category_id==cat.id?(
											<div className={s.product_tabs_item} key={toy.id}>
												<img src={toy.image} alt="фото товара" className={s.product_image} />
												<p className={s.product_name}>{toy.name}</p>
												<button type="text" className={s.btn_add_to_cart}>
													&#36; {parseFloat(toy.price).toFixed(2)} USD
												</button>
											</div>
										):(null)
									})}
								</div>
							</div>
				})}
			</section>
			<VideoContent />
			<EcommerceTemplate />
			<Subscribe subscribers={props.subscribers} subscribeOn={props.subscribeOn} />
			<ToysPhotos toysPhotosList={props.toysPhotosList} />
		</main>
	)
};

export default Home;
