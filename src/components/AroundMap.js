import React from "react";
import { AroundMarker } from "./AroundMarker";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";

class NormalAroundMap extends React.Component {

    render() {
        return (
            <GoogleMap
                defaultZoom={8}
                defaultCenter={{ lat: -34.397, lng: 150.644 }}
            >
                <AroundMarker position={{ lat: -34.397, lng: 150.644 }} />
                <AroundMarker position={{ lat: -34.297, lng: 150.644 }} />
                <AroundMarker position={{ lat: -34.397, lng: 150.544 }} />
            </GoogleMap>
        );
    }
}

export const AroundMap = withScriptjs(withGoogleMap(NormalAroundMap));