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