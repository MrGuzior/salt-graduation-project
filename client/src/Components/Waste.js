import React from 'react';
import { useCookies } from 'react-cookie';


export default class Waste extends React.Component {
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
        e.preventDefault();
        const { userID } = this.state;
        const userWasteStorage = JSON.parse(window.localStorage.getItem(userID)) || [];

        const timeStamp = Date.now();
        const type = this.state.inputType;
        const amount = this.state.inputAmount;

        const newWaste = {
            timeStamp,
            type,
            amount
        }

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

    componentDidUpdate() {
        console.log(this.state)
    }

    render() {
        return (
            <section>
                <div>
                    <h1>Today I threw out {this.state.inputAmount} kg trash:</h1>
                    <form onSubmit={this.addWasteToStorage}>
                        <div className="waste-form">
                            <label>
                                Kg:
                                <input type="number" name="wasteKg" onChange={this.updateInputField}></input>
                            </label>
                            <label>
                                type:
                                <select onChange={this.updateSelectType} value={this.state.inputType}>
                                    <option value="plastic">Plastic</option>
                                    <option value="paper">Paper</option>
                                    <option value="glass">Glass</option>
                                    <option value="metal">Metal</option>
                                    <option value="organic">Organic</option>
                                    <option value="other">Other</option>
                                </select>
                            </label>
                        </div>
                        <input type="submit" value="Submit" className="home-btn"></input>
                    </form>
                    <h2>Total amount of waste {this.state.totalAmountWaste}</h2>
                </div>
            </section>
        )
    }

}
