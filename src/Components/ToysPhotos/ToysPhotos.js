import React from 'react';
import s from './ToysPhotos.module.css'//Стили
import { NavLink } from 'react-router-dom';//Для ссылок
//url json-server
let url = 'http://localhost:3001/' // url-для сапросов на сервер


//Компонент фотографии товаров
function ToysPhotos(props){
	const toysProtoList = props.toysPhotosList;
	
	return(
		<section className={s.wrapperToysPhotos}>
			<p className={s.toysPhotoTitle}>@ElasticThemes</p>
			<h2 className={s.toysPhotoTitleHeader}>We're on Instagram!</h2>
			<div className={s.toysPhotosList}>
				{
					toysProtoList.map((e)=> {
						return (
							<div className={s.protoCart} key={e.id}>
								<img src={e.url} alt={e.name} />
							</div>
						)
					})
				}
			</div>
			<div className={s.morePhotosBlock}>
				<NavLink to="#" className={s.morePhotosLInk}>
					See More Photos
				</NavLink>
			</div>
		</section>
	)
};

export default ToysPhotos;