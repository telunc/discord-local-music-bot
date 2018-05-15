import React, { Component } from 'react';
import './index.css';
import axios from 'axios';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        axios.get('http://localhost:3001/api/setting').then((res) => {
            this.setState({...res.data});
        }).catch(console.error);
    }

    handleExit() {
        this.props.router.push('/home');
    }

    prefixChange(event) {
        let prefix = event.target.value;
        axios.post('http://localhost:3001/api/setting/', {prefix: prefix}).then(() => {
            this.setState({prefix: prefix});
        }).catch(console.error);
    }

    colorChange(event) {
        let color = event.target.value;
        let new_color = '';
        if (color.length === 3) {
            for (let i = 0; i < color.length; i++) {
                new_color += (color.charAt(i) + color.charAt(i));
            }
        } else {
            new_color = color;
        }
        console.log(new_color);
        axios.post('http://localhost:3001/api/setting/', {embedColor: new_color}).then(() => {
            this.setState({embedColor: color});
        }).catch(console.error);
    }

    ytApiKeyChange(event) {
        let key = event.target.value;
        axios.post('http://localhost:3001/api/setting/', {ytApiKey: key}).then(() => {
            this.setState({ytApiKey: key});
        }).catch(console.error);
    }

    sliderChange(event) {
        let volume = event.target.value;
        axios.post('http://localhost:3001/api/setting/', {volume: volume}).then(() => {
            this.setState({volume: volume});
        }).catch(console.error);
    }
    
    handleHow() {
        axios.get('http://localhost:3001/api/shell/how-to-get-youtube-key').then(() => {
            console.log('clicked');
        }).catch(console.error);
    }

    render() {
        return (
            <div>
                <div className="home-header">
                    <h2 className="setting-title">User Settings</h2>
                    <button className="far fa-times-circle fa-sm header-button esc-button" onClick={this.handleExit.bind(this)}></button>
                </div>
                <div className="setting-container">
                    <div className="table-container">
                        <div className="table-cell">
                            <p>Prefix</p>
                            <input className="input" spellCheck="false" 
                                style={{
                                    borderColor: (typeof this.state.prefix !== 'undefined' && this.state.prefix.length < 1) ? 'red' : ''
                                }} 
                                value={(this.state.prefix) ? this.state.prefix : ''}
                                onChange={this.prefixChange.bind(this)}>
                            </input>
                        </div>
                        <div className="table-cell">
                            <p>Embed Color</p>
                            <input className="input" spellCheck="false" 
                                style={{
                                    color: `#${this.state.embedColor}`,
                                    borderColor: (typeof this.state.embedColor !== 'undefined' && (this.state.embedColor.length !== 3 && this.state.embedColor.length !== 6)) ? 'red' : ''
                                }} 
                                value={(this.state.embedColor) ? this.state.embedColor : ''} 
                                onChange={this.colorChange.bind(this)}>
                            </input>
                        </div>
                    </div>
                    <div className="slider-container">
                        <p>YouTube API Key</p>
                        <div className="slidecontainer">
                            <input className="input" spellCheck="false" type="password"
                                style={{
                                    borderColor: (typeof this.state.ytApiKey !== 'undefined' && this.state.ytApiKey.length < 1) ? 'red' : ''
                                }}
                                value={(this.state.ytApiKey) ? this.state.ytApiKey : ''} 
                                onChange={this.ytApiKeyChange.bind(this)}>
                            </input>
                        </div>
                        <a className="how" onClick={this.handleHow.bind(this)}>
                            How do I get an API key?
                        </a>
                    </div>
                    <div className="slider-container">
                        <p>Volume {(this.state.volume) ? '- ' + this.state.volume : ''}</p>
                        <div className="slidecontainer">
                            <input type="range" min="1" max="100" 
                                value={(this.state.volume) ? this.state.volume : 50} 
                                className="slider" id="myRange" onChange={this.sliderChange.bind(this)}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
