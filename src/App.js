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

//Запрос на сервер - получить все товары 
React.useEffect(()=>{
  async function fetchData(){
    try{
      const [toys] = await Promise.all([
      //Получаем список игрушек
      fetch(`${url}toys`).then((res) => {return res.json()}).then((toys) => { setToys(toys)}),
      //Получаем список категорий
      fetch(`${url}category`).then((res) => { return res.json() }).then((category) => { setCategory(category)}),
    ])}
    //Отлов ошибок
    catch (error) { alert('Ошибка при запросе данных ;('); console.error(error);}
    }
    fetchData();
},[])
    
  return (
    <Router>
      <div className='wrapper'>
        <Header/>
        <Routes>
          <Route path='' element={<Home toys={toys} category={category} exact/>} />
        </Routes>

        <Footer/>
      </div>
    </Router>
  );
}

export default App;
