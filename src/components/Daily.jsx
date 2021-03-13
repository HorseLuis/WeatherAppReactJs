import React, { Component } from 'react'

export default class Daily extends Component {
    render() {
        return (
            <div>
                <div className="location-box">
                    <div className="location">{this.props.name}, {this.props.country}</div>
                    <div className="date">{this.props.date}</div>
                </div>
                <div className="daily-weather">

                    {this.props.layout}
                </div>
            </div>
        )
    }
}
