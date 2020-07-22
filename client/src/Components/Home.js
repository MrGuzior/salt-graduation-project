import React from 'react';
import Chart from "chart.js";
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
                        label: 'My data',
                        data: wasteAmount,
                        backgroundColor: '#112233'
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
                <p>This is home</p>
                <canvas ref={this.chartRef} className='home-canvas'></canvas>
            </div>)
    }
}
export default Home;
