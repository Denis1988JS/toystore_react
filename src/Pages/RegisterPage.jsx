import React from 'react';
import s from './Styles/RegisterPage.module.css'//Стили
import RegisterForm from '../Components/RegisterForm/RegisterForm';//Форма регистрации

//Страница регистрация на сайте
function RegisterPage({ registerUserForm, redirectPath }){
	return(
		<section className={s.register_block}>
			<div className={s.form_block}>
				<h2>
					Регистрация на сайте
				</h2>
				<RegisterForm registerUserForm={registerUserForm} redirectPath={redirectPath}/>
			</div>
		</section>
	)
};

export default RegisterPage;
