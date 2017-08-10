import React, { Component } from 'react';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.login = this.login.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  async login() {
    const {email, password} = this.state;

    await this.props.auth.saveLogin(email, password, this.props.history)
  }

  handleInput(event) {
    const { target: { value, name } } = event;

    this.setState(() => {
      return { [name]: value };
    });
  }

  render() {
    const { email } = this.state;
    return (
      <div className="row mt-5">
        <div className="col">
          <form onSubmit={this.login}>
            <div
              className={
                this.state.error ? 'form-group has-danger' : 'form-group'
              }>
              <label htmlFor="email">Email address</label>

              <input
                className="form-control form-control-lg"
                name="email"
                placeholder="Enter email"
                type="email"
                value={this.state.email}
                onChange={this.handleInput}
              />
            </div>

            <div
              className={
                this.state.error ? 'form-group has-danger' : 'form-group'
              }>
              <label htmlFor="password">Password</label>

              <input
                className="form-control form-control-lg"
                name="password"
                placeholder="Password"
                type="password"
                value={this.state.password}
                onChange={this.handleInput}
              />

              <div className="form-control-feedback mt-3">
                {this.state.error}
              </div>
            </div>

            <button
              className="btn btn-primary btn-lg"
              disabled={this.state.loading}>
              {this.state.loading ? 'Loading...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }
}
