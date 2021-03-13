import React, { Component } from 'react'

export default class Live extends Component {
    render() {
        return (
            <div className="live-weather">
                <div className="location-box">
                    <div className="location">{this.props.name}, {this.props.country}</div>
                    <div className="date">{this.props.date}</div>
                </div>
                <div className="weather-box">
                    <div className="picture">
                        <img alt="Weather Icon" src={`http://openweathermap.org/img/wn/${this.props.icon}@4x.png`} />
                    </div>
                    <div className="weather">
                        {this.props.description}
                    </div>
                    <div className="temp">
                        {this.props.temp}°C
            </div>
                </div>
            </div>
        )
    }
}
