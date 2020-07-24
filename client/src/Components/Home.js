import React from 'react';
import Chart from "chart.js";
import { Link } from "react-router-dom";
import News from './News';
const { createApolloFetch } = require('apollo-fetch');

let searchID = "6789";

const fetch = createApolloFetch({
    uri: 'https://localhost:8080/graphql'
})

const userData = (callback) => {
    fetch({
        query: `
    query ($id: String!) {
      users{
        id  
        name
        waste_history{
            type
            date
            amount
        }
      }  
      user(id: $id) {
        id  
        name
        waste_history{
            type
            date
            amount
        }
      }
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
    }`,
        variables: { id: searchID },
    }).then(res => {
        //console.log(res.data)
        callback(res.data)
    })
};

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.globalChartRef = React.createRef();
        this.recycleChartRef = React.createRef();
        this.state = {
            news: []
        }
    }

    componentDidMount() {
        userData((data) => {
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

            this.globalChart = new Chart(this.globalChartRef.current, {
                type: 'line',
                data: {
                    labels: wasteDate,
                    datasets: [{
                        label: 'Global plastics production in tonnes',
                        data: wasteAmount,
                        backgroundColor: '#46bd66',
                        borderWidth: 0.5
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



            this.recycleChart = new Chart(this.recycleChartRef.current, {
                type: 'line',
                data: {
                    labels: recycleYears,
                    datasets: [{
                        label: 'Recycled',
                        data: recycledPlastic,
                        backgroundColor: '#46bd66',
                        borderWidth: 0.5
                    },
                    {
                        label: 'Incinerated',
                        data: incineratedPlastic,
                        backgroundColor: '#fc5603',
                        borderWidth: 0.5
                    },
                    {
                        label: 'Discarded',
                        data: discardedPlastic,
                        backgroundColor: '#919191',
                        borderWidth: 0.5
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                callback: (value, index, values) => {
                                    return value + " %";
                                }
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
        });
    }

    render() {
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
export default Home;
