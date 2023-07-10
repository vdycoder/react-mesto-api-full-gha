class Api {
    constructor(options) {
      this._options = options;
    }

    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }

    _request(url, options) {
      options.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`
      return fetch(url, options).then(this._checkResponse)
    }

    getInitialCards() {
      return this._request(this._options.baseUrl + '/cards', {
        headers: this._options.headers
      })
    }

    updateUserInfo(newUserData) {
      return this._request(this._options.baseUrl + '/users/me', {
        method: 'PATCH',
        headers: this._options.headers,
        body: JSON.stringify({
          name: newUserData.name,
          about: newUserData.about
        })
      })
    }

    postCard(item) {
      return this._request(this._options.baseUrl + '/cards', {
        method: 'POST',
        headers: this._options.headers,
        body: JSON.stringify({
          name: item.name,
          link: item.link
        })
      })
    }

    deleteCard(cardId) {
      return this._request(this._options.baseUrl + '/cards/' + cardId, {
        method: 'DELETE',
        headers: this._options.headers,
      })
    }

    changeLikeCardStatus(cardId, isLiked) {
      return this._request(this._options.baseUrl + '/cards/' + cardId + '/likes', {
        method: (isLiked ? 'PUT' : 'DELETE'),
        headers: this._options.headers,
      })
    }

    updateAvatar(userAvatar) {
      return this._request(this._options.baseUrl + '/users/me/avatar', {
        method: 'PATCH',
        headers: this._options.headers,
        body: JSON.stringify({
          avatar: userAvatar.avatar
        })
      })
    }

    getUserInfo() {
      return this._request(this._options.baseUrl + '/users/me', {
        headers: this._options.headers
      })
    }

}

const api = new Api({
  baseUrl: 'https://api.mesto.vdycoder.nomoreparties.sbs',
  //baseUrl: 'http://localhost:3000',
  headers: {
    //'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  }
});

export default api;
