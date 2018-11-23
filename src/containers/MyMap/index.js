import React, { Component } from 'react';

import { connect } from 'react-redux';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

import { setMyPlaces } from 'redux-store/actions';
import { getPlacesType, getMyPlaces} from 'redux-store/selectors';

import MarkerContainer from 'components/MarkerContainer';

class MyMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markers : [],
      savedMarkers : [],
      places : [],
      myPosition : {},
      markersVisible : false
    }

    this.handleClickOnTheMap = this.handleClickOnTheMap.bind(this);
    this.callback = this.callback.bind(this);
    this.saveMarkers = this.saveMarkers.bind(this);
    this.showMarkers = this.showMarkers.bind(this);
  }

  componentDidMount() {
    let myPosition = {
      position: this.props.pos,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#00CCBB',
        fillOpacity: 1,
        strokeColor: '#0099AA',
        strokeWeight: 2,
        scale: 10
      }
    }
    this.setState({myPosition : myPosition})
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.placeType != this.props.placeType) {
      this.getPlaces(nextProps.placeType)
    }
  }

  getPlaces(placesType) {
    let request = {
      location: this.props.pos,
      radius: '4000',
      type: [placesType]
    };
    let service = new google.maps.places.PlacesService(this.refMap.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
    service.nearbySearch(request, this.callback);
  }

  callback(results, status) {
    let markers = [];
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      results.forEach(place => {
        let marker = {
          position: place.geometry.location,
          icon: place.icon,
          title: place.name
        };
        markers = markers.concat(marker)
      })
    }
    this.setState({ places: markers })
  }

  handleClickOnTheMap(e) {
    let marker = {
      position: e.latLng
    };
    this.setState({ markers: this.state.markers.concat([marker]) })
  }

  saveMarkers() {
    if (this.state.markers.length) {
      this.props.setMyPlaces(this.state.markers)
      this.setState({ markers: [], markersVisible: false })
    }
  }

  showMarkers(){
    if (this.state.markersVisible) {
      this.setState({ markersVisible: false, savedMarkers : [] })
    } else {
      this.setState({ markersVisible: true, savedMarkers : this.props.myMarkers })
    }
  }

  renderMyCurrentLocation(){
    return (
      this.createMarker(this.state.myPosition)
    )
  }

  renderNearbyPlaces(){
    return this.state.places.map( (place, index) => {
      return (
        <div key={place.title + index}>
          {this.createMarker(place)}
        </div>
      )
    })
  }

  renderMyMarkers(){
    let listMarkers = this.state.savedMarkers.concat(this.state.markers)
    return listMarkers.map((marker, index) => {
      return (
        <div key={index}>
          {this.createMarker(marker)}
        </div>
      )
    })
  }
  
  createMarker(place){
    return (
      <MarkerContainer
        marker={place}
      />
    )
  }

  render() {
    return (
      <div>
        <GoogleMap
          ref={el => this.refMap = el}
          defaultZoom={14}
          defaultCenter={this.props.pos}
          onClick={this.handleClickOnTheMap}
        > 
          {this.renderMyCurrentLocation()}
          {this.renderNearbyPlaces()}
          {this.renderMyMarkers()}

        </GoogleMap>
        <button className="map-btn" onClick={this.saveMarkers}>Save markers</button>
        <button className="map-btn" onClick={this.showMarkers}>{this.state.markersVisible ? 'Hide markers' : 'Show markers'}</button>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setMyPlaces
}

const mapStateToProps = (state) => {
  return {
    placeType: getPlacesType(state),
    myMarkers: getMyPlaces(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withScriptjs(withGoogleMap(MyMap)));

