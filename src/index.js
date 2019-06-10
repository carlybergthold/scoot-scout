import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import ScootApp from './ScootApp';
import './index.css'

ReactDOM.render(
    <Router>
        <ScootApp />
    </Router>
    , document.getElementById('root'))