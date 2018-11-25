import React, { Component } from 'react';
import {connect} from 'react-redux';

import {setSearchType} from 'redux-store/actions';
import {getPlacesType} from 'redux-store/selectors';

const places = ['pharmacy', 'gas_station', 'school', 'restaurant']

class PlacesList extends Component {
    constructor(props) {
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        let newVal = this.props.activePlace == e.target.dataset.place ? '' : e.target.dataset.place
        this.props.setSearchType(newVal)
    }
    
    render() {
        return (
            <div className="map-sidebar">
                <h3 className="map-sidebar__title">Places</h3>
                <ul className="places-list">
                    {
                        places.map((val, index) => {
                            return (
                                <li 
                                    key={val + index} 
                                    className={`places-list__item ${this.props.activePlace == val && 'places-list__item--active'}`}
                                    onClick={this.handleClick} 
                                    data-place={val}
                                >
                                    {val}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}

const mapDispatchToProps = {
    setSearchType
}

const mapStateToProps = (state) => {
    return {
        activePlace : getPlacesType(state)
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(PlacesList);