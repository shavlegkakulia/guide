

import commonKeys from '../models/commonKeys';

class AuthService {

    tokenKey = 'token';
    
    setToken(token, ) {
        localStorage.setItem(this.tokenKey, token);
    }

    getToken() {
        return localStorage.getItem(this.tokenKey);
    }

    removeToken() {
        localStorage.removeItem(this.tokenKey);
    }

    isAuthenticated() {
        let token = this.getToken();
        return token != null;
    }


    signIn(username, password) {
        let userBody = {
            username: username,
            password: password
        }

        localStorage.setItem(commonKeys.userInfo, JSON.stringify(userBody));
        this.setToken('123');
        return userBody;
    }


    signOut() {
        let fn = () => {
            this.removeToken();
        };
        //...todo
        fn();
    }
}

export default new AuthService();