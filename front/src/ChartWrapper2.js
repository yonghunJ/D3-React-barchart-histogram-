import React, { Component } from 'react';
import D3Chart2 from './D3Chart2';

export default class ChartWrapper extends Component {
	componentDidMount() {
		this.setState({
			chart: new D3Chart2(this.refs.chart)
		})
	}

	shouldComponentUpdate() {
		return false
	}

	componentWillReceiveProps(nextProps) {
		this.state.chart.updateHistogram(nextProps.gender,nextProps.value)
		
	}

	render() {
		return <div className="chart-area" ref="chart"></div>
	}
}