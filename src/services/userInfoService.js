

import commonKeys from '../models/commonKeys';

class UserInfoService {
    getUserInfo = () => {
        const user = localStorage.getItem(commonKeys.userInfo);
       
        let userBody = {
            username: user ? JSON.parse(user).username : null
        }
        return userBody;
    }
}

export default new UserInfoService();