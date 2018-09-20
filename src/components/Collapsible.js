import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Collapsible extends Component {
  constructor(props) {
    super(props)

    this.state = {
      collapsed: true,
    }
  }

  handleCollapse = () => {    
    this.setState((prevState) => 
      {
        return { collapsed: !prevState.collapsed }
      })
  }

  render(){
    const { relations, person } = this.props;
    const { collapsed } = this.state;
    
    return (
      <React.Fragment>
        <div className="search-result__item">
          <p className="search-result__item--left">{person.funkcja}</p>
          <div className="search-result__item--right">
            <p>{person.nazwa}</p>
            { relations.length 
              ? <FontAwesomeIcon 
                  className="expander"
                  style={{ fontSize: 16 }}
                  onClick={this.handleCollapse}
                  icon={collapsed ? 'caret-down' : 'caret-up' } /> 
              : null
            }
          </div>
        </div>
        <div className={collapsed ? "relation relation--hidden" : "relation" }>
          {relations}
        </div>
      </React.Fragment>
    )
  }
}

export default Collapsible;