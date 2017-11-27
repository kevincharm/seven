import React, { Component } from 'react'
import LatestArticles from './views/LatestArticles'
import logo from './logo.png'
import './App.css'

class App extends Component {
    render() {
        return (
            <div className="App">
                <header>
                    <img className="logo" src={logo} alt="Logo" />
                </header>
                <LatestArticles />
            </div>
        )
    }
}

export default App
