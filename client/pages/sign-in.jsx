import React from 'react';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      InisClicked: false,
      UpisClicked: false,
      signInUser: '',
      signInPw: '',
      signUpUser: '',
      signUpPw: ''
    };
    this.isClicked1 = this.isClicked1.bind(this);
    this.exit1 = this.exit1.bind(this);
    this.isClicked2 = this.isClicked2.bind(this);
    this.exit2 = this.exit2.bind(this);
    this.handleSignUpUser = this.handleSignUpUser.bind(this);
    this.handleSignUpPw = this.handleSignUpPw.bind(this);
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
  }

  isClicked1() {
    this.setState({ InisClicked: true });
  }

  exit1() {
    this.setState({ InisClicked: false });
  }

  isClicked2() {
    this.setState({ UpisClicked: true });
  }

  exit2() {
    this.setState({ UpisClicked: false });
  }

  handleSignUpUser(event) {
    this.setState({ signUpUser: event.target.value });
  }

  handleSignUpPw(event) {
    this.setState({ signUpPw: event.target.value });
  }

  handleSignUpSubmit(event) {
    event.preventDefault();
    const signUpCredentials = {
      username: this.state.signUpUser,
      password: this.state.signUpPw
    };
    fetch('/api/auth/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signUpCredentials)
    })
      .then(res =>
        res.json())
      .catch(err => console.error(err));
    this.setState({ signUpUser: '', signUpPw: '' }
    );
  }

  render() {
    if (this.state.InisClicked === true) {
      return (
        <div className="overlay2">
          <div className="in-menu">
            <form className="sign-in-form">
              <i onClick={this.exit1} className="running-exit fa-solid fa-person-running" />
              <div className="all-text-sign">
                <h4>Returning User? Sign in now!</h4>
                <label htmlFor="sign-in-text">Username<input required name="sign-in-text" id="sign-in-text" className="text-user" type="text" /></label>
                <label htmlFor="sign-in-pw">Password<input required name="sign-in-pw" id="sign-in-pw" className="text-password" type="password" /></label>
                <div> <button className="sign-button" type="submit">Sign In</button></div>
              </div>
            </form>
          </div>
        </div>
      );
    }
    if (this.state.UpisClicked === true) {
      return (
        <div className="overlay2">
          <div className="in-menu">
            <form method="post" onSubmit={this.handleSignUpSubmit} className="sign-in-form">
              <i onClick={this.exit2} className="running-exit fa-solid fa-person-running" />
              <div className="all-text-sign">
                <h3>New User? Sign up now!</h3>
                <label htmlFor="sign-up-user">Username<input required name="sign-up-user" id="sign-up-user" className="text-user" type="text" onChange={this.handleSignUpUser} value={this.state.signUpUser}/></label>
                <label htmlFor="sign-up-pw">Password<input required name="sign-up-pw" id="sign-up-pw" className="text-password" type="password" onChange={this.handleSignUpPw} value={this.state.signUpPw} /></label>
                <div> <button className="sign-button" type="submit">Sign Up</button></div>
              </div>
            </form>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="background-container">
            <div className="bg-img background" />
            <button onClick={this.isClicked1} className="sign-in-but"> Sign-In </button>
            <button onClick={this.isClicked2}className="sign-up-but">Sign-Up </button>
          </div>
        </div>
      );
    }
  }
}
