import Vue from 'vue'
import Vuex from 'vuex'
import {
    addUser,
    loginUser,
    registerUser,
    completeRegisterUser,
    firstSecureLevel
} from "@/api/usual_user";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {


    },
    mutations: {

    },
    getters:{

    },

    actions:{

        // eslint-disable-next-line no-unused-vars
        async sendInfoAboutNewUser({commit}, payload){

            let result = (await addUser(payload));
            return result.status
        },
        // eslint-disable-next-line no-unused-vars
        async  loginCheck({commit}, payload){

            let result = (await loginUser(payload));
            return result
        },
        // eslint-disable-next-line no-unused-vars
        async  registerCheck({commit}, payload){
            let result = (await registerUser(payload));
            return result
        },
        // eslint-disable-next-line no-unused-vars
        async registerNewUser({commit}, payload){
            let result = (await completeRegisterUser(payload));
            return result
        },
        // eslint-disable-next-line no-unused-vars
        async firstLevel({commit}, payload){

            let result = (await firstSecureLevel(payload));
            return result
        }

    }

})