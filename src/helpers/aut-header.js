// return authorization header with jwt token
export function authHeader() {
    let user = JSON.parse(localStorage.getItem('token'));
    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}