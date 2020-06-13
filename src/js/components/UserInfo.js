import {authorInput, statusInput} from '../utils/constants.js';

export default class UserInfo {
    constructor(twoSelectors) {
        this._profileAuthor = twoSelectors.profileAuthor;
        this._profileStatus = twoSelectors.profileStatus;
    }
    getUserInfo() {
        authorInput.value = this._profileAuthor.textContent;
        statusInput.value = this._profileStatus.textContent;
    }
    setUserInfo() {
        this._profileAuthor.textContent = authorInput.value;
        this._profileStatus.textContent = statusInput.value;
    }
}