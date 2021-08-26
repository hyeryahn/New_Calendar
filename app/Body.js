import { addTHead } from './TableHead.js';
import { addTBody } from './TableBody.js';


export function Body(parent) {
    const bodyWrapper = document.createElement('div');
    bodyWrapper.id = 'bodyWrapper';
    parent.appendChild(bodyWrapper);

    addTable(bodyWrapper);
}

export function addTable(parent) {
    const table = document.createElement('table');
    table.id = 'table';
    parent.appendChild(table);

    
    addTHead(table);
    addTBody(table);
}