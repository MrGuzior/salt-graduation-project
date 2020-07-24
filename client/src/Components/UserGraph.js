import React from 'react';
import Chart from "chart.js";

class UserGraph extends React.Component {
    constructor(props) {
        super(props)
        this.userChart = React.createRef();
    }
    componentDidMount() {
        console.log(this.props)
        this.userChart = new Chart(this.userChart.current, {
            type: 'line',
            data: {
                labels: this.props.wasteDate,
                datasets: [{
                    label: 'You weekly waste',
                    data: this.props.wasteAmount,
                    fill: false,
                    borderWidth: 4,
                    lineTension: 0,
                    borderColor: '#34a151'
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                animation: {
                    duration: 0
                },
                elements: {
                    point: {
                        radius: 0
                    }
                },
                tooltips: {
                    intersect: false,
                    mode: 'label'
                }
            }
        });
    }
    render() {
        return (
            <section className='chart-container-user'>
                <canvas ref={this.userChart} className='home-canvas global'></canvas>
            </section>
        )
    }
}

export default UserGraph;
