import React, { Component } from 'react';
import API from '../vendors/api-handlers';

class Register extends Component{

  constructor(props){
    super(props);

    this.state = {
      type: "",
      login: "",
      password: "",
      email: "",
      name: "",
      street: "",
      strNumber: "",
      nip: "",
      regon: "",
      city: ""
    }
  }

  handleSubmit(){
    API.registerUser(this.state.type, this.state.login, this.state.email, this.state.password, this.state.street, this.state.streetNumber, this.state.name, this.state.city, this.state.nip, this.state.regon)
    .then( response => {
      console.log(response);
    })
  }

  render(){
    return(
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="login col-8 mt-4 mb-4 ">
            <form className="login__form">
              <div className="form-group row justify-content-center align-items-center">
                <label className="col-2" htmlFor="inputState">Rodzaj konta</label>    
                <select id="inputState" class="col-6 form-control form-control-lg" value={this.state.type} onChange={(e) => this.setState({ type: e.target.value})}>
                  <option value="user">Użytkownik</option>
                  <option value="company">Firma</option>
                </select>        
              </div>
              <div className="form-group row justify-content-center align-items-center">
                <label className="col-2" htmlFor="emailFild">Adres email</label>
                <input type="email" className="col-6 form-control form-control-lg" id="emailField" placeholder="Email" onChange={(e) => this.setState({ email: e.target.value})}/>
              </div>
              <div className="form-group row justify-content-center align-items-center">
                <label className="col-2" htmlFor="emailFild">Login</label>
                <input type="text" className="col-6 form-control form-control-lg" id="loginField" placeholder="Login" onChange={(e) => this.setState({ login: e.target.value})}/>
              </div>
              <div className="form-group row justify-content-center align-items-center">
                <label className="col-2" htmlFor="passwordField">Hasło</label>
                <input type="password" className="col-6 form-control form-control-lg mb-4" id="passwordField" placeholder="Password" onChange={(e) => this.setState({ password: e.target.value})}/>
              </div>
              { this.state.type === "company" ? 
              <React.Fragment>
                <div className="form-group row justify-content-center align-items-center">
                  <label className="col-2" htmlFor="cityField">Miasto</label>
                  <input type="text" className="col-6 form-control form-control-lg mb-4" id="cityField" placeholder="Miasto" onChange={(e) => this.setState({ city: e.target.value})}/>
                </div>
                <div className="form-group row justify-content-center align-items-center">
                  <label className="col-2" htmlFor="nameField">Imię</label>
                  <input type="text" className="col-6 form-control form-control-lg mb-4" id="nameField" placeholder="Imię" onChange={(e) => this.setState({ name: e.target.value})}/>
                </div>
                <div className="form-group row justify-content-center align-items-center">
                  <label className="col-2" htmlFor="nipField">NIP</label>
                  <input type="text" className="col-6 form-control form-control-lg mb-4" id="nipField" placeholder="NIP" onChange={(e) => this.setState({ nip: e.target.value})}/>
                </div>
                <div className="form-group row justify-content-center align-items-center">
                  <label className="col-2" htmlFor="regonField">REGON</label>
                  <input type="text" className="col-6 form-control form-control-lg mb-4" id="regonField" placeholder="REGON" onChange={(e) => this.setState({ regon: e.target.value})}/>
                </div>
                <div className="form-group row justify-content-center align-items-center">
                  <label className="col-2" htmlFor="streetField">Ulica</label>
                  <input type="text" className="col-5 form-control form-control-lg mb-4 mr-2" id="streetField" placeholder="Ulica" onChange={(e) => this.setState({ street: e.target.value})}/>
                  <input type="text" className="col-1 form-control form-control-lg mb-4" id="streetNumberField" placeholder="Nr" onChange={(e) => this.setState({ streetNumber: e.target.value})}/>
                </div>
              </React.Fragment>
              :
              null
              }
              <div className="form-group row justify-content-center align-items-center">
                <button type="submit" class="btn btn-primary mb-2" onSubmit={() => this.handleSubmit}>Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Register;