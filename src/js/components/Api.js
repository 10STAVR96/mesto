export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
        this._getHandler = options.getHandler;
        this._deleteCardHandler = options.deleteCardHandler;
        this._postCardHandler = options.postCardHandler;
    }
    getRequest() {
        return fetch(this._baseUrl, {headers: this._headers})
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((result) => {
                this._getHandler(result);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    deleteCard(id, className) {
        return fetch(this._baseUrl+id, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((result) => {
                this._deleteCardHandler(className);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    editProfileUser(name, about) {
        return fetch(this._baseUrl, {
            method: 'PATCH', 
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    editProfileAvatar(link) {
        return fetch(this._baseUrl, {
            method: 'PATCH', 
            headers: this._headers,
            body: JSON.stringify({
                avatar: link
            })
        })
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    addCard(card) {
        return fetch(this._baseUrl, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: card.name,
                link: card.link
            })
        })
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((result) => {
                this._postCardHandler(result);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    addLike(card) {
        return fetch(this._baseUrl+card.id, {
            method: 'PUT',
            headers: this._headers,
        })
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((result) => {
                card.likeCounter.textContent = result.likes.length;
            })
            .catch((err) => {
                console.log(err);
            });
    }
    deleteLikes(card) {
        return fetch(this._baseUrl+card.id, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((result) => {
                card.likeCounter.textContent = result.likes.length;
            })
            .catch((err) => {
                console.log(err);
            });
    }
  }