import React from "react";
import PropTypes from 'prop-types';
import GridGallery from 'react-grid-gallery';
import "../styles/Gallery.css";

export class Gallery extends React.Component {
    static propTypes = {
        images: PropTypes.arrayOf(
            PropTypes.shape({
                user: PropTypes.string.isRequired,
                src: PropTypes.string.isRequired,
                thumbnail: PropTypes.string.isRequired,
                caption: PropTypes.string.isRequired,
                thumbnailHeight:PropTypes.number.isRequired,
                thumbnailWidth:PropTypes.number.isRequired,
            })
        ).isRequired
    }

    render() {
        const images = this.props.images.map((image) => {
            return {
                ...image,
                customOverlay: (
                    <div className="overlay">{`${image.user}: ${image.caption}`}</div>
                ),
            };
        });

        return (
            <div className="wrapper">
                <GridGallery
                    images={images}
                    enableImageSelection={false}
                    backdropClosesModal
                />
            </div>
    );
    }
}