import Home from '../pages/Home';
import Login from "../pages/Login"
import NotFoundPage from '../pages/404';
import Product from '../pages/product';
import ProductDetail from "../pages/ProductDetail"
import CartPage from "../pages/cartPage"
import Register from '../pages/Register';
import OrderPage from '../pages/OrderList';
import setPasswordPage from '../pages/setPassword';
// không cần đăng nhập vẫn xem được
const publicRouters  = [
    {path: '/', component: Home},
    {path: '/login', component: Login, Layout: null},
    {path: '/register', component: Register, Layout: null},
    {path: '/product', component: Product},
    {path: '/productDetail', component: ProductDetail},
    {path: '/cart', component: CartPage},
    {path: '/order', component: OrderPage},
    {path: '/setPass', component: setPasswordPage},


    
    {path: '*', component: NotFoundPage  ,Layout: null},



]
// phải đăng nhập
const privateRouters = [

]

export {publicRouters, privateRouters}