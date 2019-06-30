import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {$,jQuery} from 'jquery';
// export for others scripts to use
window.$ = $;
window.jQuery = jQuery;
ReactDOM.render(<App />, document.getElementById('root'));
