import React, { Component } from 'react';

const User = () => {
  return <p className="lead">Hello user!</p>;
};
const Supervisor = () => {
  return <p className="lead">Hello Supervisor!</p>;
};
const Admin = () => {
  return (
    <div>
      <User />
      <Supervisor />
    </div>
  );
};

export default class Index extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }
  logout() {
    this.props.auth.logout(this.props.history);
  }

  render() {
    const user = this.props.auth.getUser();
    const { role } = user;
    return (
      <div>
        <div className="row">
          <div className="col">
            {role === 'USER' && <User />}
            {role === 'SUPERVISOR' && <Supervisor />}
            {role === 'ADMIN' && <Admin />}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button onClick={this.logout}>Logout</button>
          </div>
        </div>
      </div>
    );
  }
}
