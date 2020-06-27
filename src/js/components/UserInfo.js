export default class UserInfo {
    constructor(userInfoElement) {
        this._profileAuthor = userInfoElement.profileAuthor;
        this._profileStatus = userInfoElement.profileStatus;
    }
    getUserInfo() {
        return {
            author: this._profileAuthor.textContent,
            status: this._profileStatus.textContent,
        };
    }
    setUserInfo(data) {
        this._profileAuthor.textContent = data.name;
        this._profileStatus.textContent = data.about;
    }
}