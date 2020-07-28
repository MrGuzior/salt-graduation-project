import React from 'react';
import { Form } from 'react-bootstrap';
import UserGraph from './UserGraph';
import { gql } from "apollo-boost";
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
const moment = require('moment');

let searchID = "12345";
let cookie;


const getUserQuery = gql`
    query($id: String!){
        user(id: $id){
            id  
            name
            waste_history{
                type
                date
                amount
            }
        }
}`;

const addWasteMutation = gql`
		mutation($date: String!, $wasteType: String!, $wasteAmount: String!, $userId: String!){
			addWaste(date: $date, type: $wasteType, amount: $wasteAmount, userId: $userId) {
				date
			}
		}
`;

class Waste extends React.Component {
    constructor(props) {
        super(props)
        this.updateInputField = this.updateInputField.bind(this)
        this.addWasteToStorage = this.addWasteToStorage.bind(this)
        this.updateOutput = this.updateOutput.bind(this)
        this.updateSelectType = this.updateSelectType.bind(this);
        this.state = {
            inputFields: {
                amount: '0',
                type: 'plastic'
            },
            inputAmount: '0',
            inputType: 'plastic',
            userID: this.props.userCookie,
            totalAmountWaste: 0,
            wasteStorage: null,
            wasteDate: [],
            wasteAmount: [],
            fetched: false,
        }

    }

    sumWaste = () => {
        if (this.state.wasteStorage !== null) {
            const intWasteStorage = this.state.wasteStorage.map(waste => parseInt(waste.amount));
            return intWasteStorage.reduce((sum, val) => sum + Number(val));
        }
        return this.state.wasteStorage;
    }

    updateInputField(e) {
        this.setState({
            inputAmount: e.target.value
        })
    }

    updateSelectType(e) {
        this.setState({
            inputType: e.target.value
        })
    }

    addWasteToStorage(e) {
        //e.preventDefault();
        const { userID } = this.state;
        const userWasteStorage = JSON.parse(window.localStorage.getItem(userID)) || [];

        const timeStamp = moment(Date.now()).format('MM DD YYYY');
        const type = this.state.inputType;
        const amount = this.state.inputAmount;

        const newWaste = {
            timeStamp,
            type,
            amount
        }

        this.props.addWasteMutation({
            variables: {
                date: timeStamp.toString(),
                wasteType: type,
                wasteAmount: amount,
                userId: this.state.userID
            },
            //refetchQueries: [{ query: getUserQuery }]
        });

        if (amount !== '0' && amount !== '') {
            window.localStorage.setItem(userID, JSON.stringify([...userWasteStorage, newWaste]));
        }
        this.updateOutput();
    }

    async updateOutput() {
        const { userID } = this.state;
        const userWasteStorage = await JSON.parse(window.localStorage.getItem(userID)) || [];
        this.setState({ wasteStorage: userWasteStorage })
        this.setState({ totalAmountWaste: this.sumWaste() })
    }

    getUserData = data => {
        const amount = data.waste_history.map(obj => obj.amount)
        const date = data.waste_history.map(obj => obj.date)

        this.setState({
            wasteAmount: amount,
            wasteDate: date,
            fetched: !this.state.fetched
        })
    };

    render() {
        cookie = this.props.userCookie;

        if (this.props.data.user && !this.state.fetched) {
            this.getUserData(this.props.data.user)
        }
        return (
            <div>
                <section>
                    <div>
                        <h1>Today I threw out {this.state.inputAmount} kg trash:</h1>
                        <Form onSubmit={this.addWasteToStorage}>
                            <div className="waste-form">
                                <Form.Group>
                                    <Form.Label>
                                        kg:
                                <Form.Control placeholder="Enter amount of waste" type="number" name="wasteKg" onChange={this.updateInputField}></Form.Control>
                                    </Form.Label>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>
                                        type:
                                <Form.Control as="select" onChange={this.updateSelectType} value={this.state.inputType}>
                                            <option value="plastic">Plastic</option>
                                            <option value="paper">Paper</option>
                                            <option value="glass">Glass</option>
                                            <option value="metal">Metal</option>
                                            <option value="organic">Organic</option>
                                            <option value="other">Other</option>
                                        </Form.Control>
                                    </Form.Label>
                                </Form.Group>
                            </div>
                            <input type="submit" value="Submit" className="home-btn"></input>
                        </Form>
                        <h2>Total amount of waste {this.state.totalAmountWaste}</h2>
                    </div>
                </section>
                {this.state.wasteAmount[0] && this.state.wasteDate[0] ? <UserGraph wasteAmount={this.state.wasteAmount} wasteDate={this.state.wasteDate} userID={this.state.userID} /> : null}

            </div>
        )
    }

}
export default compose(
    graphql(getUserQuery, {
        options: (props) => {
            return {
                variables: {
                    id: props.userCookie
                }
            }
        }
    }, { name: "getUserQuery" }),
    graphql(addWasteMutation, { name: "addWasteMutation" })
)(Waste);

// export default graphql(addWasteMutation, {name: "addWasteMutation"})(Waste);