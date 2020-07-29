import React from 'react';
// import { CookiesProvider } from 'react-cookie';
import { Form, Button } from 'react-bootstrap';

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.inputChange = this.inputChange.bind(this);
        this.state = {
            name: ''
        }
    }

    inputChange(e) {
        this.setState({
            name: e.target.value
        })
    }

    render() {
        return (
            <div className="login-form">
                <h1>Register new user</h1>
                <Form onSubmit={e => this.props.login(e, this.state.name)}>
                    <Form.Group className='m-3'>
                        <Form.Control placeholder="Enter username" onChange={(e) => this.inputChange(e)} value={this.state.name} />
                    </Form.Group>
                    <Form.Group className='m-3'>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}

export default Login;
