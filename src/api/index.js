import api from "axios"


const instance  = api.create({
    baseURL: "http://localhost:3000",
    headers: {
        accept: 'applications/json',
        'Access': 'Bearer ' + localStorage.getItem('token')
    }

});

class Api {

    static async get(url) {
        return await instance.get(url);
    }


    static async post(url, data) {
        const dt = JSON.parse(JSON.stringify(data));
        return await instance.post(url, dt);
    }

    static async put(url, data) {
        return await instance.put(url, data);
    }

    static async delete(url, data) {
        return await instance.delete(url, { data: data });
    }
}
export default Api;

