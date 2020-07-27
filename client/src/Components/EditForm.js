import React from 'react';

class EditForm extends React.Component{
    constructor(props){
        super(props);
        this.updateInputField = this.updateInputField.bind(this);
        this.state = {
            updateAmount: '0'
        }
    }

    updateInputField(e) {
        this.setState({
            updateAmount: e.target.value
        })
    }

    render(){
        return(
        <form>
            <label htmlFor="amount"><b>Amount</b></label>
            <input type="number"  onChange={this.updateInputField} placeholder={this.props.amount} name="amount" value={this.state.updateAmount}></input>
            <button type="submit" className="btn" onSubmit={()=>console.log('change')}>Change</button>
        </form>
        
        )
    }
    
    
}

export default EditForm;
