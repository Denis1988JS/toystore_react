import React from 'react';
import s from './EcommerceTemplate.module.css';//Стили
import { NavLink } from 'react-router-dom';//Для ссылок

function EcommerceTemplate(props){
	return(
		<section className={s.wrapperEcommerceTemplate}>
			<p className={s.ecommerceTemplateTitle}>
				Made for Webflow
			</p>
			<h2 className={s.ecommerceTemplateHeader}>
				Simple & Colorful Ecommerce Template for Your Business
			</h2>
			<div className={s.ecommerceTemplateList}>
				<div className={s.templateListContent}>
					<h2 className={s.listContentHeader}>
						Available for FREE!
					</h2>
					<p className={s.listContentDescription}>
						A successful marketing plan relies heavily on the pulling-power of advertising copy. Writing result-oriented ad copy is difficult, as it must appeal to, entice, and convince consumers to take action. There is no magic formula to write perfect ad copy
					</p>
					<NavLink to="#" className={s.getEcommerce}>
						get it now
					</NavLink>
				</div>
				<div className={s.templateListImg}>
					<img src="images/home/ecommerce.svg" alt="Фото" className={s.imgEcommerce} />
				</div>
			</div>

		</section>
	)
};

export default EcommerceTemplate;