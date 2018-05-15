import React, { Component } from 'react';
import './index.css';
import axios from 'axios';
class App extends Component {

    constructor(props) {
        super(props);
        this.state = { token: '', error: null };
    }

    componentDidMount() {
        let token = localStorage.getItem('token');
        if (token) this.setState({ token: token });

        // client exists
        axios.get('http://localhost:3001/api/music/account').then(() => {
            this.props.router.push('/home');
        }).catch(console.error);
    }

    tokenChange(event) {
        this.setState({ token: event.target.value });
    }

    handleHow() {
        axios.get('http://localhost:3001/api/shell/how-to-get-disord-token').then(() => {
            console.log('clicked');
        }).catch(console.error);
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.token === '') {
            return this.setState({ error: ' - field is empty' });
        }
        axios.post(`http://localhost:3001/api/music/${this.state.token}/connect`).then(() => {
            this.setState({ error: null });
            localStorage.setItem('token', this.state.token);
            this.props.router.push('/home');
        }).catch((error) => {
            this.setState({ error: ` - ${error.response.statusText}` });
            console.log(error.response.statusText);
        });
    }

    render() {
        return (
            <div className="App">
                <form onSubmit={this.handleSubmit.bind(this)} className="login-dark">
                    <div className="login-title">Welcome back!</div>
                    <div className="login-subTitle">We&#39;re so excited to see you again!</div>
                    <div className="login-wrapper">
                        <h5 className="login-tokenTitle" style={(this.state.error) ? {color: 'red'} : {}}>Token {this.state.error}</h5>
                        <input className="input" type="password" spellCheck="false" value={this.state.token} onChange={this.tokenChange.bind(this)}></input>
                        <a className="how" onClick={this.handleHow.bind(this)}>
                            How do I get a token?
                        </a>
                        <button className="login-submit" type="submit">
                            <div>
                            Login
                            </div>
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default App;
