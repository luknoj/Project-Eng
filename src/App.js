import './css/main.css';
import React, { Component } from 'react';
import {
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom';
import axios from 'axios';
import currency from 'format-currency';
import Main from './components/Main';
import Login from './components/Login';
import Register from './components/Register';
import SearchResult from './components/SearchResult';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel, faHandshake, faUser, faUserTie, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import Footer from './components/Footer';

library.add(faHandshake, faUser, faUserTie, faCaretDown, faCaretUp)


const NIP_URL = 'https://api-v3.mojepanstwo.pl/dane/krs_podmioty.json?conditions[krs_podmioty.nip]=';
const LAYERS = '?layers[]=dzialalnosci&layers[]=reprezentacja&layers[]=wspolnicy';
const URL = 'https://api-v3.mojepanstwo.pl/dane/krs_podmioty/';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      query: "",
      result: null
    }
  }
  
  handleNewSearch = async (companyId) => {
    try {
    const data = await axios.get(URL + companyId + '.json');
    const layersData = await axios.get(URL + companyId + '.json' + LAYERS)      
    const relationsData = await axios.get(URL + companyId + '.json?layers[]=graph')
    const relations  = await relationsData.data.layers.graph.relationships
    const nodes = relationsData.data.layers.graph.nodes
    const { layers } = await layersData.data    
    const info = await data.data.data
    // console.log(data);
    var nodesMap;
      nodes.map((node) => {        
        const newObj = { [node.id]: { 
          nazwa: node.id.includes('podmiot') ? node.data.nazwa : `${node.data.nazwisko} ${node.data.imiona}`,
          id: node.mp_id,
        } }
        nodesMap = Object.assign({...nodesMap}, newObj)        
      })
      
      const relationsMap = relations.map((relation) => {
        return {
          osoba: nodesMap[relation.start].nazwa,
          firma: nodesMap[relation.end].nazwa,
          id_firmy: nodesMap[relation.end].id,
          stanowisko: relation.type,
        }
      }).filter((relation) => relation.firma !== info['krs_podmioty.firma'])
     this.setState({
        result: {
          adres: info["krs_podmioty.adres_kod_pocztowy"] + ' ' + info["krs_podmioty.adres_miejscowosc"] + ', ' + info["krs_podmioty.adres_ulica"] + ' ' + info["krs_podmioty.adres_numer"]+ '/' + info["krs_podmioty.adres_lokal"],
          nazwa: info["krs_podmioty.firma"],
          formaPrawna: info["krs_podmioty.forma_prawna_str"],
          krs: info["krs_podmioty.krs"],
          nip: info["krs_podmioty.nip"],
          regon: info["krs_podmioty.regon"],
          organRep: info["krs_podmioty.nazwa_organu_reprezentacji"],
          sposobRep: info["krs_podmioty.sposob_reprezentacji"],
          kapital: info["krs_podmioty.wartosc_kapital_zakladowy"],
          numerWpisu: info["krs_podmioty.numer_wpisu"],
          dataWpisu: info["krs_podmioty.data_dokonania_wpisu"],
          dataRejestracji: info["krs_podmioty.data_rejestracji"],
          reprezentacja: layers.reprezentacja,
          wspolnicy: layers.wspolnicy,
        },
        relations: relationsMap,
      })
    } catch (error) {
      console.log(error);
    } 
  }

  handleSubmit = async () => {
    try {
      const infoData = await axios.get(NIP_URL + this.state.query)
      const id = await infoData.data.Dataobject[0].id
      const layersData = await axios.get(URL + id + '.json' + LAYERS)      
      const relationsData = await axios.get(URL + id + '.json?layers[]=graph')
      const relations  = await relationsData.data.layers.graph.relationships
      const nodes = relationsData.data.layers.graph.nodes
      const { layers } = await layersData.data
      const info = await infoData.data.Dataobject[0].data
      
      var nodesMap;
      nodes.map((node) => {
        const newObj = { [node.id]: { 
          nazwa: node.id.includes('podmiot') ? node.data.nazwa : `${node.data.nazwisko} ${node.data.imiona}`,
          id: node.mp_id,
        } }
        nodesMap = Object.assign({...nodesMap}, newObj)        
      })
      
      const relationsMap = relations.map((relation) => {
        return {
          osoba: nodesMap[relation.start].nazwa,
          firma: nodesMap[relation.end].nazwa,
          id_firmy: nodesMap[relation.end].id,
          stanowisko: relation.type,
        }
      }).filter((relation) => relation.firma !== info['krs_podmioty.firma'])
     this.setState({
        result: {
          adres: info["krs_podmioty.adres_kod_pocztowy"] + ' ' + info["krs_podmioty.adres_miejscowosc"] + ', ' + info["krs_podmioty.adres_ulica"] + ' ' + info["krs_podmioty.adres_numer"]+ '/' + info["krs_podmioty.adres_lokal"],
          nazwa: info["krs_podmioty.firma"],
          formaPrawna: info["krs_podmioty.forma_prawna_str"],
          krs: info["krs_podmioty.krs"],
          nip: info["krs_podmioty.nip"],
          regon: info["krs_podmioty.regon"],
          organRep: info["krs_podmioty.nazwa_organu_reprezentacji"],
          sposobRep: info["krs_podmioty.sposob_reprezentacji"],
          kapital: info["krs_podmioty.wartosc_kapital_zakladowy"],
          numerWpisu: info["krs_podmioty.numer_wpisu"],
          dataWpisu: info["krs_podmioty.data_dokonania_wpisu"],
          dataRejestracji: info["krs_podmioty.data_rejestracji"],
          reprezentacja: layers.reprezentacja,
          wspolnicy: layers.wspolnicy,
        },
        relations: relationsMap,
      })
    } catch (error) {
      console.log(error);
    }      
  }

  
  render() {
    const { result, relations } = this.state
    
    return (
      <React.Fragment>
        <nav className="nav">
          <div className="nav__logo">
            Logo
          </div>
          <ul className="nav__list">
            <li className="nav__item"><Link to="/">Strona główna</Link></li>
            <li className="nav__item"><Link to="/">Komentarze</Link></li>
            <li className="nav__item"><Link to="/login">Logowanie</Link></li>
            <li className="nav__item"><Link to="/register">Rejestracja</Link></li>
          </ul>
        </nav>
        <header className="header">
          <div className="header__container">
            <h1 className="heading-primary heading-primary--main">Sprawdz swojego partnera biznesowego</h1>
            <input type="text" className="header__search" placeholder="Input NIP number" onChange={(e) => this.setState({ query: e.target.value })}/>
            <button className="header__button" onClick={this.handleSubmit}>
              <Link to="/result">Search</Link>
            </button> 
          </div>
        </header>
        <Switch>
          <Route exact path ="/" render={(routeProps) => <Main newSearch={this.handleNewSearch} routeProps={routeProps}/>} />
          <Route path ="/login" component={Login} />
          <Route path ="/register" component={Register} />
          <Route path ="/result" render={ (routeProps) => 
            <SearchResult 
              routeProps={routeProps} 
              result={result} 
              relations={relations}/>} 
            />
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
