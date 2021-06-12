import Vue from 'vue'
import Vuex from 'vuex'
import {
    addUser,
    loginUser,
    registerUser,
    completeRegisterUser,
    firstSecureLevel, checkAvailOfTestName, addNewTest, addNewQuestion
} from "@/api/usual_user";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        nameOfText: '',
        questions:[
            {
                id: 0,
                firstAnswer: '',
                secondAnswer: '',
                thirdAnswer: '',
                fourthAnswer: '',
                correctAnswer: 1
            }
        ]

    },
    mutations: {
        addQuestion(state) {
            state.questions.push({
                id: state.questions.length,
                questionName: '',
                firstAnswer: '',
                secondAnswer: '',
                thirdAnswer: '',
                fourthAnswer: '',
                correctAnswer: 1
            })
            console.log(state.questions.length)
        },

        rewriteQuestion(state, payload) {
            let i = state.questions.findIndex(x => x.id == payload.id)


            state.questions.splice(i, 1, {
                id: payload.id,
                questionName: payload.questionName,
                firstAnswer: payload.firstAnswer,
                secondAnswer: payload.secondAnswer,
                thirdAnswer: payload.thirdAnswer,
                fourthAnswer: payload.fourthAnswer,
                correctAnswer: payload.correctAnswer
            })
        },
        removeQuestion(state){
            state.questions.pop();

        },
        removeAllQuestions(state){
            state.questions = [
                {
                    id: 0,
                    firstAnswer: '',
                    secondAnswer: '',
                    thirdAnswer: '',
                    fourthAnswer: '',
                    correctAnswer: 1
                }
            ]
        },
        addName(state, payload) {
            state.nameOfText = payload.name
        }

    },
    getters:{
        getQuestions(state){
            return state.questions
        },
        getName(state){
            return state.nameOfText
        }
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
        },
        // eslint-disable-next-line no-unused-vars
        async testNameChecker({commit}, payload){

            let result = (await checkAvailOfTestName(payload));
            return result
        },
        // eslint-disable-next-line no-unused-vars
        async addTest({commit}, payload){

            let result = (await addNewTest(payload));
            return result
        },
        // eslint-disable-next-line no-unused-vars
        async addQuestionToDataBase({commit}, payload){

            let result = (await addNewQuestion(payload));
            return result
        }

    }

})