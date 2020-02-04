import React from "react";
import { AroundMarker } from "./AroundMarker";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import { POSITION_KEY } from "../constants";

class NormalAroundMap extends React.Component {

    render() {
        const position = JSON.parse(localStorage.getItem(POSITION_KEY));
        return (
            <GoogleMap
                defaultZoom={11}
                defaultCenter={{ lat: position.latitude, lng: position.longitude }}
            >
                {
                    this.props.posts.map((post) => (
                        <AroundMarker
                            post={post}
                            key={post.url}
                        />
                    ))
                }
            </GoogleMap>
        );
    }
}

export const AroundMap = withScriptjs(withGoogleMap(NormalAroundMap));