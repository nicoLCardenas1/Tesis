import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

const Example = () => <App />

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
