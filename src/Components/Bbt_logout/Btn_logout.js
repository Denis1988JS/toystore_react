import React from 'react';
import style from './Btn_logout.module.css';//Стили

//Компонент кнопка - выйти с сайта (логоут)
function Btn_logout({ logOut }){
//Функция логоут 
	const outSite = () => {
		logOut()
}
	return(
		<button className={style.btn_logout} onClick={() => outSite()}>
			Выйти
		</button>
	)
};

export default Btn_logout;
