import React from 'react';
import s from './Styles/RegisterPage.module.css'//Стили
import RegisterForm from '../Components/RegisterForm/RegisterForm';//Форма регистрации

//Страница регистрация на сайте
function RegisterPage(props){
	const registerUser = props.registerUser;
	const message = props.message;
	const isSubmit = props.isSubmit;
	return(
		<section className={s.register_block}>
			<div className={s.form_block}>
				<h2>
					Регистрация на сайте
				</h2>
				<RegisterForm registerUser={registerUser} message={message} isSubmit={isSubmit}/>
			</div>
		</section>
	)
};

export default RegisterPage;
