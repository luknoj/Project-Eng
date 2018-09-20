import axios from 'axios';

const URL = 'http://localhost:8000';

export default class API {

  static async checkCompany(){
    return axios.get(`${URL}/users`)
    .then( response => {
      if(response.data)
        return response.data;
      else
        return []; 
    })
  };

  static async loginUser(login, password){
    return axios.post(`${URL}/users/login`, {login, password})
    .then(response => {
      return response;
    })
  }

  static async registerUser(type, login, email, password, street, streetNumber, name, city, nip, regon){
    return axios.post(`${URL}/users/register`, {type, login, email, password, street, streetNumber, name, city, nip, regon})
    .then(response => {
      console.log(response);
      return response;
    })
  }

  static async editUser(token, newUserData){
    return axios.post(`${URL}/users/edit`)
    .then(response => {
      return response;
    })
  }
}
