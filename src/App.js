import React from 'react';
import { HashRouter as Router, Routes, Route, json } from 'react-router-dom'; //Для работы ссылок и роутера маршрутов

//Импорты компонентов
import Header from './Components/Header/Header';//шапка сайта
import Footer from './Components/Footer/Footer';//подвал сайта
import Home from './Pages/Home';//домашняя страница
import RegisterPage from './Pages/RegisterPage';//Регистрация на сайте
import CategoryToys from './Pages/CategoryToys';//Страница товары в разрезе категории

//url json-server
let url = 'http://localhost:3001/' // url-для сапросов на сервер

function App() {
  //Хуки useState
  const [toys, setToys] = React.useState([]);//Хук - карточки товаров (игрушек)
  const [category, setCategory] = React.useState([]);//Хук - все категории товаров
  const [subscribers, setSubscribers] = React.useState([]);//Хук - подписчики на скидку
  const [toysPhotos, setToysPhotos ] = React.useState([]);//Хук - список фотографий игрушек 6 фото

  //Хуки для формы регистрации сообщение и был ли submit
  const [message, setMessage] = React.useState('');//Сообщение о результате регистрации
  const [isSubmit, setIsSubmit] = React.useState(false);//Статут отправки формы

//Запрос на сервер - получить все товары и все подписки на скидку
React.useEffect(()=>{
  async function fetchData(){
    try{
      const [toys, categories, subscribers, toysPhotos] = await Promise.all([
      //Получаем список игрушек
      fetch(`${url}toys`).then((res) => {return res.json()}).then((toys) => { setToys(toys)}),
      //Получаем список категорий
      fetch(`${url}category`).then((res) => { return res.json() }).then((category) => { setCategory(category)}),
      //Список подписанных пользователей
      fetch(`${url}subscribers`).then((res) => { return res.json() }).then((subscribers) => { setSubscribers(subscribers)}),
      //Список фотографий игрушек
      fetch(`${url}toy_photos`).then((res) => { return res.json() }).then((toys) => { setToysPhotos(toys.slice(0, 6))}),
    ])}
    
    //Отлов ошибок
    catch (error) { alert('Ошибка при запросе данных ;('); console.error(error);}
    }
    fetchData();
},[])




//Функция подписаться на скидку
//Функция получаем время для подписки (просто есть такое поле в модели)
const getTime = () => {
  let subscribe_time = new Date()
  return subscribe_time
}
const subscribeOn = async (e) => {
  e.preventDefault();
  //Получаем данные из формы email и время и id-последнего подписчика
  
  //Отлов если уже в подписках есть введнные данные или их нет
  const data = subscribers.find((item) => (item.email) === e.target.email.value);
  
    //Ранее email вносили - message.error
    if (data) {
      let message_block = document.getElementById('message_block');
      message_block.innerHTML = '';
      let message_info = document.createElement('p');
      message_info.innerText = "Вы ранее подписались на скидку";
      message_info.classList.add('message_warning');
      message_block.append(message_info);
    }
    //Вносим данный на сервер и хук setSubscribers
    else {
      let subscribers_rev = subscribers.reverse()
      const lastId = Number(subscribers_rev[0]['id']) + 1;
      let user = {
        "id": String(lastId),
        "email": e.target.email.value,
        "time_sibsribe": getTime()
      }
      console.log('Подписка оформлена');
      try {
        fetch(`${url}subscribers`, {
          method: "POST",
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(user)
        }).then(res => {
          if (res.ok) { return res.json() }
        }).then(sibsribe => { setSubscribers((prev) => [...prev, sibsribe]) }).catch(error => { console.log(error) })
      }
      catch (error) { console.error(error);}
      let message_block = document.getElementById('message_block');
      message_block.innerHTML = '';
      let message_info = document.createElement('p');
      message_info.innerText = "Вы успешно подписались на скидку";
      message_info.classList.add('message_succes');
      message_block.append(message_info);
    }
}
//Функция - регистрация пользователя
const registerUser =  async (e) => {
  const user = {...e};
  //GET запрос если есть пользователь то отменяем регистрацию - поиск по email
  const newUser = await fetch(`${url}users/?email=` + `${e.email}`).then((res) => { return res.json() }).then((resUser) => { return resUser }).catch(error => { console.log(error) })
  //Если есть пользователь с таким же email - то стоп регистрации
  if (newUser.length >= 1) {
    setMessage('no')
    setIsSubmit(false)
    console.log('Нет')
  }
  //Если нет пользователя с таким же email - то регистрация
  else if (newUser.length == 0){
    await fetch(`${url}users`, {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(res => {
      if (res.ok) { return res.json() }
    }).then(user).catch(error => { console.log(error) })
    setMessage("yes")
    setIsSubmit(true)
    console.log('Да')
  }
  
}


  return (
    <Router>
      <div className='wrapper'>
        <Header/>
        <Routes>
          <Route path='' element={<Home toys={toys} category={category} subscribers={subscribers} subscribeOn={subscribeOn} toysPhotosList={toysPhotos} exact/>} />
          <Route path='product/category/:slug' element={<CategoryToys category={category} />} exact />
          <Route path='register/' element={<RegisterPage registerUser={registerUser} message={message} isSubmit={isSubmit}/>} exact/>
        </Routes>

        <Footer/>
      </div>
    </Router>
  );

}

export default App;
