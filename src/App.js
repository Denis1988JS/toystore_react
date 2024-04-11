import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; //Для работы ссылок и роутера маршрутов

//Импорты компонентов
import Header from './Components/Header/Header';//шапка сайта
import Footer from './Components/Footer/Footer';//подвал сайта
import Home from './Pages/Home';//домашняя страница


//url json-server
let url = 'http://localhost:3001/' // url-для сапросов на сервер

function App() {
  //Хуки useState
  const [toys, setToys] = React.useState([]);//Хук - карточки товаров (игрушек)
  const [category, setCategory] = React.useState([])//Хук - все категории товаров
  const [subscribers, setSubscribers] = React.useState([])//Хук - подписчики на скидку

//Запрос на сервер - получить все товары и все подписки на скидку
React.useEffect(()=>{
  async function fetchData(){
    try{
      const [toys, categories, subscribers] = await Promise.all([
      //Получаем список игрушек
      fetch(`${url}toys`).then((res) => {return res.json()}).then((toys) => { setToys(toys)}),
      //Получаем список категорий
      fetch(`${url}category`).then((res) => { return res.json() }).then((category) => { setCategory(category)}),
      //Список подписанных пользователей
      fetch(`${url}subscribers`).then((res) => { return res.json() }).then((subscribers) => { setSubscribers(subscribers)}),
    ])}
    
    //Отлов ошибок
    catch (error) { alert('Ошибка при запросе данных ;('); console.error(error);}
    }
    fetchData();
},[])

//Функция подписаться на скидку
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
      const lastId = subscribers_rev[0]['id'] + 1;
      let user = {
        "id": lastId,
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
        }).then(sibsribe => { console.log(sibsribe); setSubscribers((prev) => [...prev, sibsribe]) }).catch(error => { console.log(error) })
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

  return (
    <Router>
      <div className='wrapper'>
        <Header/>
        <Routes>
          <Route path='' element={<Home toys={toys} category={category} subscribers={subscribers} subscribeOn={subscribeOn} exact/>} />
        </Routes>

        <Footer/>
      </div>
    </Router>
  );

}

export default App;
