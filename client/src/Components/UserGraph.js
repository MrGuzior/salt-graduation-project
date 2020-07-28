import React from 'react';
import Chart from "chart.js";
import { gql } from "apollo-boost";
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { ListGroup } from 'react-bootstrap';

const removeWasteMutation = gql`
		mutation($date: String!, $userId: String!){
			removeWaste(date: $date,userId: $userId) {
				date
			}
		}
`;

const updateWasteMutation = gql`
		mutation($date: String!, $wasteType: String!, $wasteAmount: String!, $userId: String!){
			updateWaste(date: $date, type: $wasteType, amount: $wasteAmount, userId: $userId) {
				date
			}
		}
`;

class UserGraph extends React.Component {
    constructor(props) {
        super(props)
        this.userChart = React.createRef();
        this.state = {
            //updateWasteInput: new Array(this.props.wasteAmount.length),
            updateWasteInput: this.props.wasteAmount,
        }
        this.removeWaste = this.removeWaste.bind(this);
        this.updateWaste = this.updateWaste.bind(this);
        this.updateAmountUpdate = this.updateAmountUpdate.bind(this);
    }

    componentDidMount() {
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

    removeWaste(index) {
        window.location.reload();
        console.log(this.props.userID);
        let date = this.props.wasteDate[index];
        let userId = this.props.userID;

        this.props.removeWasteMutation({
            variables: {
                date: date,
                userId: this.props.userID.toString()
            }
        });
    }

    updateAmountUpdate(e, i) {
        //e.preventDefault();
        let newArr = this.props.wasteAmount;
        newArr[i] = e.target.value.toString();
        this.setState({ updateWasteInput: newArr })
    }

    updateWaste(index) {
        let date = this.props.wasteDate[index];
        let userID = this.props.userID;
        let newAmount = this.state.updateWasteInput[index];
        let type = 'plastic';
        this.props.updateWasteMutation({
            variables: {
                date: date,
                wasteAmount: newAmount,
                wasteType: 'plastic',
                userId: userID,
            }
        });
    }

    render() {
        let wasteList = [];

        for (let i = 0; i < this.props.wasteAmount.length; i++) {
            wasteList = [...wasteList, <ListGroup.Item as="li" key={i} className='list-item'>
                <form onSubmit={(e) => { this.updateWaste(i) }} className='list-item-form'>
                    <input type="number" placeholder={this.props.wasteAmount[i]} onChange={(e) => this.updateAmountUpdate(e, i)} value={this.state.updateWasteInput[i]}></input>
                    <span>{' kg ' + this.props.wasteDate[i]}</span>
                    <button onClick={(e) => { this.removeWaste(i) }} className='list-btn'>Remove</button>

                    <button type='submit' value={this.props.userID} className='list-btn'>Save</button>
                </form>
            </ListGroup.Item>]
        }

        return (
            <section className='chart-container-user'>
                <canvas ref={this.userChart} className='home-canvas global'></canvas>
                <ListGroup as="ul" className="waste-list">{wasteList}</ListGroup>


            </section>
        )
    }
}

export default compose(
    graphql(removeWasteMutation, { name: "removeWasteMutation" }),
    graphql(updateWasteMutation, { name: "updateWasteMutation" })
)(UserGraph)
