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
    setUserInfo(data) {
        this._profileAuthor.textContent = data.author;
        this._profileStatus.textContent = data.status;
    }
}