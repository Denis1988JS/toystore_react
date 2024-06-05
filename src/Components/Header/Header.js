import React from 'react';
import style from './Header.module.css';//Стили
import { Link, NavLink } from 'react-router-dom';//Для ссылок
import Btn_logout from '../Bbt_logout/Btn_logout';

//Функциональный компонент шапка сайта - Header
function Header({ authUser, logOut }){

	return(
		<header className={style.header}>
			<div className={style.header_top}>
				<div className={style.header_top_content}>
					<div className={style.header_contact_list}>
						<a href="tel:+" className={style.contact_item_link}>Call Us: +1 213 974-5898</a>
						<a href="mailto:" className={style.contact_item_link}>Email: toystore@template.com</a>
					</div>

					<div className={style.social_links_list}>
						<a href="#">
							<img src="images/header/IMAGE.svg" alt="o" />
						</a>
						<a href="#">
							<img src="images/header/facebook-icon.svg" alt="o" />
						</a>
						<a href="#">
							<img src="images/header/instagram-icon.svg" alt="o" />
						</a>
						<a href="#">
							<img src="images/header/pinterest-icon.svg" alt="o" />
						</a>
						<a href="#">
							<img src="images/header/youtube-icon.svg" alt="o" />
						</a>
					</div>
				</div>
			</div>
			<div className={style.header_nav}>
				<nav className={style.nav}>
					<div className={style.block_logo_link}>
						<NavLink to="" className={style.logo_link}>
							ToyStore
						</NavLink>
					</div>
					<div className={style.nav_link_list}>
						<a href="#" className={style.nav_link_item}>
							Catalog
						</a>
						<a href="#" className={style.nav_link_item}>
							Delivery
						</a>
						<a href="#" className={style.nav_link_item}>
							About
						</a>
						<a href="#" className={style.nav_link_item}>
							Contacts
						</a>
					</div>
					<div className={style.cart_order_login_link}>
						{
							authUser ? 
								<div className={style.cart_order_login_link}>
									
									<Link to="cart/" className={style.order}>
										<img src="images/header/order_link.svg" alt="cart" className={style.link_img} />
									</Link>
									<Link to="orders/" className={style.cart}>
										<img src="images/header/orders.png" alt="orders" className={style.link_img }/>
									</Link>
									<a href="#" className={style.login_link}>
										<span>{authUser.name.slice(0,1).toUpperCase()}</span>
									</a>
									<Btn_logout logOut={logOut}/>
								</div> 
							:
								<div className={style.register_link}>
									<Link to="register/">
										<span>Регистрация</span>
									</Link>
								</div>
						}
					</div>
				</nav>
			</div>
		</header>
	)
}
export default Header;