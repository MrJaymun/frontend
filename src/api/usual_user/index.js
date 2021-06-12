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

export const checkAvailOfTestName = async (payload) => {
    return await Api.post(`/addTest/check`, payload)
};

export const addNewTest = async (payload) => {
    return await Api.post(`/addTest/registerTest`, payload)
};

export const addNewQuestion = async (payload) => {
    console.log('Я жив')
    return await Api.post(`/addTest/registerQuestion`, payload)
};