import { Header} from './Header.js';
import { Body } from './Body.js';

window.addEventListener('DOMContentLoaded', () => {

    const root = document.getElementById('root');
    const wrapperAll = document.createElement('div');
    wrapperAll.id = 'wrapperAll';

    root.appendChild(wrapperAll);

    Header(wrapperAll);
    Body(wrapperAll);


});

