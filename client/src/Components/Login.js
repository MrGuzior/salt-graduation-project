import React from 'react';
import FacebookLogin from 'react-facebook-login';

const FB = window.FB;

export default class Login extends React.Component {
    state = {
        isLoggedIn: false,
        userID: '',
        name: '',
        picture: ''
    }
    // logOut = () => {
    //     FB.logout((res) => window.location.reload());
    // }
    // componentClicked = () => console.log('clicked');

    // responseFacebook = res => {
    //     console.log(res)
    //     this.setState({
    //         isLoggedIn: true,
    //         userID: res.userID,
    //         name: res.name,
    //         picture: res.picture.data.url
    //     })
    // }

    render() {
        // let fbContent;

        // if (this.state.isLoggedIn) {
        //     fbContent = (<div>
        //         <img src={this.state.picture} alt={this.state.name}></img>
        //         <h2>Hello {this.state.name}</h2>
        //     </div>)
        // } else {
        //     fbContent = (<FacebookLogin
        //         appId="1565543970286204"
        //         autoLoad={true}
        //         fields="name,picture"
        //         onClick={this.componentClicked}
        //         callback={this.responseFacebook} />)
        // }
        return (
            <div>
                {/* {fbContent} */}
                <div class="fb-login-button" data-size="large" data-button-type="continue_with" data-layout="default"
                    data-auto-logout-link="false" data-use-continue-as="true" data-width="">
                </div>
                {/* <button class="Log-Out" onclick={this.logOut()}>Log-Out</button> */}
            </div>
        )
    }
}
