import React, { Component } from 'react';
import { Marker} from "react-google-maps";

class MarkerContainer extends Component {

    render() {
        return (
            <Marker
                position={this.props.marker.position}
                icon={this.props.marker.icon}
                title={this.props.marker.title}
            />
        );
    }
}

export default MarkerContainer;