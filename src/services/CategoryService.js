import axios from 'axios'
import SuperService from './SuperService'

const BACKEND_API_URL = process.env.REACT_APP_URL
class CategoryService extends SuperService {

    getCategories() {
        return this.requestWithHeader(axios.get, `${BACKEND_API_URL}/categories`)
    }

    save(category) {
        return this.requestWithHeader(axios.post, `${BACKEND_API_URL}/categories`, category)
    }

    getCategoryById(id) {
        return this.requestWithHeader(axios.get, `${BACKEND_API_URL}/categories/${id}`)
    }

    deleteCategory(id) {
        return this.requestWithHeader(axios.delete, `${BACKEND_API_URL}/categories/${id}`)
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
export default new CategoryService()