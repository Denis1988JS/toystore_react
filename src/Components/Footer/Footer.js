import React from 'react';
import style from './Footer.module.css';


//Функциональный компонент шапка сайта - Header
function Footer(props) {
	return(
		<footer className={style.footer}>
			<div className={style.footer_nav}>
				<div className={style.footer_nav_logo}>
					<a href="#" className={style.logo_link}>
						ToyStore
					</a>
				</div>
				<nav className={style.footer_nav_list}>
					<a href="#" className={style.nav_list_item}>Home</a>
					<a href="#" className={style.nav_list_item}>Catalog</a>
					<a href="#" className={style.nav_list_item}>Delivery</a>
					<a href="#" className={style.nav_list_item}>About</a>
					<a href="#" className={style.nav_list_item}>Contacts</a>
				</nav>
				<div className={style.footer_cosial_link}>
					<a href="#">
						<img src="images/footer/Frame.svg" alt="o" />
					</a>
					<a href="#">
						<img src="images/footer/Frame1.svg" alt="o" />
					</a>
					<a href="#">
						<img src="images/footer/Frame2.svg" alt="o" />
					</a>
					<a href="#">
						<img src="images/footer/Frame3.svg" alt="o" />
					</a>
					<a href="#">
						<img src="images/footer/Frame4.svg" alt="o" />
					</a>
				</div>
			</div>
			<div className={style.footer_info}>
				<div className={style.created_block}>
					<p>Created with love by Created with love by</p>
				</div>
				<div className={style.powered_block}>
					<span>Проект на React</span>
					<img src="images/footer/tochka.svg" alt="-" />
					<a href="https://github.com/Denis1988JS" className={style.git_hub_link}>Git Hub</a>
				</div>
			</div>
		</footer>
	)
}
export default Footer;