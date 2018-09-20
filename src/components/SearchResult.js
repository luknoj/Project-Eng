import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import currency from 'format-currency';
import React, { Component } from 'react';
import API from '../vendors/api-handlers';
import Collapsible from './Collapsible';

class SearchResult extends Component {
  constructor(props){
    super(props);

    this.props = {
      searchResult: {},
    }
  }

  componentDidMount(){
    API.checkCompany()
    .then( response => {
      this.setState({ searchResult: response });
    })
  }
  
  renderRleationIcon = (type) => {
    switch (type) {
      case 'NADZORCA':
        return <FontAwesomeIcon style={{ fontSize: 16 }} icon="handshake" />
        break;
      case 'WSPÓLNIK':
        return <FontAwesomeIcon style={{ fontSize: 16 }} icon="user-tie" />
      default:
        break;
    }
  }

  renderRelations = (person) => {
    const { relations } = this.props
    const relationsRender = relations.map((relation, index) => {
      if (person == relation.osoba){
        return (
          <div 
            key={`${relation.firma}${index}`}
            className="relation__element">
            <p className="relation__element--left">
              {this.renderRleationIcon(relation.stanowisko)}
              </p>
            <p className="relation__element--right">{relation.firma}</p> 
          </div>
        )
      } else {
        return null
      }
    }).filter(item => item)
    
    return relationsRender;
  }

  renderManagement = () => {
    const { result, relations } = this.props

    if(result){
      const management = result.reprezentacja.map( (el, index) => {
        return <Collapsible 
            key={`${el.osoba_id}${index}`}
            person={el}
            relations={this.renderRelations(el.nazwa)}
          />
      })
      
        return management;
      }
    }

  renderPartners = () => {
    if(this.props.result){
      var partners = this.props.result.wspolnicy.map( el => {
        return (
          <React.Fragment key={el.osoba_id}>
            <p className="heading-tertiary">Wspólnik</p>
            <div className="col-12 search-result__box">
              <div className="search-result__item">
                <p className="search-result__item--left">Nazwa</p>
                <p className="search-result__item--right">{el.nazwa}</p> 
              </div>
              <div className="search-result__item">
                <p className="search-result__item--left">Udziały</p>
                <p className="search-result__item--right">{el.funkcja}</p> 
              </div>  
            </div>
          </React.Fragment>
        )
      })
    }

    return partners;
  }

  render(){
    return (
      <main className="container-fluid">
        <div className="row justify-content-center">
          <section className="search-result col-10 mt-4 mb-4">
          {
            this.props.result ?
            <React.Fragment>
              <div className="search-result__heading text-left col-6">
                <p className="heading-tertiary">
                  {this.props.result.nazwa}
                </p>
              </div>
              
              <div className="row mb-5">
                <div className="col-5">
                  <div className="row">
                    <p className="heading-tertiary">Podstawowe dane</p>
                    <div className="col-12 search-result__box">
                      <div className="search-result__item">
                        <p className="search-result__item--left">Adres</p>
                        <p className="search-result__item--right">{this.props.result.adres}</p> 
                      </div>  
                      <div className="search-result__item">
                        <p className="search-result__item--left">KRS</p>
                        <p className="search-result__item--right">{this.props.result.krs}</p> 
                      </div>
                      <div className="search-result__item">
                        <p className="search-result__item--left">NIP</p>
                        <p className="search-result__item--right">{this.props.result.nip}</p> 
                      </div>
                      <div className="search-result__item">
                        <p className="search-result__item--left">REGON</p>
                        <p className="search-result__item--right">{this.props.result.regon}</p> 
                      </div> 
                    </div>
                    <p className="heading-tertiary">Zarząd</p>
                    <div className="col-12 search-result__box">
                      {this.renderManagement()}
                    </div>
                  </div>
                </div>
                <div className="search-result__map col-7">
                  <iframe
                    title="Company location"
                    className="search-result__map--style"
                    src={'https://www.google.com/maps/embed/v1/place?key=AIzaSyDIfhe4iMAtwJ5Yib33sxRPN0lYucLLXoc&q=' + this.props.result.adres } allowFullScreen>
                  </iframe>
                </div>  
              </div>
              <div className="row">
                <p className="heading-tertiary">Informacje o podmiocie</p>
                <div className="search-result__box col-12">
                  <div className="search-result__item">
                    <p className="search-result__item--left">Forma prawna</p>
                    <p className="search-result__item--right">{this.props.result.formaPrawna}</p> 
                  </div>  
                  <div className="search-result__item">
                    <p className="search-result__item--left">Sposob reprezentacji</p>
                    <p className="search-result__item--right">{this.props.result.sposobRep}</p> 
                  </div>
                  <div className="search-result__item">
                    <p className="search-result__item--left">Organ reprezentacyjny</p>
                    <p className="search-result__item--right">{this.props.result.organRep}</p> 
                  </div>
                  <div className="search-result__item">
                    <p className="search-result__item--left">Wysokość kapitału zakładowego</p>
                    <p className="search-result__item--right">{currency(this.props.result.kapital)} ZŁ</p> 
                  </div>  
                  {/* POPRAWIC ZMIENNA */}
                  <div className="search-result__item">
                    <p className="search-result__item--left">Data rejestracji</p>
                    <p className="search-result__item--right">{this.props.result.dataRejestracji}</p> 
                  </div>
                  <div className="search-result__item">
                    <p className="search-result__item--left">Numer ostatniego wpisu</p>
                    <p className="search-result__item--right">{this.props.result.numerWpisu}</p> 
                  </div>
                  <div className="search-result__item">
                    <p className="search-result__item--left">Data ostatniego wpisu</p>
                    <p className="search-result__item--right">{this.props.result.dataWpisu}</p> 
                  </div>
                </div>
              </div>
              <div className="row">
                {this.renderPartners()}
              </div>
            </React.Fragment>
            :
            <div>
              Loading...
            </div>
          }
            
          </section>
        </div>
      </main>
    )
  }
}

export default SearchResult;