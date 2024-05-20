import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus, faMinus, faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons'
import s from './Styles/Cart.module.css'//Стили


function CartPage({ userCartItems, delFromCart, minusToyCart, plusToyCart  }){

	const delToy = (e, u) => {
		delFromCart(e, u)
	}
	return(
		<section className={s.cartBlock}>
			<h3 className={s.cartBlockHeader}>Корзина покупок</h3>
			<div className={s.cartListTable}>
				<div className={s.cartListTableHeader}>
					<div className={s.numberHeader}>
						№
					</div>
					<div className={s.nameHeader}>
						Наименование товара
					</div>
					<div className={s.quantityHeader}>
						Количество
					</div>
					<div className={s.priceHeader}>
						Цена
					</div>
					<div className={s.summHeader}>
						Сумма
					</div>
					<div className={s.addHeader}>
						<FontAwesomeIcon icon={faPlus} />
					</div>
					<div className={s.minusHeader}>
						<FontAwesomeIcon icon={faMinus} />
					</div>
					<div className={s.delHeader}>
						<FontAwesomeIcon icon={faTrash} />
					</div>
				</div>
				{
					userCartItems.map((item, numberItem)=>{
						numberItem = numberItem+1
						return (
							<div className={(numberItem % 2 == 0 ? `${s.cartListTableRow}  ${s.firstRow}` : `${s.cartListTableRow}  ${s.secondRow}` )} key={numberItem}>
								<div className={s.numberRow}>
									{numberItem}
								</div>
								<div className={s.nameRow}>
									{item.product_name}
								</div>
								<div className={s.quantityRow}>
									{item.product_quantity}
								</div>
								<div className={s.priceRow}>
									{item.product_price}
								</div>
								<div className={s.summRow}>

									{item.product_price * item.product_quantity}
								</div>
								<div className={s.addRow}>
									<button className={s.buttonChange}  onClick={() => plusToyCart(item)}>
										<FontAwesomeIcon icon={faCirclePlus}  />
									</button>
								</div>
								<div className={s.minusRow}>
									<button className={s.buttonChange} disabled={item.product_quantity==1? "disabled":''} onClick={() => minusToyCart(item)} 
										>
										<FontAwesomeIcon icon={faCircleMinus} />
									</button>
								</div>
								<div className={s.delRow}>
									<FontAwesomeIcon icon={faTrash} onClick={() => delToy(item.id) } />
								</div>
							</div>
						)
					})
				}
				

			</div>
			
		</section>
	)
};

export default CartPage;