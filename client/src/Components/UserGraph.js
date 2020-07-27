import React from 'react';
import Chart from "chart.js";
import EditForm from './EditForm.js';

class UserGraph extends React.Component {
    constructor(props) {
        super(props)
        this.userChart = React.createRef();
        this.state = {
        }
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
        let wasteList = [];

        for(let i = 0; i < this.props.wasteAmount.length; i++){
        wasteList = [...wasteList, <li key={i}>
            <form onSubmit={(e)=>{e.preventDefault(); console.log('submited')}}>
            <input type="number" placeholder={this.props.wasteAmount[i]}></input> kg 
            {this.props.wasteDate[i]}
            <button onClick={(e)=>{e.preventDefault(); console.log('removed')}}>Remove</button>
            <button type='submit' value={this.props.userID}>Save</button>
            </form>
            </li>]
        }

        return (
            <section className='chart-container-user'>
                <canvas ref={this.userChart} className='home-canvas global'></canvas>
                    <ul>{wasteList}</ul> 
                        
            </section>
        )
    }
}

export default UserGraph;
