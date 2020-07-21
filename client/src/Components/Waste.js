import React from 'react';
import {useCookies} from 'react-cookie';
    

export default class Waste extends React.Component{
    constructor(props){
        super(props)
        this.updateInputField = this.updateInputField.bind(this)
        this.addWasteToStorage = this.addWasteToStorage.bind(this)
        this.state = {
            inputFields:{
                amount: '0'
            },
            userID: this.props.userCookie,
            wasteStorage: [],
            totalAmountWaste: this.sumWaste()
        }
        
    }

componentDidUpdate(){
    this.setState({
        wasteStorage : JSON.parse(window.localStorage.getItem(this.props.userCookie))
    })
}

sumWaste = () =>{
    let arr =[1,2]
    if(this.state.totalAmountWaste) {
        return this.state.totalAmountWaste.reduce((sum, val) => sum + val);
    }
     
}


updateInputField(e){
    this.setState({
        inputFields:{
            amount: e.target.value
        }
    })
}

addWasteToStorage(e){
    e.preventDefault();
    const {userID} = this.state;
    console.log(this.state.wasteStorage)
    const userWasteStorage = JSON.parse(window.localStorage.getItem(userID)) || [];
        
    let newWaste = this.state.inputFields.amount;
    window.localStorage.setItem(userID, JSON.stringify([...userWasteStorage, newWaste]));
    console.log(this.sumWaste());
}


    render(){

        
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

