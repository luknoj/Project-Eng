import React, { Component } from 'react';
import axios from 'axios';

const URL = 'https://api-v3.mojepanstwo.pl/dane/krs_podmioty.json'

class Main extends Component {
constructor(props){
  super(props);

  this.state = {
    newestComapnies: null,
    newestComapniesCount: null
  }
}

  async componentDidMount(){
    try {
      const companies = await axios.get(URL + '?conditions[date]=[2018-08-01 TO 2018-08-30]')
  
      console.log(companies)
    
      this.setState({ 
        newestComapnies: companies.data.Dataobject,
        newestComapniesCount:companies.data.Count,
      })
    } catch (error) {
      console.log(error);
    }
  }

  renderNewestCompanies = () => {
    const { newestComapnies } = this.state;

    const companies = newestComapnies.map((company, index) => {
      return (
        <div className="col-3">
          <div className="newest-companies__item col-12">
            <p>{company.data['krs_podmioty.nazwa_skrocona']}</p>
          </div>
        </div>
      )
    })

    return companies
  } 

  render(){
    const { newestComapnies } = this.state;

    return(
      <div className="content container-fluid">
        <div className="row justify-content-center info-panel">
          <div className="col-10">
            <div className="row info-panel__container">
              <div className="col-6 info-panel__item info-panel__item--left">
              <h3 className="info-panel__item__header">Zawsze najnowsze dane z KRS i KRD</h3>
              <p>MyBPC daje mozliwosc sprawdzenia wszystkich informacji na temat twojego kontrahenta w bazie KRS prowadzonej przez Ministerstwo Sprawiedliwości. Znajdziesz tu rowniez informacje na temat zadluzen, ktore sa pobierane z baz KRD.</p>
              </div>
              <div className="col-6 info-panel__item info-panel__item--right">
                <h3 className="info-panel__item__header">Mozesz wyszukać podmiot po:</h3>
                <div className="row">
                  <div className="col-6">
                    <div className="col-10 info-panel__list-item">
                      numerze KRS
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="col-10 info-panel__list-item">
                      numerze REGON
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="col-10 info-panel__list-item">
                      numerze NIP
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="col-10 info-panel__list-item">
                      nazwie
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> 
        </div>
        <div className="row justify-content-center">
          <div className="col-10">
            <div className="newest-companies">
              <h3 className="newest-companies__header">Firmy zarejestrowane w zeszłym miesiacu:</h3>
              <div className="row">
                {newestComapnies ? this.renderNewestCompanies() : <div>Loading...</div> }
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default Main;