import React from 'react';
import Chart from "chart.js";
import { Link } from "react-router-dom";
import News from './News';
import { gql } from "apollo-boost";
import { graphql } from 'react-apollo';

const getArticlesQuery = gql`
query {
    global{
        year
        tonnes
    }
    discarded{
        year
        tonnes
    }
    incinerated{
        year
        tonnes
    }
    recycled{
        year
        tonnes
    }
    news{
        date
        heading
        text
        source
    }
}
`;

const createChart = (chart, chartRef, labels, data, description, color) => {
    let dataSets = [];

    for (let i = 0; i < data.length; i++) {
        dataSets = [...dataSets, {
            label: description[i],
            data: data[i],
            backgroundColor: color[i],
            borderWidth: 0.5
        }]
    }

    chart = new Chart(chartRef, {
        type: 'line',
        data: {
            labels: labels,
            datasets: dataSets
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

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.globalChartRef = React.createRef();
        this.recycleChartRef = React.createRef();

        this.state = {
            news: [],
            fetched: false
        }
    }

    getUserData(data) {
        let wasteAmount = [];
        let wasteDate = [];
        let recycleYears = [];
        let recycledPlastic = [];
        let incineratedPlastic = [];
        let discardedPlastic = [];
        this.setState({ news: data.news })

        data.global.forEach(element => {
            wasteAmount.push(element.tonnes);
            wasteDate.push(element.year);
        });

        data.discarded.forEach(element => {
            discardedPlastic.push(element.tonnes);
        });

        data.incinerated.forEach(element => {
            incineratedPlastic.push(element.tonnes);
        });

        data.recycled.forEach(element => {
            recycleYears.push(element.year);
            recycledPlastic.push(element.tonnes);
        });

        createChart(
            this.globalChart,
            this.globalChartRef.current,
            wasteDate, [wasteAmount],
            ['Global plastics production in tonnes'],
            ['#46bd66']);

        createChart(
            this.recycleChart,
            this.recycleChartRef.current,
            recycleYears,
            [recycledPlastic, incineratedPlastic, discardedPlastic],
            ['Recycled', 'Incinerated', 'Discarded'],
            ['#46bd66', '#fc5603', '#919191'])


    };

    render() {
        if (!this.props.data.loading && !this.state.fetched) {
            this.getUserData(this.props.data)
            this.setState({
                fetched: !this.state.fetched
            })
        }
        return (
            <div className="home-container">
                <section className="intro-section">
                    <div className="home-intro">
                        <h1>Track your waste with <span style={{ color: '#34a151' }}>WASTr</span></h1>
                        <h2>Recycling takes little effort on your part, for a big difference to our world.</h2>
                        <Link to='/waste'><button className="home-btn">Make a difference</button></Link>
                    </div>
                </section>
                <section className="steps-section">
                    <h2>Three easy steps</h2>
                    <ul className="steps-list">
                        <li>Track the ammount of waste</li>
                        <li>Get better at recycling</li>
                        <li>Set personal goals</li>
                    </ul>
                </section>
                <h2>News</h2>
                <section className="news-section" name="news">
                    <News news={this.state.news[0]} />
                    <News news={this.state.news[3]} />
                    <News news={this.state.news[2]} />
                </section>
                <section className='chart-container'>
                    <canvas ref={this.globalChartRef} className='home-canvas global'></canvas>
                </section>
                <h2>Technology</h2>
                <section className="news-section technology-section">
                    <News news={this.state.news[1]} />
                    <News news={this.state.news[4]} />
                    <News news={this.state.news[5]} />
                </section>
                <section className='chart-container'>
                    <canvas ref={this.recycleChartRef} className='home-canvas recycle'></canvas>
                </section>
            </div>)
    }
}

export default graphql(getArticlesQuery)(Home);
