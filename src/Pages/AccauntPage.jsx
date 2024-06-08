import React from 'react';
import s from './Styles/AccauntPage.module.css'//Стили
import { Link } from 'react-router-dom';

//Страница - личный кабинет пользователя
function AccauntPage({ userData, likesGoods }){
	return(
		<section className={s.accaunt_block}>
			<h3 className={s.accaunt_block_header}>
				Личный кабинет пользователя: {userData.name}
			</h3>
			<div className={s.accaunt_block_content}>
				<div className={s.account_block_info}>
					<h3 className={s.account_info_header}>Информация о пользователе</h3>
					<div className={s.account_info}>
						<div className={s.account_info_data}>
							<p className={s.account_info_title}>Имя пользователя</p>
							<p className={s.account_info_value}>{userData.name}</p>
						</div>
						<div className={s.account_info_data}>
							<p className={s.account_info_title}>Email</p>
							<p className={s.account_info_value}>{userData.email}</p>
						</div>
					</div>
				</div>
				<div className={s.likes_goods}>
					<h3 className={s.likes_goods_header}>
						Избранные товары
					</h3>
					<div className={s.likes_goods_list}>
						{
							likesGoods.map((like)=>{
								
								return <div className={s.likes_goods_item} key={like.id}>
											<p>{like.product_name}</p>
											<img src={like.product_image} alt="фото" />
										</div>
							})
						}
						
					</div>
				</div>
			</div>
		</section>
	)
};
export default AccauntPage;

