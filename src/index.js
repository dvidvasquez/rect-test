import React from 'react';
import ReactDOM from 'react-dom';
import Artistas from './components/Artistas';
import './css/main.css'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Artistas/>, document.getElementById('root'));

serviceWorker.unregister();
