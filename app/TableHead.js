export const dayString = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function addTHead(parent) {
    const tHead = document.createElement('thead');
    tHead.id = 'thead';
    parent.appendChild(tHead);

    addTHeadRow(tHead);
}

function addTHeadRow(parent) {
    const tHeadRow = document.createElement('tr');
    tHeadRow.id = `tr0`;
    parent.appendChild(tHeadRow);

    for (let i = 0; i < 7; i++) {
        addTH(tHeadRow, i, dayString);
    };
}

function addTH(parent, i, arr) {
    const tH = document.createElement('th');
    tH.id = `th${i}`;
    tH.innerText = arr[i];
    if (tH.id == `th0`) {
        tH.className = 'red';
    }

    parent.appendChild(tH);
}