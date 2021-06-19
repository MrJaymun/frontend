import VueRouter from 'vue-router'
import Auth from '../pages/Auth'
import Register from '../pages/Register';
import MainPage from '../pages/MainPage';
import AddTest from '../pages/AddTest';
import Personal from '../pages/Personal';
import Dashboard from '../pages/Dashboard';

export default new VueRouter({
    mode: 'history',
    routes:[
        {

            path: '/',
            component: Auth
        },
        {

            path: '/register',
            component: Register
        },
        {

            path: '/main',
            component: MainPage
        },
        {

            path: '/add-test',
            component: AddTest
        },
        {
            path: '/personal',
            component: Personal
        },
        {
            path: '/dashboard',
            component: Dashboard
        }
    ]
})