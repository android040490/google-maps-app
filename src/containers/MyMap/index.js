import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";

import { setMyPlaces } from 'redux-store/actions';
import { getPlacesType, getMyPlaces } from 'redux-store/selectors';

class MyMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            markers: [],
            places: [],
            myPosition: {},
            myMarkersVisible: false
        }

        this.handleClickOnTheMap = this.handleClickOnTheMap.bind(this);
        this.callback = this.callback.bind(this);
        this.saveMarkers = this.saveMarkers.bind(this);
        this.showMarkers = this.showMarkers.bind(this);
    }

    componentDidMount() {
        this.getPlaces(this.props.nearPlacesType)
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
        this.setState({ myPosition: myPosition })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.nearPlacesType != this.props.nearPlacesType) {
            this.getPlaces(nextProps.nearPlacesType)
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
                    position: {
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng()
                    },
                    icon: {
                        url: place.icon,
                        size: new google.maps.Size(30, 30),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(25, 25)
                    },
                    title: place.name,
                    animation: google.maps.Animation.DROP
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
            this.setState({ markers: [], myMarkersVisible: false })
        }
    }

    showMarkers() {
        this.setState({ myMarkersVisible: !this.state.myMarkersVisible })
    }

    renderMarkers(markers) {
        return markers.map((marker, index) => {
            return (
                <div key={index + marker.position.lat}>
                    <Marker {...marker}/>
                </div>
            )
        })
    }

    render() {
        let nearbyPlaces = this.props.nearPlacesType != '' ? this.state.places : [];
        let savedMarkers = this.state.myMarkersVisible ? this.props.myMarkers : [];

        return (
            <div>
                <GoogleMap
                    ref={el => this.refMap = el}
                    defaultZoom={14}
                    defaultCenter={this.props.pos}
                    onClick={this.handleClickOnTheMap}
                >
                    <Marker {...this.state.myPosition}/>
                    {
                        this.renderMarkers([...nearbyPlaces, ...savedMarkers, ...this.state.markers])
                    }
                </GoogleMap>
                <button className="map-btn" onClick={this.saveMarkers}>Save markers</button>
                <button className="map-btn" onClick={this.showMarkers}>{this.state.myMarkersVisible ? 'Hide markers' : 'Show markers'}</button>
            </div>
        );
    }
}

const mapDispatchToProps = {
    setMyPlaces
}

const mapStateToProps = (state) => {
    return {
        nearPlacesType: getPlacesType(state),
        myMarkers: getMyPlaces(state)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withScriptjs(withGoogleMap(MyMap)));

