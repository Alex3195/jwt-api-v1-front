import axios from 'axios'
import SuperService from './SuperService'

const BACKEND_API_URL = process.env.REACT_APP_URL
class GroupService extends SuperService {

    getGroups() {
        return this.requestWithHeader(axios.get, `${BACKEND_API_URL}/group`)
    }

    save(group) {
        return this.requestWithHeader(axios.post, `${BACKEND_API_URL}/group`, group)
    }

    getGroupById(id) {
        return this.requestWithHeader(axios.get, `${BACKEND_API_URL}/group/${id}`)
    }

    deleteGroup(id) {
        return this.requestWithHeader(axios.delete, `${BACKEND_API_URL}/group/${id}`)
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
}
export default new GroupService()