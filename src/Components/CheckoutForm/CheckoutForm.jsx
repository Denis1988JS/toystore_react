import React from 'react';

//CheckoutForm
import s from './CheckoutForm.module.css'//Стили
import { Formik, Form, Field, ErrorMessage } from 'formik';//Библиотека форм
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

//Компонент автозаполнение

function CheckoutForm({ makeOrder }){
	const [cityList, setCityList] = React.useState([]);//Список городов из json файл
	let url = 'http://localhost:3001/' 
	//Загружаем список городов
	React.useEffect(()=>{
		const getCityList =  () => {
			fetch('/jsonFiles/city_listNew.js').then((res)=>res.json()).then((city)=>{
				setCityList(city)
			}).catch((err)=>{console.log(err)})
		}
		getCityList()
	},[])

	return (
		<Formik 
		initialValues={
				{
					name: '', email: '', phone: '', city: '' ,address:'',
			paymentType:'',comment:''}}
			onSubmit={(values, action) => {
				makeOrder(values)
				action.resetForm();
			}}
			>
			{({ values, errors, handleSubmit, setFieldValue }) => (
				<Form className={s.checkoutForm} onSubmit={handleSubmit}>
					<h3 className={s.checkoutHeaderForm}>Оформление заказа</h3>
					<div className={s.inputBlock}>
						<label htmlFor="name">Ваше имя</label>
						<Field name="name" id="name" type="text" value={values.name} required className={s.nameFormCheckout} placeholder="John Smith" />
					</div>
					<div className={s.inputBlock}>
						<label htmlFor="email">Ваш email</label>
						<Field name="email" id="email" type="email" value={values.email} required className={s.emailFormCheckout} placeholder="emailname@email.com" />
					</div>
					<div className={s.inputBlock}>
						<label htmlFor="phone">Ваш номер телефона</label>
						<Field name="phone" id="phone" type="tel" value={values.phone} required className={s.phoneFormCheckout} placeholder="Формат 81234567890" />
					</div>
					<div className={s.inputBlock}>
						<label htmlFor="city">Выберите город</label>
						<Autocomplete
							disablePortal
							options={cityList}
							getOptionLabel={(cityList) => cityList.city + ' ---- ' + cityList.region}
							sx={{ width: 100 + '%' }}
							className={s.muiAutocompleteBlock}
							onChange={(event, newValue) => { console.log(newValue); setFieldValue("city", newValue)  }}
							renderInput={(params) => <TextField {...params} label="" name='city' id='city' />}
						/>
					</div>
					<div className={s.inputBlock}>
						<label htmlFor="address">Адрес доставки</label>
						<Field name="address" id="address" type="text" value={values.address} required className={s.nameFormCheckout} placeholder="Ленина 100" />
					</div>
					<div className={s.inputBlock}>
						<label htmlFor="comment">Комментарий к заказу</label>
						<Field as='textarea' name="comment" id="comment" value={values.comment} className={s.commentFormCheckout} placeholder="Комментарий..."  />
					</div>
					<div className={s.inputBlock}>
						<div className={s.radioGroup} role={values.paymentType}>

							<h3 className={s.radioGroupHeader}>Форма оплаты</h3>
							<div className={s.radioInputBlock}>
								<Field type="radio" value="cash" id="cash" name='paymentType'/>
								<label htmlFor="cash" className={s.radioLabel}>Наличная при получении</label>
							</div>
							<div className={s.radioInputBlock}>
								<Field type="radio" value="cashlessOnReceiving" id="cashlessOnReceiving" name='paymentType' />
								<label htmlFor="cashlessOnReceiving" className={s.radioLabel}>Безналичная при получении</label>
							</div>
							<div className={s.radioInputBlock}>
								<Field type="radio" value="cashlessOnOrder" id="cashlessOnOrder" name='paymentType' />
								<label htmlFor="cashlessOnOrder" className={s.radioLabel}>Безналичная при заказе</label>
							</div>
						</div>
					</div>
					<div className={s.inputBlock}>
						<input type="submit" value="Оформить заказ" className={s.btn_submit} />
					</div>
					
				</Form>
			)}
		</Formik>
	)
}
export default CheckoutForm;