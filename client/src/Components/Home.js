import React from 'react';
import Chart from "chart.js";
import { Link } from "react-router-dom";
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
        this.chartRef = React.createRef();
    }

    componentDidMount() {
        const data = userData((userdata) => {
            let wasteAmount = [];
            let wasteDate = [];
            userdata.users[0].waste_history.forEach(element => {
                wasteAmount.push(element.amount);
                wasteDate.push(element.date);
            });

            this.myChart = new Chart(this.chartRef.current, {
                type: 'bar',
                data: {
                    labels: wasteDate,
                    datasets: [{
                        label: 'Amount of plastic waste',
                        data: wasteAmount,
                        backgroundColor: '#46bd66'
                    }]
                },
                options: {
                    //Customize chart options
                }
            });
        });
    }

    render() {
        return (
            <div className="home-container">
                <section>
                    <div className="home-intro">
                        <h1>Welcome back Konrad!</h1>
                        <h2>Start tracking your trash</h2>
                        <button className="home-btn"><Link to='/waste'>Track your trash</Link></button>
                    </div>
                </section>
                <section>
                    <canvas ref={this.chartRef} className='home-canvas'></canvas>
                </section>
            </div>)
    }
}
export default Home;
