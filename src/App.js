import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; //Для работы ссылок и роутера маршрутов
import { getUser } from './modulesFunction';//Импорт своих функций
//Импорты компонентов
import Header from './Components/Header/Header';//шапка сайта
import Footer from './Components/Footer/Footer';//подвал сайта
import Home from './Pages/Home';//домашняя страница
import RegisterPage from './Pages/RegisterPage';//Регистрация на сайте
import CategoryToys from './Pages/CategoryToys';//Страница товары в разрезе категории
import AuthorisationPage from './Pages/AuthorisationPage';//Страница авторизация на сайте
import CartPage from './Pages/CartPage';//Страница - корзина покупок
import Checkout from './Pages/Checkout';//Страница - подтверждение заказа
import OrdersRage from './Pages/Orders';//Страница - список заказов пользователя
import OrderDetail from './Pages/OrderDetailPage';//Страница - детализация заказа
import AccauntPage from './Pages/AccauntPage';//Страница - личный кабинет пользователя

//url json-server
let url = 'http://localhost:3001/' // url-для сапросов на сервер

function App() {
  
  //Хуки useState
  const [toys, setToys] = React.useState([]);//Хук - карточки товаров (игрушек)
  const [category, setCategory] = React.useState([]);//Хук - все категории товаров
  const [toysPhotos, setToysPhotos ] = React.useState([]);//Хук - список фотографий игрушек 6 фото
  const [authUser, setAuthUser] = React.useState('');//Хук - состояние авторизованный пользователь
  const [lSUser, setLSUser] = React.useState([]);//Состояние данные из localestorage - пользователь
  const [redirectPath, setRedirectPath] = React.useState(false);//Состояние для перемещения при успешной авторизации/регистрации на главную старницу
  const [orderSuccessSubmit, setOrderSuccessSubmit] = React.useState(false);//Состояние для перемещения при успешном оформлении заказа
  const [userCartItems, setUserCartItems] = React.useState([]);//Состояние - корзина товаров пользователя
  const [subscribeMessage, setSubscribeMessage] = React.useState('');//Состояние - подписан ли пользователь/гость
  const [userOrdersList, setUserOrdersList] = React.useState([]);//Состояние - заказы пользователя
  const [productInOrder, setProductInOrder] = React.useState([]);//Состояние - список товаров в заказе - получаем по user_id - потом отображаем привязывая через order_id
  const [likesGoods, setLikesGoods] = React.useState([]);//Состояние - список избранных товаров
  //Ref
  const subscriptionRef = React.useRef();//Хук useRef - на элемент формы подписки
 
  //-----------useEffect - при первой загрузке страниц------------//
  //Запрос на сервер при первой загрузке страницы - получаем пользователя из данных localStorege по name, email - меняем состояние authUser пользователя + избранные товары
  React.useEffect(() => {
    const getUser = async () => {
      let localStorageUser = JSON.parse(localStorage.getItem('authUserLS'));
      if (localStorageUser) {
        //Получаем пользователя переопределяя authUser и еще возвращаем id-пользователя для получения корзины покупок
        const userID = await fetch(`${url}users/?name=${localStorageUser['name']}&email=${localStorageUser['email']}`).then((res) => { return res.json() }).then((resUser) => { setAuthUser(resUser[0]); return resUser[0] }).catch(error => { console.log(error) })
      //Получаем корзину покупок (список)
        const cart = await fetch(`${url}cart/?user_id=${userID['id']}`).then((res) => res.json()).then((cart) => {return cart}).catch(error => { console.log(error) })
        setUserCartItems(cart)
      //Получаем список заказов пользователя
        const order = await fetch(`${url}order/?user_id=${userID['id']}`).then((res) => res.json()).then((cart) => { return cart }).catch(error => { console.log(error) })
        setUserOrdersList(order)
      //Избранные товары
        const likesGoods = await fetch(`${url}likesGoods/?user_id=${userID['id']}`).then((res) => res.json()).then((likesGoods) => { return likesGoods }).catch(error => { console.log(error) })
        setLikesGoods(likesGoods)
    }
      else {
        setAuthUser('');
      }
    };
    getUser()
  },[]);
  
  //Получаем LocaleStorage и меняем состояние lSUser
  React.useEffect(() => {
      let localStorageUser = JSON.parse(localStorage.getItem('authUserLS'));
      setLSUser(localStorageUser)
  },[]);

  //Запрос на сервер - список товаров, категорий товаров, и фотографий - при первой загрузке страницы
  React.useEffect(()=>{
    async function fetchData(){
      try{
        await Promise.all([
        //Получаем список игрушек
        fetch(`${url}toys`).then((res) => {return res.json()}).then((toys) => { setToys(toys)}),
        //Получаем список категорий
        fetch(`${url}category`).then((res) => { return res.json() }).then((category) => { setCategory(category)}),
        //Список фотографий игрушек
        fetch(`${url}toy_photos`).then((res) => { return res.json() }).then((toys) => { setToysPhotos(toys.slice(0, 6))}),
      ])}
      //Отлов ошибок
      catch (error) { console.log('Ошибка при запросе данных ;(', error)}
      }
      fetchData();
  },[]);

  //-----------useEffect - при обновлении определенных компонентов------------//

  //При обновлении lSUser - когда регистрация на сайте при изменении lSUser (localeStorage) получаем пользователя из данных localStorege по name, email - меняем состояние authUser пользователя 

  React.useEffect(()=> {
    const getUser = async () => {
      let localStorageUser = JSON.parse(localStorage.getItem('authUserLS'));
      if (localStorageUser) {
        await fetch(`${url}users/?name=${localStorageUser['name']}&email=${localStorageUser['email']}`).then((res) => { return res.json() }).then((resUser) => { setAuthUser(resUser[0]) }).catch(error => { console.log(error) })
      }
      else {
        setAuthUser('');
      }
    };
    getUser()
  }, [lSUser])

  
  //Функции обработчики --------------------


  //Функция - logOut - выход с сайта - очищаем localStorage -  меняем состояния authUser и lSUser
  const logOut = () => {
    localStorage.clear();
    setLSUser('');
    setAuthUser('')
    console.log('Выход пользователя с сайта')
  }

  //Функция - регистрация на сайте + если регистрация успешна - авторизация - занесение в localStorage
  const registerUserForm = async (values) => {
    //Запрос на сервер - есть ли такой пользователь 
    let userData = await fetch(`${url}users/?email=` + `${values.email}`).then((res) => { return res.json() }).then((resUser) => { return resUser }).catch(error => { console.log(error) })
    //Если пользователь есть - длина ответа 1 и выше то не регистрируем
    if (userData.length >= 1){
      alert('Такой пользователь уже существует')
    }
    //Если ответ пустой то регистрация пользователя - вносим в localStorege (name, email) и базу данных и меняем состояние userAuth 
    else if (userData.length === 0) {
      let newUser = { ...values };
      await fetch(`${url}users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      }).catch(error => { console.log(error, 'Ошибка регистрации !!!') })
      localStorage.setItem('authUserLS', JSON.stringify({ name: newUser['name'], email: newUser['email']}));
      let localStorageUser = JSON.parse(localStorage.getItem('authUserLS'));
      setLSUser(localStorageUser)
      setRedirectPath(true)
    }
  };

  //Функция - авторизация на сайте + если регистрация успешна - авторизация - занесение в localStorage
  const authorisationUserForm = async (values) =>{
    //Делаем запрос в бд поиск пользователя по name, email
    let userData = await fetch(`${url}users/?email=` + `${values.email}&name=` + `${values.name}&password=` + `${values.password}`).then((res) => { return res.json() }).then((resUser) => { return resUser }).catch(error => { console.log(error) })
    console.log(userData[0])
    if (userData.length === 1 && userData[0].password == values.password){
      localStorage.setItem('authUserLS', JSON.stringify({ name: userData[0]['name'], email: userData[0]['email'] }));
      let localStorageUser = JSON.parse(localStorage.getItem('authUserLS'));
      setLSUser(localStorageUser)
      setRedirectPath(true)
    }
    else if (userData.length !== 1 || userData[0] == undefined){
      console.log('Ошибка в авторизации')
    }

  }
  //Функция добавить товар в корзину
  const addToCart = async (obj) => {
    //Ищем совпадения в корзине покупок по id- товара
    let elemFind = userCartItems.filter((e) => { return Number(e.product_id)=== Number(obj.toyId)})
    //Если товара нет в корзине - создаем объект и добавляем его в корзину(fetch) и обновляем состояние корзины (setUserCartItems)
    if(elemFind.length === 0){
      //создаем объект - товар для добавления в корзину (БАЗА ДАННЫХ)
      let newCartItems = {
        "user_id": authUser.id,
        "product_id": obj.toyId,
        "product_name": obj.title,
        "product_price": obj.price,
        "product_quantity": 1,
        "product_image": obj.image
      }
      //Запрос к БД - вносим данные новый товар + получаем эти данные с id
      let newItem = await fetch(`${url}cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCartItems),
      }).then((res)=> {return res.json()}).then((newItem)=>{return newItem}).catch(error => { console.log(error, 'Ошибка !!!') })
      //Меняем состояние - userCartItems - корзину покупок
      setUserCartItems((prev) => [...prev, newItem])
      console.log('Добавили новый товар', newItem)
    }
    //Если товар есть в корзине
    else if (elemFind.length === 1) {
      console.log('Товар есть в корзине !!!')
    }
  }
  //Функция - уаление товара из корзины
  const delFromCart = async (obj) => {
    //Меняем состояние корзины покупок userCartItems
    setUserCartItems((userCartItems) => userCartItems.filter((item) => item.id !== obj))
    //Запрос fetch на удаление товара из корзины по id товара - product_id
    await fetch(`${url}cart/${obj}`,{
      method: "DELETE",
    }).then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }
  //Функция + товар в корзине
  const plusToyCart = async (obj) => {
    //Создаем объект для добавления в корзину с + 1
    let newCartItems = {
      "id": obj.id,
      "user_id": obj.user_id,
      "product_id": obj.product_id,
      "product_name": obj.product_name,
      "product_price": obj.product_price,
      "product_quantity": obj.product_quantity + 1,
      "product_image": obj.product_image
    }
    //Добавляем новый с количеством +1 - перебирая корзину покупок и меняя значение на +1 у нужного объекта корзины
    userCartItems.map((toy)=>{
      if (toy.id===newCartItems.id){
        toy['product_quantity'] = toy['product_quantity'] +1
      }
      return userCartItems
    })
    //Мняем состояние
    setUserCartItems([...userCartItems])
    //Запрос fetch - put - обновляем данные - вносим newCartItems с +1 product_quantity
    fetch(`${url}cart/${newCartItems.id}`,{
      method:'PUT',
      body: JSON.stringify({
        "id": obj.id,
        "user_id": obj.user_id,
        "product_id": obj.product_id,
        "product_name": obj.product_name,
        "product_price": obj.product_price,
        "product_quantity": obj.product_quantity,
        "product_image": obj.product_image
      }),
      headers: {"Content-type": "application/json; charset=UTF-8"}})
      .then(response => response.json())
      .then(json => console.log(json))
  }

  //Функция - товар в корзине -1
  const minusToyCart = async (obj) => {
    if (obj.product_quantity > 1){
      //Создаем объект для добавления в корзину с + 1
      let newCartItems = {
        "id": obj.id,
        "user_id": obj.user_id,
        "product_id": obj.product_id,
        "product_name": obj.product_name,
        "product_price": obj.product_price,
        "product_quantity": obj.product_quantity - 1,
        "product_image": obj.product_image
      }
      //Убираем новый с количеством -1 - перебирая корзину покупок и меняя значение на -1 у нужного объекта корзины
      userCartItems.map((toy) => {
        if (toy.id === newCartItems.id) {
          toy['product_quantity'] = toy['product_quantity'] - 1
        }
        return userCartItems
      })
      setUserCartItems([...userCartItems])
      //Запрос fetch - put - обновляем данные - вносим newCartItems с -1 product_quantity
      fetch(`${url}cart/${newCartItems.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          "id": obj.id,
          "user_id": obj.user_id,
          "product_id": obj.product_id,
          "product_name": obj.product_name,
          "product_price": obj.product_price,
          "product_quantity": obj.product_quantity,
          "product_image": obj.product_image
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      })
        .then(response => response.json())
        .then(json => console.log(json))
    }
    else console.log('НЕТТТТТ')
  }

  //Функция - подписка на сайте
  const subscriptionHandle = async () => {
    let subscriberEmail = subscriptionRef.current.value;
    try {
      const subscriber = await fetch(`${url}subscribers/?email=${subscriberEmail}`).then((res) => { return res.json() }).then((subscriberData) => { return subscriberData }).catch(error => { return [{email:false}]});
      let emailSubscriber = subscriber[0]['email'];
      if (String(emailSubscriber).toLowerCase() === String(subscriberEmail).toLowerCase()){
        console.log(`По email ${subscriber[0]['email']} - уже подписка оформлена ранее`)
        setSubscribeMessage(false)
      }
    }
    catch (TypeError){
      let newSubscriber = {
        email:subscriberEmail,
        time_sibsribe: new Date()
      }
      await fetch(`${url}subscribers/`,{
        method:"POST",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(newSubscriber)
      }).then(res => {if (res.ok) {return res.json()}}).then().catch(error => { console.log(error) })
      console.log('Вы успешно оформили подписку')
      setSubscribeMessage(true)
    }
  }

  //Функция - оформить заказ
  const makeOrder = async (values) => {
    //Общая сумма заказа 
    let totalPrice = userCartItems.reduce((sum, obj) => (obj.product_price * obj.product_quantity) + sum, 0);
    //Создаем заказ из данных формы +  POST запрос - передаем новый заказ в БД и получаем id-нового заказа
    let newOrder = {
      user_id: authUser.id,
      data: new Date(),
      name: values.name,
      email: values.email,
      phone: values.phone,
      city:values.city,
      adress: values.address,
      comment: values.comment,
      paymentType: values.paymentType,
      totalPrice: totalPrice,
    }
    let order_id = await fetch(`${url}order/`,{
      method:'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newOrder)
    }).then(res => { if (res.ok) { return res.json() } }).then((order)=>{ return order.id }).catch(error => { console.log(error) })
    //На основании корзины покупок создаем товары к заказу - привязка через id-заказа и id-пользователя
    userCartItems.map((cart)=>{
      let newProductInOrder = {
        order_id: order_id,
        user_id: authUser.id,
        product_id: cart.product_id,
        product_name: cart.product_name,
        product_price: cart.product_price,
        product_quantity: cart.product_quantity,
        product_image: cart.product_image,
      }
      //запрос добавляем товар в базу данных - товары к заказам
      fetch(`${url}productInOrder`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(newProductInOrder)
      }).then(res => { if (res.ok) { return res.json() } }).then().catch(error => { console.log(error) })

      //Запрос удаляем товар из корзины покупок (БД) и обновляем состояние userCartItems
      //Меняем состояние корзины покупок userCartItems
      setUserCartItems((userCartItems) => userCartItems.filter((item) => item.id !== cart.id))
      //Запрос fetch на удаление товара из корзины по id товара - product_id
      fetch(`${url}cart/${cart.id}`, {
        method: "DELETE",
      }).then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    })
    setOrderSuccessSubmit(true)
  } 
  //Запрос на сервер - получаем все товары во всех заказах
  React.useEffect(() => {
    const getProductInOrder = async () => {
      let productInOrder = await fetch(`${url}productInOrder/?user_id=${authUser['id']}`).then((res) => { return res.json() }).then((listProduct) => { return listProduct }).catch(error => { console.log(error) })
      setProductInOrder(productInOrder)
    };
    getProductInOrder()
  }, [userOrdersList, userCartItems, authUser])

  //Функция - добавить товар в избранные (товар(obj) + id пользователя)
  const addLikes = async(obj, user_id = authUser.id) => {
    let likeId = '';
    //Создаем объект для передачи в БД
    let newLikesToy = {
      "user_id": user_id,
      "product_id":obj.toyId,
      "product_name":obj.title,
      "product_image":obj.image
    }
    if (likesGoods.find((fav) => Number(fav.product_id) === Number(obj.toyId,  likeId=fav.id))){
      await fetch(`${url}likesGoods/${likeId}`, {
        method: "DELETE",
      }).then((response) => response.json())
        .then((result) => result)
        .catch((error) => console.error(error));
      setLikesGoods((prev) => prev.filter((item) => Number(item.product_id) !== Number(obj.toyId)));
    }
      
    else {
      //Запрос в базу данных POST - вносим данные в БД
      let newLikes = await fetch(`${url}likesGoods`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLikesToy),
      }).then((res) => { return res.json() }).then((newToy) => { return newToy }).catch(error => { console.log(error, 'Ошибка !!!') })
      setLikesGoods((prev) => [...prev, newLikes]);
    }
  }

  return (
    <Router>
      <div className='wrapper'>
        <Header authUser={authUser} logOut={logOut}/>
        <Routes>
          <Route path='/' element={<Home toys={toys} category={category} toysPhotos={toysPhotos} addToCart={addToCart} addLikes={addLikes} subscriptionHandle={subscriptionHandle} subscriptionRef={subscriptionRef} subscribeMessage={subscribeMessage} likesGoods={likesGoods} exact/>} />
          <Route path='product/category/:slug' element={<CategoryToys category={category} likesGoods={likesGoods} addLikes={addLikes} addToCart={addToCart} />} exact />
          <Route path='register/' element={<RegisterPage registerUserForm={registerUserForm} redirectPath={redirectPath} />} exact/>
          <Route path='authorisation/' element={<AuthorisationPage authorisationUserForm={authorisationUserForm} redirectPath={redirectPath}  exact/>}/>
          <Route path='cart/' element={<CartPage userCartItems={userCartItems} delFromCart={delFromCart} plusToyCart={plusToyCart} minusToyCart={minusToyCart} makeOrder={makeOrder} />}/>
          <Route path='make_chekout/' element={<Checkout makeOrder={makeOrder} userCartItems={userCartItems} orderSuccessSubmit={orderSuccessSubmit}/>}/>
          <Route path='orders/' element={<OrdersRage userOrdersList={userOrdersList} authUser={authUser} productInOrder={productInOrder}/>} />
          <Route path='orders/:id' element={<OrderDetail />} exact />
          <Route path='account/:id' element={<AccauntPage userData={lSUser} likesGoods={likesGoods}/>} exact />
        </Routes>

        <Footer/>
      </div>
    </Router>
  );

}

export default App;
