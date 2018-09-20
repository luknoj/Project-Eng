import React, { Component } from 'react';

class Login extends Component{

  constructor(props){
    super(props);
  }

  render(){
    
    return(
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="login col-8 mt-4 mb-4">
            <form className="login__form">
              <div className="form-group row justify-content-center align-items-center">
                <label className="col-2" htmlFor="emailFild">Adres email</label>
                <input type="email" className="col-6 form-control form-control-lg" id="emailField" placeholder="Email"/>
              </div>
              <div className="form-group row justify-content-center align-items-center">
                <label className="col-2" htmlFor="passwordField">Hasło</label>
                <input type="password" className="col-6 form-control form-control-lg mb-4" id="passwordField" placeholder="Password"/>
              </div>
              <div className="form-group row justify-content-center align-items-center">
                <button type="submit" class="btn btn-primary mb-2">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;