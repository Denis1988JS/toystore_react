import React from 'react';
import s from './Subscribe.module.css'//Стили
//url json-server
let url = 'http://localhost:3001/' // url-для сапросов на сервер

//Компонент подписка на скидку
function Subscribe({ subscriptionHandle, subscriptionRef, subscribeMessage }){
	let message = '';
	if (subscribeMessage===''){
		message = ''
	}
	else if (subscribeMessage === false) {
		message = `Подписка была оформлена ранее`
	}
	else if (subscribeMessage === true) {
		message = `Вы успешно оформили подписку`
	}
	
	return(
		<section className={s.subscribeWripper}>
			<div className={s.subscribeBlock} id='subscribeBlock'>
				<div className={s.subscribeBlockContent}>
					<div className={s.subscribeLogo}>
						<img src="images/home/subscribe.svg" alt="Лого" />
					</div>
					<p className={s.subscribeContent}>Subscribe to our newsletter & get <span>10% discount!</span></p>
				</div>
				<form action='#'  className={s.subscribeForm} >
					<input type='email' name='email' placeholder='Enter your e-mail' className={s.subscribeInputEmail} ref={subscriptionRef}/>
					<input type="hidden" name="time" value=""/>
					<input type="button" value="Subscribe" className={s.subscribeFormSend} onClick={() => { subscriptionHandle() }}/>
				</form>
				<div className={s.message_block} id='message_block'>
					<p>{message}</p>
				</div>
			</div>
		</section>
	)
};

export default Subscribe;