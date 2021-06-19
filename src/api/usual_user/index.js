import Api from "../index"



export const addUser = async (payload) => {

    return await Api.post(`/users/add`, payload)
};

export const loginUser = async (payload) => {

    return await Api.post(`/auth`, payload)
};

export const registerUser = async (payload) => {

    return await Api.post(`/register`, payload)
};

export const completeRegisterUser = async (payload) => {

    return await Api.post(`/register/complete`, payload)
};


export const firstSecureLevel = async (payload) => {
    return await Api.post(`/main/first-level`, payload)
};

export const secondSecureLevel = async (payload) => {
    return await Api.post(`/main/second-level`, payload)
};

export const checkAvailOfTestName = async (payload) => {
    return await Api.post(`/addTest/check`, payload)
};

export const addNewTest = async (payload) => {
    return await Api.post(`/addTest/registerTest`, payload)
};

export const addNewQuestion = async (payload) => {

    return await Api.post(`/addTest/registerQuestion`, payload)
};

export const getLogin = async (payload) => {

    return await Api.post(`/personal/loginInfo`, payload)
};

export const getCreatedTests = async (payload) => {

    return await Api.post(`/personal/createCount`, payload)
};

export const getPassedTests = async (payload) => {

    return await Api.post(`/personal/passedCount`, payload)
};

export const changePassword = async (payload) => {

    return await Api.post(`/personal/newPassword`, payload)
};

export const getTestList = async (payload) => {

    return await Api.post(`/personal/testList`, payload)
};

export const getQuestionsList = async (payload) => {

    return await Api.post(`/personal/fullQuestions`, payload)
};

export const approveTest = async (payload) => {

    return await Api.post(`/personal/approveTest`, payload)
};

export const declineTest = async (payload) => {

    return await Api.post(`/personal/declineTest`, payload)
};

export const destroyTest = async (payload) => {

    return await Api.post(`/personal/deleteTest`, payload)
};

export const fullMyTest = async (payload) => {

    return await Api.post(`/personal/fullMyTest`, payload)
};

export const fullPassingTests = async (payload) => {

    return await Api.post(`/main/testToPass`, payload)
};

export const fullPassingQuestions = async (payload) => {

    return await Api.post(`/main/questionsToPass`, payload)
};

export const sendResults = async (payload) => {

    return await Api.post(`/main/sendTest`, payload)
};

export const fullDashboard = async (payload) => {

    return await Api.post(`/dashboard/allInfo`, payload)
};