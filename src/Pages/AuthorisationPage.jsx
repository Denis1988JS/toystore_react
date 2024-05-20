import React from 'react';
import s from './Styles/AuthorisationPage.module.css'//Стили
import AuthorisationForm from '../Components/AuthorisationForm/AuthorisationForm';


//Страница авторизация на сайте
function AuthorisationPage({ authorisationUserForm, redirectPath }) {
	
	return (
		<section className={s.register_block}>
			<div className={s.form_block}>
				<h2>
					Авторизация на сайте
				</h2>
				<AuthorisationForm authorisationUserForm={authorisationUserForm} redirectPath={redirectPath}/>
			</div>
		</section>
	)
};

export default AuthorisationPage;
