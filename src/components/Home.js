import React from "react";
import "../styles/Home.css"
import { Tabs, Button } from 'antd';
import { GEOLOCATION_OPTIONS, POSITION_KEY } from '../constants';

const { TabPane } = Tabs;

export class Home extends React.Component {
    state = {
      loadingGeolocation: false,
      errorMessage: null,
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
    }

    onGeolocationFailure = () => {
        this.setState({
            loadingGeolocation: false,
            errorMessage: 'Failed to load your position',
        })
    }

    componentDidMount() {
        this.getGeolocation();
    }


    render() {
        const operations = <Button>Create New Post</Button>;
        return (
            <Tabs tabBarExtraContent={operations} className="main-tabs">
                <TabPane tab="Image Posts" key="1">
                    Content of tab 1
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