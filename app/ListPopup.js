export function ListPopup(parent) {
    const popWrapper = document.createElement('div');
    popWrapper.id = `popWrapper`;
    parent.appendChild(popWrapper);

    addPopHead(popWrapper);
    addPopBody(popWrapper);
    addPopFooter(popWrapper);
}

function addPopHead(parent) {
    const popHead = document.createElement('div');
    popHead.id = `popHead`;
    parent.appendChild(popHead);

    popCloseButton(popHead);
    popHeadText(popHead);
}

function popCloseButton(parent) {
    const popCloseButton = document.createElement('button');
    popCloseButton.id = `popCloseButton`;
    popCloseButton.innerText = 'X';
    parent.appendChild(popCloseButton);
}

function popHeadText(parent) {
    const popHeadText = document.createElement('div');
    popHeadText.id = `popHeadText`;
    parent.appendChild(popHeadText);
}

function addPopBody(parent) {
    const popBody = document.createElement('div');
    popBody.id = `popBody`;
    parent.appendChild(popBody);
}

function addPopFooter(parent) {
    const popFooter = document.createElement('div');
    popFooter.id = 'popFooter';
    parent.appendChild(popFooter);

    popAddButton(popFooter);
}

function popAddButton(parent) {
    const addButton = document.createElement('button');
    addButton.id = 'addButton';
    addButton.innerText = '+';
    parent.appendChild(addButton);
}

export function ListItem(parent, i){
    const itemWrapper = document.createElement('div');
    itemWrapper.id = `itemWrapper${i}`;
    itemWrapper.className = `itemWrapper`;
    parent.appendChild(itemWrapper);

    itemColor(itemWrapper, i);
    itemSubject(itemWrapper, i);
    addBin(itemWrapper, i);
}

function itemColor(parent, i){
    const itemColor = document.createElement('div');
    itemColor.className = 'itemColor';
    itemColor.id = `itemColor${i}`;
    parent.appendChild(itemColor);
}

function itemSubject(parent, i){
    const itemSubject = document.createElement('div');
    itemSubject.className = 'itemSubject';
    itemSubject.id = `itemSubject${i}`;
    parent.appendChild(itemSubject);
}

function addBin(parent, i){
    const bin = document.createElement('div');
    bin.className = 'bin';
    bin.id = `bin${i}`;
    parent.appendChild(bin);
}