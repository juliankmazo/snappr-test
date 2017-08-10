const roles = ['USER', 'SUPERVISOR', 'ADMIN'];

const getRandomInt = (min = 0, max = 2) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default class Auth {
  constructor(props) {
    this.login = this.login.bind(this);
    this.saveLogin = this.saveLogin.bind(this);
    this.loggedIn = this.loggedIn.bind(this);
    this.setUser = this.setUser.bind(this);
    this.getUser = this.getUser.bind(this);
    this.setToken = this.setToken.bind(this);
    this.getToken = this.getToken.bind(this);
  }

  login(username, password) {
    return new Promise((resolve, reject) => {
      resolve({
        username,
        token: '123456',
        role: roles[getRandomInt()]
      });
    });
  }

  async saveLogin(username, password, history) {
    const user = await this.login(username, password);
    this.setUser(user);
    this.setToken(user.token);
    history.replace('/');
  }

  loggedIn() {
    const token = this.getToken();
    return !!token;
  }

  setUser(user) {
    // Saves user access token and ID token into local storage
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem('user');
    return profile ? JSON.parse(localStorage.user) : {};
  }

  setToken(idToken) {
    // Saves user access token and ID token into local storage
    localStorage.setItem('id_token', idToken);
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  logout(history) {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('user');
    history.replace('/login');
  }
}
