import React, { Component } from 'react';
import moment from 'moment';
import { getDataRealTime } from '../../../services/getDataRealTime';

class SensorInfor extends Component {
    private intervalInitial = 0;

    state = {
        temperature: 0,
        humidity: 0,
        time: 0,
        getDataRealTime: false,
    }

    componentDidMount() {
        getDataRealTime().then((data: any) => {
            this.setState({
                temperature: data.data[0].temperature,
                humidity: data.data[0].humidity,
                time: data.data[0].time
            })
        }).catch((err: any) => {
            console.log(err);
        });
        this.intervalInitial = window.setInterval(() => {
            getDataRealTime().then((data: any) => {
                this.setState({
                    temperature: data.data[0].temperature,
                    humidity: data.data[0].humidity,
                    time: data.data[0].time
                })
            }).catch((err: any) => {
                console.log(err);
            });
        }
            , 60000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalInitial);
    }

    render() {
        return (
            <div className="box box-default mb-4">
                <div className="box-header">
                    <span>Tổng quan</span>
                    <span style={{ float: 'right' }}>{moment(this.state.time * 1000).format('HH:mm DD/MM/YYYY')}</span>
                </div>
                <div className="box-body">
                    <div style={{ paddingLeft: 30, fontSize: 'initial' }}>
                        <div style={{ display: "list-item", }}>Nhiệt độ: {this.state.temperature}</div>
                        <div style={{ display: "list-item" }}>Độ ẩm: {this.state.humidity}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SensorInfor;