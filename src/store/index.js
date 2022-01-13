import Vue from 'vue'
import Vuex from 'vuex'
import {
    addUser,
    loginUser,
    registerUser,
    completeRegisterUser,
    firstSecureLevel,
    secondSecureLevel,
    checkAvailOfTestName,
    addNewTest,
    addNewQuestion,
    getLogin,
    getCreatedTests,
    getPassedTests,
    changePassword,
    getTestList,
    getQuestionsList,
    approveTest,
    declineTest,
    destroyTest,
    fullMyTest,
    fullPassingTests, fullPassingQuestions, sendResults, fullDashboard, fullRatingInfo, beginTheTestPassing, failTest, getMediumTime
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
        ],
        tests:[],
        myTests: [],
        passer: [],
        currentQuestions: []
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

        },
        addAdminQuestion(state, payload) {
            state.questions.push({
                id: state.questions.length,
                questionName: payload.name,
                firstAnswer: payload.first,
                secondAnswer: payload.second,
                thirdAnswer: payload.third,
                fourthAnswer: payload.fourth,
                correctAnswer: payload.correct
            })

        },

        addTestToArray(state, payload) {
            state.tests.push({
                id: payload.id,
                testName: payload.name,
                category: payload.category

            })


        },

        addMyTestToArray(state, payload) {
            state.myTests.push({
                id: state.myTests.length,
                testName: payload.name,
                status: payload.status

            })


        },

        addPasser(state, payload) {
            state.passer.push({
                id: payload.id,
                cat_id: payload.cat_id,
                cat_name: payload.cat_name,
                name: payload.name,
                counter: payload.counter

            })

        },

        addQuestionToPass(state, payload) {
            state.currentQuestions.push({
                id: state.currentQuestions.length,
                questionName: payload.name,
                firstAnswer: payload.first,
                secondAnswer: payload.second,
                thirdAnswer: payload.third,
                fourthAnswer: payload.fourth,
                firstAnswerId: payload.firstId,
                secondAnswerId: payload.secondId,
                thirdAnswerId: payload.thirdId,
                fourthAnswerId: payload.fourthId,
                chosenAnswer: 0
            })

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
        removeAllQuestionsAdmin(state){
            state.questions = [

            ]
        },
        removeAllQuestionsToPass(state){
            state.currentQuestions = [

            ]
        },
        clearPasser(state){
            state.passer = [

            ]
        },
        addName(state, payload) {
            state.nameOfText = payload.name
        },
        clearQuestionList(state){
            state.questions = [

            ]
        },
        clearTestsList(state){
            state.tests = []
        },
        clearMyTestsList(state){
            state.myTests = []
        },

        deleteTest(state, payload) {
            let i = state.tests.findIndex(x => x.id == payload.id)
            state.tests.splice(i, 1)
        },

        changeDecision(state, payload) {
            let i = state.currentQuestions.findIndex(x => x.id == payload.id)
            state.currentQuestions.splice(i, 1, {
                id: payload.id,
                questionName: payload.name,
                firstAnswer: payload.first,
                secondAnswer: payload.second,
                thirdAnswer: payload.third,
                fourthAnswer: payload.fourth,
                firstAnswerId: payload.firstId,
                secondAnswerId: payload.secondId,
                thirdAnswerId: payload.thirdId,
                fourthAnswerId: payload.fourthId,
                chosenAnswer: payload.chosenAnswer
            })
        },

    },
    getters:{
        getQuestions(state){
            return state.questions
        },
        getName(state){
            return state.nameOfText
        },
        getTests(state){
            return state.tests
        },
        getMyTests(state){
            return state.myTests
        },
        getPassers(state){
            return state.passer
        },
        getCurrentQuestions(state){
            return state.currentQuestions
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
        async secondLevel({commit}, payload){

            let result = (await secondSecureLevel(payload));
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
        },
        // eslint-disable-next-line no-unused-vars
        async takeInfoAboutLogin({commit}, payload){

            let result = (await getLogin(payload));
            return result
        },
        // eslint-disable-next-line no-unused-vars
        async takeInfoAboutCreatedTests({commit}, payload){

            let result = (await getCreatedTests(payload));
            return result
        },
        // eslint-disable-next-line no-unused-vars
        async takeInfoAboutPassedTests({commit}, payload){

            let result = (await getPassedTests(payload));
            return result
        },
        // eslint-disable-next-line no-unused-vars
        async changePasswordToNew({commit}, payload){

            let result = (await changePassword(payload));
            return result
        },
        // eslint-disable-next-line no-unused-vars
        async  testList({commit}, payload){
            let result = (await getTestList(payload));
            return result
        },
        // eslint-disable-next-line no-unused-vars
        async  fullQuestionsForAdmin({commit}, payload){
            let result = (await getQuestionsList(payload));
            return result
        },

        // eslint-disable-next-line no-unused-vars
        async  approveTheTest({commit}, payload){
            let result = (await approveTest(payload));
            return result
        },

        // eslint-disable-next-line no-unused-vars
        async  declineTheTest({commit}, payload){
            let result = (await declineTest(payload));
            return result
        },

        // eslint-disable-next-line no-unused-vars
        async  destroyTheTest({commit}, payload){
            let result = (await destroyTest(payload));
            return result
        },

        // eslint-disable-next-line no-unused-vars
        async  fullOnlyMyTests({commit}, payload){
            let result = (await fullMyTest(payload));
            return result
        },
        // eslint-disable-next-line no-unused-vars
        async  getTime({commit}, payload){
            let result = (await getMediumTime(payload));
            return result
        },
        // eslint-disable-next-line no-unused-vars
        async  fullAllPassingTests({commit}, payload){
            let result = (await fullPassingTests(payload));
            return result
        },
        // eslint-disable-next-line no-unused-vars
        async  fullAllPassingQuestions({commit}, payload){
            let result = (await fullPassingQuestions(payload));
            return result
        },

        // eslint-disable-next-line no-unused-vars
        async  sendResultsToServer({commit}, payload){
            let result = (await sendResults(payload));
            return result
        },

        // eslint-disable-next-line no-unused-vars
        async  beginTheTest({commit}, payload){

            let result = (await beginTheTestPassing(payload));
            return result
        },

        // eslint-disable-next-line no-unused-vars
        async  failTheTest({commit}, payload){
            let result = (await failTest(payload));
            return result
        },

        // eslint-disable-next-line no-unused-vars
        async  takeDashboard({commit}, payload){
            let result = (await fullDashboard(payload));
            return result
        },

        // eslint-disable-next-line no-unused-vars
        async  fullRating({commit}, payload){
            let result = (await fullRatingInfo(payload));
            return result
        }
    }

})