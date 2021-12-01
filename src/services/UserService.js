import axios from 'axios'
import SuperService from './SuperService'

const BACKEND_API_URL = process.env.REACT_APP_URL
class UserService extends SuperService {

    checkLogin(username, password) {
        const user = { username, password }
        return this.requestWithHeader(axios.post, `${BACKEND_API_URL}/auth/login`, user)
    }

    getUsers() {
        return this.requestWithHeader(axios.get, `${BACKEND_API_URL}/user`)
    }

    save(user) {
        return this.requestWithHeader(axios.post, `${BACKEND_API_URL}/user`, user)
    }
    update(user) {
        return this.requestWithHeader(axios.patch, `${BACKEND_API_URL}/user`, user)
    }

    getUserById(id) {
        return this.requestWithHeader(axios.get, `${BACKEND_API_URL}/user/${id}`)
    }
    getUserByUserName(username) {
        console.log(username)
        return this.requestWithHeader(axios.get, `${BACKEND_API_URL}/user/get/${username}`)
    }

    checkPassword(username, password) {
        return this.requestWithHeader(axios.post, `${BACKEND_API_URL}/auth/check-password`, { username, password })
    }
    deleteUser(id) {
        return this.requestWithHeader(axios.delete, `${BACKEND_API_URL}/user/${id}`)
    }


    handleResponse(response) {
        console.log(response.text())
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if (response.status === 401) {
                    // auto logout if 401 response returned from api
                    this.logout();
                    //location.reload(true);
                }

                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            return data;
        }).catch(error => {
            console.log(error)

        });
    }
    isLoggedin() {
        let user = JSON.parse(localStorage.getItem('user'));

        if (user && user.jwt) {
            return true
        } else {
            return false
        }
    }


    logout() {
        // remove user from local storage to log user out
        this.user = null;
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
    }
}
export default new UserService()