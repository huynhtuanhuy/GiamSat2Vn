/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { Component } from 'react';
import ReactEcharts from "echarts-for-react";
import moment from 'moment';
import { getDataDaily } from '../../../services/getDataDaily';

class ChartYesterday extends Component {
    private intervalInitial = 0;

    state = {
        temperature: [],
        humidity: [],
        time: [],
    }

    componentDidMount() {
        getDataDaily().then((data: any) => {
            let arr_temperature = data.data.map((item: any) => (
                item.temperature
            ));
            let arr_humidity = data.data.map((item: any) => (
                item.humidity
            ));
            let arr_time = data.data.map((item: any) => (
                moment(item.time * 1000).format('HH:mm DD/MM/YYYY')
            ));
            this.setState({ temperature: arr_temperature, humidity: arr_humidity, time: arr_time })
        }).catch((err: any) => {
            console.log(err);
        });
        this.intervalInitial = window.setInterval(() => {
            getDataDaily().then((data: any) => {
                let arr_temperature = data.data.map((item: any) => (
                    item.temperature
                ));
                let arr_humidity = data.data.map((item: any) => (
                    item.humidity
                ));
                let arr_time = data.data.map((item: any) => (
                    moment(item.time * 1000).format('HH:mm DD/MM/YYYY')
                ));
                this.setState({ temperature: arr_temperature, humidity: arr_humidity, time: arr_time })
            }).catch((err: any) => {
                console.log(err);
            });
        }
            , 10000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalInitial);
    }
    render() {
        console.log(this.state);

        const option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['Nhiệt độ', 'Độ ẩm'],
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: this.state.time
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'Nhiệt độ',
                    type: 'line',
                    // stack: '总量',
                    data: this.state.temperature
                },
                {
                    name: 'Độ ẩm',
                    type: 'line',
                    // stack: '总量',
                    data: this.state.humidity
                },
            ]
        }
        return (
            <div className="box box-default mb-4">
                <div className="box-header">Thông tin nhiệt độ độ ẩm</div>
                <div className="box-body">
                    <ReactEcharts
                        option={option}
                        style={{ height: '400px', width: '100%' }}
                    />
                </div>
            </div>
        );
    }
}

export default ChartYesterday;