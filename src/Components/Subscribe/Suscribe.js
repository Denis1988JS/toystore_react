import React from 'react';
import s from './Subscribe.module.css'//Стили
//url json-server
let url = 'http://localhost:3001/' // url-для сапросов на сервер

//Компонент подписка на скидку
function Subscribe(props){

	
	return(
		<section className={s.subscribeWripper}>
			<div className={s.subscribeBlock} id='subscribeBlock'>
				<div className={s.subscribeBlockContent}>
					<div className={s.subscribeLogo}>
						<img src="images/home/subscribe.svg" alt="Лого" />
					</div>
					<p className={s.subscribeContent}>Subscribe to our newsletter & get <span>10% discount!</span></p>
				</div>
				<form action='http://localhost:3001/subscribers' method='post' className={s.subscribeForm} >
					<input type='email' name='email' placeholder='Enter your e-mail' className={s.subscribeInputEmail}/>
					<input type="hidden" name="time" value=""/>
					<input type="submit" value="Subscribe" className={s.subscribeFormSend}/>
				</form>
				<div className={s.message_block} id='message_block'>

				</div>
			</div>
		</section>
	)
};

export default Subscribe;