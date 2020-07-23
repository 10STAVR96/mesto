export default class UserInfo {
    constructor(userInfoElement, avatarElement) {
        this._profileAuthor = userInfoElement.profileAuthor;
        this._profileStatus = userInfoElement.profileStatus;
        this._avatar = avatarElement;
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
    getUserAvatar() {
        return this._avatar.src;
    }
    setUserAvatar(user) {
        this._avatar.src = user.avatar;
    };
    setUser(user) {
        this._profileAuthor.textContent = user.name;
        this._profileStatus.textContent = user.about;
        this._profileAuthor.id = user._id;
        this._avatar.src = user.avatar;
    }
}