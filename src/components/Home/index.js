import React, { Component } from 'react';
import './index.css';
import axios from 'axios';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        axios.all([
            axios.get('http://localhost:3001/api/music/account'),
            axios.get('http://localhost:3001/api/music/commands'),
            axios.get('http://localhost:3001/api/setting'),
        ]).then(axios.spread((account, commands, setting) => {
            this.setState({ ...account.data, ...commands.data, ...setting.data });
        }));
    }

    handleDisconnect() {
        axios.post('http://localhost:3001/api/music/disconnect').then(() => {
            this.props.router.push('/');
        }).catch(console.error);
    }

    handleSetting() {
        this.props.router.push('/setting');
    }

    render() {
        return (
            <div>
                <div className="home-header">
                    <div className="avatar" style={ (this.state.avatarURL) ? {backgroundImage: `url("${this.state.avatarURL}")`} : {}}>
                        <div className="online-status"></div>
                    </div>
                    <div className="account-name">
                        <span className="username">{(this.state.username) ? this.state.username : ''}</span>
                        <span className="discriminator">#{ (this.state.discriminator) ? this.state.discriminator : ''}</span>
                    </div>
                    <div className="header-buttons">
                        <button className="fas fa-cog fa-sm header-button" onClick={this.handleSetting.bind(this)}></button>
                        <button className="fas fa-phone-slash fa-sm header-button" onClick={this.handleDisconnect.bind(this)}></button>
                    </div>
                </div>
                <div className="commands">
                    {this.state.commands && this.state.commands.map((command, i) => {
                        return (<div className="command" key={i}><div className="command-title">{this.state.prefix}{command.name} </div>{command.description}</div>);
                    })}
                </div>
            </div>
        );
    }
}

export default App;
