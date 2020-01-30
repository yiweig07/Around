import React from "react";
import "../styles/Home.css"
import{ Gallery } from './Gallery';
import { Tabs, Button, Spin } from 'antd';
import { CreatePostButton } from './CreatePostButton';
import {API_ROOT, GEOLOCATION_OPTIONS, POSITION_KEY, TOKEN_KEY, AUTH_HEADER} from '../constants';

const { TabPane } = Tabs;

export class Home extends React.Component {
    state = {
      loadingGeolocation: false,
      errorMessage: null,
      loadingPost: false,
      posts: [],
    };


    getGeolocation() {
        this.setState({
            loadingGeolocation: true,
            errorMessage: null,
        });
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                this.onGeolocationSuccess,
                this.onGeolocationFailure,
                GEOLOCATION_OPTIONS,
            );
        } else {
            this.setState({
                loadingGeolocation: false,
                errorMessage: 'Your browser does not support geolocation',
            });
        }
    }

    onGeolocationSuccess = (position) => {
        this.setState({
            loadingGeolocation: false,
            errorMessage: null,
        });
        console.log(position);
        const { latitude, longitude } = position.coords;
        localStorage.setItem(POSITION_KEY, JSON.stringify({ latitude, longitude }));
        this.loadNearbyPost();
    }

    onGeolocationFailure = () => {
        this.setState({
            loadingGeolocation: false,
            errorMessage: 'Failed to load your position',
        })
    }

    loadNearbyPost() {
        this.setState({
            loadingPosts: true,
            error: null,
        })

        const position = JSON.parse(localStorage.getItem(POSITION_KEY));
        const range = 20000;
        const token = localStorage.getItem(TOKEN_KEY);

        fetch(`${API_ROOT}/search?lat=${position.latitude}&lon=${position.longitude}&range=${range}`,{
            method: 'GET',
            headers: {
                Authorization:`${AUTH_HEADER} ${token}`,
            }
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Failed to load posts');
        }).then((data) => {
            console.log(data);
            this.setState({
                loadingPosts: false,
                posts: data ? data : [],
            });
        }).catch((error) => {
            this.setState({
                loadingPosts: false,
                error: error.message,
            });
        });
    }

    getImagePosts() {
        if(this.state.errorMessage) {
            return (
                <div>
                    {this.state.errorMessage}
                </div>
            );
        } else if (this.state.loadingGeolocation) {
            return(
                <Spin tip="Loading geolocation..." />
            );
        } else if (this.state.loadingPost) {
            return (
                <Spin tip="Loading posts..."/>
            );
        } else if (this.state.posts.length > 0) {
            const images = this.state.posts.map((post) => {
                return {
                    src: post.url,
                    thumbnail: post.url,
                    thumbnailHeight: 300,
                    thumbnailWidth: 400,
                    caption: post.message,
                    user: post.user,
                }
            });
            return (<Gallery images={images}/>);
        } else {
            return 'No nearby posts.';
        }
    }

    componentDidMount() {
        this.getGeolocation();
    }


    render() {
        const operations = <CreatePostButton />;
        return (
            <Tabs tabBarExtraContent={operations} className="main-tabs">
                <TabPane tab="Image Posts" key="1">
                    {this.getImagePosts()}
                </TabPane>
                <TabPane tab="Tab 2" key="2">
                    Content of tab 2
                </TabPane>
                <TabPane tab="Tab 3" key="3">
                    Content of tab 3
                </TabPane>
            </Tabs>
        );
    }
}