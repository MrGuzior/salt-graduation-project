import React from 'react';
import { useCookies } from 'react-cookie';


export default class Waste extends React.Component {
    constructor(props) {
        super(props)
        this.updateInputField = this.updateInputField.bind(this)
        this.addWasteToStorage = this.addWasteToStorage.bind(this)
        this.state = {
            inputFields: {
                amount: '0'
            },
            userID: this.props.userCookie,
            totalAmountWaste: 0,
            wasteStorage: [],
        }

    }


    sumWaste = () => {
        if (this.state.wasteStorage[0]) {
            const intWasteStorage = this.state.wasteStorage.map(waste => parseInt(waste));
            return intWasteStorage.reduce((sum, val) => sum + Number(val));
        }
        return this.state.wasteStorage;
    }


    updateInputField(e) {
        this.setState({
            inputFields: {
                amount: e.target.value
            }
        })
    }

    addWasteToStorage(e) {
        e.preventDefault();
        const { userID } = this.state;
        const userWasteStorage = JSON.parse(window.localStorage.getItem(userID)) || [];

        let newWaste = this.state.inputFields.amount;
        if (newWaste !== '0') {
            window.localStorage.setItem(userID, JSON.stringify([...userWasteStorage, newWaste]));
        }
        this.setState({ wasteStorage: userWasteStorage })
        this.setState({ totalAmountWaste: this.sumWaste() })
    }


    render() {
        return (
            <div>
                <p>Today I threw out {this.state.inputFields.amount} kg trash:</p>
                <form onSubmit={this.addWasteToStorage}>
                    <label>
                        kg:
                        <input type="number" name="wasteKg" onChange={this.updateInputField}></input>
                    </label>
                    <input type="submit" value="Submit"></input>
                </form>
                <p>Total amount of waste {this.state.totalAmountWaste}</p>
            </div>
        )
    }

}
