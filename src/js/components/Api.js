export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
    getProfileInfo() {
        return fetch(this._baseUrl+'users/me', {headers: this._headers})
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
    getCards() {
        return fetch(this._baseUrl+'cards', {headers: this._headers})
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
    deleteCard(id) {
        return fetch(this._baseUrl+'cards/'+id, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
    editProfileUser(name, about) {
        return fetch(this._baseUrl+'users/me', {
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
            });
    }
    editProfileAvatar(link) {
        return fetch(this._baseUrl+'users/me/avatar', {
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
            });
    }
    addCard(card) {
        return fetch(this._baseUrl+'cards', {
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
            });
    }
    addLike(card) {
        return fetch(this._baseUrl+'cards/likes/'+card.id, {
            method: 'PUT',
            headers: this._headers,
        })
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
    deleteLikes(card) {
        return fetch(this._baseUrl+'cards/likes/'+card.id, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
  }