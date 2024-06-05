import React from 'react';
import s from './RegisterForm.module.css'//Стили
import { Formik, Form, Field, ErrorMessage } from 'formik';//Библиотека форм
import { Link, Navigate } from 'react-router-dom';//Для ссылок

//Форма регистрации пользователя
function RegisterForm({ registerUserForm, redirectPath }){
	if (redirectPath == true) {
		return <Navigate to={'/'}/>
	}
	return(
		<Formik 
		initialValues={{ name: '', email: '', password: '' }}
		validate={values => {
			const errors = {};
			if (!values.email) {errors.email = 'Поле не может быть пустым';} 
			else if (!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/i.test(values.email)) 
			{ errors.email = 'Не правильно введен email';}
			else if (values.name <= 2 ){errors.name = 'Имя не меньше 2 символов'}
			else if (values.password <= 5) {errors.password = 'Пароль не меньше 5 символов'}
			return errors;
		}}
		onSubmit={(values, action) => {
			registerUserForm(values)
			action.resetForm();
			
		}}
		>
			{({values, errors, handleSubmit}) => (
				<Form onSubmit={handleSubmit}>
				<label htmlFor="name">Ваше имя</label>
				<Field  name="name" id="name" type="text" value={values.name} required className={s.name_input} placeholder="Введите ваше имя" />
				<ErrorMessage name='name' component="div"/>
				<label htmlFor="email">Ваша почта</label>
				<Field name="email" id="email" type="email" value={values.email} required className={s.name_input} placeholder="Введите ваш email" />
				<ErrorMessage name='email' component="div" />
				<label htmlFor="password">Введите пароль</label>
				<Field name="password" id="password" type="password" value={values.password} required className={s.name_input} placeholder="Придумайте пароль" />
				<ErrorMessage name='password' component="div" />
				<div className={s.footer_form}>
				<input type="submit" value="Зарегистрироваться" className={s.btn_submit}  />
				<Link to='/authorisation' className={s.authorisation}>Авторизация</Link>
				</div>
			</Form>
			)}
		</Formik>
	)
};

export default RegisterForm;