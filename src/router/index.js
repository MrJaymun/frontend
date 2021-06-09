import VueRouter from 'vue-router'
import Auth from '../pages/Auth'
import Register from '../pages/Register';
import MainPage from '../pages/MainPage';
import AddTest from '../pages/AddTest';

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
        }

    ]
})