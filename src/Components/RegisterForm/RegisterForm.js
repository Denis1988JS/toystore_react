import React from 'react';
import s from './RegisterForm.module.css'//Стили
import { Formik, Form, Field, Button, TextInput } from 'formik';//Библиотека форм
import { NavLink, Link } from 'react-router-dom';//Для ссылок

//Форма регистрации пользователя
function RegisterForm(props){
	const registerUser = props.registerUser;
	const message = props.message;
	const isSubmit = props.isSubmit;

	//Для сообщения о результате регистрации
	let message_h3
	if (message == "yes") {
		message_h3 = (<h2 className={s.message_succes}>Регистрация успешна - <Link to='/'>На главную страницу</Link></h2>)
	}
	else if (message == "no") {
		message_h3 = (<h2 className={s.message_warning}>Такой пользователь уже есть</h2>)
	}
	return(
			<Formik 
			initialValues={{ name: '', email: '', password: '' }}
			onSubmit={(newUser, action) => {
				registerUser(newUser);
				action.resetForm();
			}}
			validator={() => ({})}

			>{(props)=> (
				<Form >
				{message_h3}
				<label htmlFor="name">Ваше имя</label>
				<Field value={props.values.name} name="name" id="name" type="text" required className={s.name_input} placeholder="Введите ваше имя" onChange={props.handleChange('name')}/>

				<label htmlFor="email">Ваша почта</label>
				<Field value={props.values.email} name="email" id="email" type="email" required className={s.name_input} placeholder="Введите ваш email" onChange={props.handleChange('email')} />

				<label htmlFor="password">Введите пароль</label>
				<Field value={props.values.password} name="password" id="password" type="password" required className={s.name_input} placeholder="Придумайте пароль" onChange={props.handleChange('password')}/>

					<input type="submit" value="Зарегистрироваться" className={s.btn_submit} onClick={props.handleSubmit} disabled={isSubmit}/>

				</Form>
				)}
				
			</Formik>
	)
};

export default RegisterForm;