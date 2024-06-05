import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus, faMinus, faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons'
import s from './Styles/Cart.module.css'//Стили
import { Link } from 'react-router-dom';


function CartPage({ userCartItems, delFromCart, minusToyCart, plusToyCart  }){

	//Функция - подсчет общей стоимости товаров в корзине
	let totalPrice = 0
	const useCart = () => {
		totalPrice = userCartItems.reduce((sum, obj) => (obj.product_price * obj.product_quantity) + sum, 0);
		return { totalPrice };
	};
	useCart()

	//Функция клик - удалить из корзины товар
	const delToy = (e, u) => {
		delFromCart(e, u)
	}
	return(
		<section className={s.cartBlock}>
			<h3 className={s.cartBlockHeader}>Корзина покупок</h3>
			{userCartItems.length===0?
				<div className={s.emptyCart}>
					<h2>Ваша корзина пуста</h2>
					<img src="images/cart/emptyCart.png" alt="" />
				</div>
				:
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
						userCartItems.map((item, numberItem) => {
							numberItem = numberItem + 1
							return (
								<div className={(numberItem % 2 == 0 ? `${s.cartListTableRow}  ${s.firstRow}` : `${s.cartListTableRow}  ${s.secondRow}`)} key={numberItem}>
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
										<button className={s.buttonChange} onClick={() => plusToyCart(item)}>
											<FontAwesomeIcon icon={faCirclePlus} />
										</button>
									</div>
									<div className={s.minusRow}>
										<button className={s.buttonChange} disabled={item.product_quantity == 1 ? "disabled" : ''} onClick={() => minusToyCart(item)}
										>
											<FontAwesomeIcon icon={faCircleMinus} />
										</button>
									</div>
									<div className={s.delRow}>
										<FontAwesomeIcon icon={faTrash} onClick={() => delToy(item.id)} />
									</div>
								</div>
							)
						})
					}
					<div className={s.cartTotal}>
						<div className={s.cartCunterProduct} >
							<p>Итого наименований: {userCartItems.length} шт.</p>
							<p>Итого на сумму : {totalPrice} $.</p>
						</div>
						<div className={s.makeOrder}>
							<button className={s.makeOrderBtn}>
								<Link to="/make_chekout">Оформить заказ</Link>
							</button>
						</div>
					</div>
				</div>
				}

		</section>
	)
};

export default CartPage;