import { addTBody } from './TableBody.js';

export let today = new Date();
export function Header(parent) {
    const headerWrapper = document.createElement('div');
    headerWrapper.id = 'headerWrapper';
    parent.appendChild(headerWrapper);

    addTodayButton(headerWrapper);
    addLeftButton(headerWrapper);
    addMonthMarking(headerWrapper);
    addRightButton(headerWrapper);
    


    let originYear = today.getFullYear();
    let originMonth = today.getMonth() + 1;
    let originDate = today.getDate();
    const monthMarking = document.getElementById('monthMarking');
    monthMarking.innerText = `${originYear}.${('0' + originMonth).slice(-2)}`;

    const todayButton = document.getElementById('todayButton');
    todayButton.addEventListener('click', changeToday);

    function changeToday() {
        today = new Date();
        monthMarking.innerText = `${today.getFullYear()}.${('0' + (today.getMonth() + 1)).slice(-2)}`;

        let tBody = document.getElementById('tbody');
        let table = document.getElementById('table');
        tBody.remove();
        addTBody(table);

    }

    const leftButton = document.getElementById('leftButton');
    leftButton.addEventListener('click', subsMonth);

    function subsMonth() {
        originMonth === 1 ? (originYear -= 1, originMonth = 12) : originMonth -= 1;

        today = new Date(`${originYear}-${originMonth}-${originDate}`);
        monthMarking.innerText = `${originYear}.${('0' + originMonth).slice(-2)}`;

        let tBody = document.getElementById('tbody');
        let table = document.getElementById('table');
        tBody.remove();
        addTBody(table);
    }

    const rightButton = document.getElementById('rightButton');
    rightButton.addEventListener('click', addMonth);

    function addMonth() {
        originMonth >= 12 ? (originYear += 1, originMonth = 1) : originMonth += 1;

        today = new Date(`${originYear}-${originMonth}-${originDate}`);
        monthMarking.innerText = `${originYear}.${('0' + originMonth).slice(-2)}`;

        let tBody = document.getElementById('tbody');
        let table = document.getElementById('table');
        tBody.remove();
        addTBody(table);
    }

}

function addTodayButton(parent) {
    const todayButton = document.createElement('button');
    todayButton.id = 'todayButton';
    todayButton.innerText = 'TODAY';
    parent.appendChild(todayButton);
}

function addLeftButton(parent) {
    const leftButton = document.createElement('button');;
    leftButton.id = 'leftButton';
    leftButton.innerText = '<';
    parent.appendChild(leftButton);
}

function addRightButton(parent) {
    const rightButton = document.createElement('button');;
    rightButton.id = 'rightButton';
    rightButton.innerText = '>';
    parent.appendChild(rightButton);
}

function addMonthMarking(parent) {
    const monthMarking = document.createElement('div');
    monthMarking.id = 'monthMarking';

    parent.appendChild(monthMarking);
}