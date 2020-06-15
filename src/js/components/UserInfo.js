import {authorInput, statusInput} from '../utils/constants.js';

export default class UserInfo {
    constructor(twoSelectors) {
        this._profileAuthor = twoSelectors.profileAuthor;
        this._profileStatus = twoSelectors.profileStatus;
    }
    getUserInfo() {
        const userInfo = {
            author: this._profileAuthor.textContent,
            status: this._profileStatus.textContent,
        }
        return userInfo;
    }
    setUserInfo() {
        this._profileAuthor.textContent = authorInput.value;
        this._profileStatus.textContent = statusInput.value;
    }
}