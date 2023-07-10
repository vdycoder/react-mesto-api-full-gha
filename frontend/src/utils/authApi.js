class AuthApi {
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
    return fetch(url, options).then(this._checkResponse)
  }

  signupUser(email, password) {
    return this._request(this._options.baseUrl + '/signup', {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
  }

  signinUser(email, password) {
    return this._request(this._options.baseUrl + '/signin', {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
  }

   getUserInfo(token) {
    this._options.headers.Authorization = `Bearer ${token}`
    return this._request(this._options.baseUrl + '/users/me', {
      headers: this._options.headers
    })
  }

}

const authApi = new AuthApi({
  baseUrl: 'https://api.mesto.vdycoder.nomoreparties.sbs',
  //baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default authApi;
