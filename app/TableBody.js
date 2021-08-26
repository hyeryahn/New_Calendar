import { today } from './Header.js';
import { ListPopup, ListItem } from './ListPopup.js';
import { ViewAddSchedule, colorPalette } from './ViewAddSchedule.js';
import { addTable } from './Body.js';

let storage = {};

export function addTBody(parent) {
    const tBody = document.createElement('tbody');
    tBody.id = 'tbody';
    parent.appendChild(tBody);

    let firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    let d = 0;

    for (let i = 1; i < 7; i++) {
        addTRow(tBody, i);
        for (let j = 0; j < 7; j++) {
            const tRow = document.getElementById(`tr${i}`);
            addTData(tRow, i, j);
        }
    };

    for (let i = 1; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
            const tData = document.getElementById(`td${i}${j}`);
            const dateBox = document.createElement('div');
            dateBox.id = `dateBox${i}${j}`;
            dateBox.className = `dateBox`;
            tData.appendChild(dateBox);

            switch (firstDayOfMonth.getDay()) {
                case 0:
                    tData.name = new Date(today.getFullYear(), today.getMonth(), 1 + d);
                    dateBox.innerText = tData.name.getDate();
                    break;
                case 1:
                    tData.name = new Date(today.getFullYear(), today.getMonth(), d);
                    dateBox.innerText = tData.name.getDate();
                    break;
                case 2:
                    tData.name = new Date(today.getFullYear(), today.getMonth(), d - 1);
                    dateBox.innerText = tData.name.getDate();
                    break;
                case 3:
                    tData.name = new Date(today.getFullYear(), today.getMonth(), d - 2);
                    dateBox.innerText = tData.name.getDate();
                    break;
                case 4:
                    tData.name = new Date(today.getFullYear(), today.getMonth(), d - 3);
                    dateBox.innerText = tData.name.getDate();
                    break;
                case 5:
                    tData.name = new Date(today.getFullYear(), today.getMonth(), d - 4);
                    dateBox.innerText = tData.name.getDate();
                    break;
                case 6:
                    tData.name = new Date(today.getFullYear(), today.getMonth(), d - 5);
                    dateBox.innerText = tData.name.getDate();
                    break;
            }

            dateBox.id[8] === '0' ? dateBox.className = 'dateBox red' : '';
            tData.name.getMonth() !== today.getMonth() ? dateBox.style.opacity = '0.5' : '';

            const storageKey = new Date(tData.name.getFullYear(), tData.name.getMonth(), tData.name.getDate());
            let storageKeyYear = storageKey.getFullYear();
            let storageKeyMonth = storageKey.getMonth() + 1;
            const storageKeyDate = storageKey.getDate();

            if (storageKeyMonth >= 13) {
                storageKeyYear += 1;
                storageKeyMonth = 1;
            }

            const storageKeyString = `${storageKeyYear}-${storageKeyMonth}-${storageKeyDate}`;
            const storageKeyForm = `${storageKeyYear}-${('0' + storageKeyMonth).slice(-2)}-${('0' + storageKeyDate).slice(-2)}`;

            if (JSON.parse(localStorage.getItem(storageKeyString)) !== null) {
                storage[storageKeyString] = JSON.parse(localStorage.getItem(storageKeyString));

                for (let index = 0; index < 3; index++) {
                    const storageIndex = storage[storageKeyString][index];

                    if (storageIndex !== null && storageIndex.startDate === storageKeyForm) {
                        const startDateDay = new Date(storageIndex.startDate).getDay();
                        const firstWeekDays = storageIndex.difDate < 7 ? storageIndex.difDate + 1 : 7 - startDateDay;
                        const countWeeks = Math.floor((storageIndex.difDate + 1 - firstWeekDays) / 7);
                        const lastDays = storageIndex.difDate + 1 - firstWeekDays - (countWeeks * 7);

                        const colorDiv = document.createElement('div');
                        colorDiv.className = `colorDiv colorDiv${index}`;
                        colorDiv.innerText = storage[storageKeyString][index].subject;
                        colorDiv.style.backgroundColor = storageIndex.color;
                        colorDiv.style.width = `${firstWeekDays * 41}px`;
                        tData.appendChild(colorDiv);

                        if (countWeeks > 0) {
                            for (let r = 1; r <= countWeeks; r++) {
                                const colorDiv = document.createElement('div');
                                colorDiv.className = `colorDiv colorDiv${index}`;
                                colorDiv.style.backgroundColor = storageIndex.color;
                                colorDiv.style.width = `${7 * 41}px`;
                                const midWeeks = document.getElementById(`td${i + r}0`);

                                if (midWeeks !== null) {
                                    midWeeks.appendChild(colorDiv);
                                }
                            }
                        }

                        if (lastDays > 0) {
                            const colorDiv = document.createElement('div');
                            colorDiv.className = `colorDiv colorDiv${index}`;
                            colorDiv.style.backgroundColor = storageIndex.color;
                            colorDiv.style.width = `${lastDays * 41}px`;
                            const lastWeek = document.getElementById(`td${i + countWeeks + 1}0`);

                            if (lastWeek !== null) {
                                lastWeek.appendChild(colorDiv);
                            }
                        }
                    }
                }
            }

            const findToday = new Date();
            if (tData.name.getFullYear() === findToday.getFullYear() && tData.name.getMonth() === findToday.getMonth() && tData.name.getDate() === findToday.getDate()) {
                dateBox.style.textDecoration = 'underline';
                dateBox.style.color = 'navy';
                dateBox.style.fontWeight = 'bold';
            }

            tData.addEventListener('click', choiceView);

            function choiceView() {
                storage[storageKeyString] === undefined ? addInfo() : viewPopUp();
            }

            function viewPopUp() {
                const popWrapper = document.getElementById('popWrapper');
                popWrapper ? popWrapper.remove() : "";

                const bodyWrapper = document.getElementById('bodyWrapper');
                ListPopup(bodyWrapper);

                const popHeadText = document.getElementById('popHeadText');
                const NameOfDays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
                popHeadText.innerText = `${tData.name.getMonth() + 1}월 ${tData.name.getDate()}일 ${NameOfDays[tData.name.getDay()]}`;

                const popCloseButton = document.getElementById('popCloseButton');
                popCloseButton.addEventListener('click', closePop);

                function closePop() {
                    const popWrapper = document.getElementById('popWrapper');
                    popWrapper.remove();
                }

                if (storage[storageKeyString]) {

                    for (let i = 0; i < 10; i++) {
                        if (storage[storageKeyString][i] !== null) {
                            const popBody = document.getElementById('popBody');
                            ListItem(popBody, i);
                            const itemColor = document.getElementById(`itemColor${i}`);
                            itemColor.style.backgroundColor = storage[storageKeyString][i].color;

                            const itemSubject = document.getElementById(`itemSubject${i}`);
                            itemSubject.innerText = storage[storageKeyString][i].subject;

                            const bin = document.getElementById(`bin${i}`);
                            bin.name = storage[storageKeyString][i].id;
                            bin.addEventListener('click', removeItem);

                            function removeItem() {
                                for (let key in storage) {
                                    for (let h = 0; h < 10; h++) {
                                        if (storage[key][h] !== null) {
                                            if (storage[key][h].id === bin.name) {
                                                storage[key][h] = null;
                                            }
                                        }
                                    }
                                    localStorage[key] = JSON.stringify(storage[key]);
                                }
                                for(let key in storage){
                                    let emptyKey = true;
                                    for(let h=0; h < 10; h++){
                                        if (storage[key][h] !== null) {
                                            emptyKey = false;
                                        }
                                    }
                                    if(emptyKey){
                                        localStorage.removeItem(key);
                                    }
                                }

                                const itemWrapper = document.getElementById(`itemWrapper${i}`);
                                itemWrapper.remove();

                                const popWrapper = document.getElementById(`popWrapper`);
                                popWrapper.remove();

                                const table = document.getElementById('table');
                                table.remove();

                                addTable(bodyWrapper);
                            }
                        }
                    }
                }
                const addSchedule = document.getElementById('addButton');
                addSchedule.addEventListener('click', addInfo);
            }

            d++;

            function addInfo() {
                const popWrapper = document.getElementById('popWrapper');
                popWrapper ? popWrapper.remove() : "";

                const bodyWrapper = document.getElementById('bodyWrapper');
                ViewAddSchedule(bodyWrapper);

                const chooseButton = document.getElementById('chooseButton');
                chooseButton.style.backgroundColor = `hsl(180, 50%,70%)`;
                chooseButton.addEventListener('click', paletteStatus);

                function paletteStatus() {
                    const palette = document.getElementById('palette');
                    palette ? closePalette() : viewPalette(chooseButton);
                }

                const startDateInput = document.getElementById('startDateInput');
                startDateInput.value = `${tData.name.getFullYear()}-${('0' + (tData.name.getMonth() + 1)).slice(-2)}-${('0' + tData.name.getDate()).slice(-2)}`;

                const endDateInput = document.getElementById('endDateInput');
                endDateInput.value = `${tData.name.getFullYear()}-${('0' + (tData.name.getMonth() + 1)).slice(-2)}-${('0' + tData.name.getDate()).slice(-2)}`;

                const subject = document.getElementById('subject');
                const memo = document.getElementById('memo');
                const viewAddSchedule = document.getElementById('viewAddSchedule');

                const cancelButton = document.getElementById('cancelButton');
                cancelButton.addEventListener('click', () => { viewAddSchedule.remove() });

                const saveButton = document.getElementById('saveButton');
                saveButton.addEventListener('click', saveChange);

                function saveChange() {
                    viewAddSchedule.remove();

                    const startDate = new Date(startDateInput.value);
                    const endDate = new Date(endDateInput.value);
                    const difTime = endDate.getTime() - startDate.getTime();
                    const difDate = difTime / (1000 * 3600 * 24);

                    for (let i = 0; i <= difDate; i++) {
                        const storageDate = new Date(tData.name.getFullYear(), tData.name.getMonth(), tData.name.getDate() + i);
                        let storageDateYear = tData.name.getFullYear();
                        let storageDateMonth = tData.name.getMonth() + 1;

                        if (storageDateMonth >= 13) {
                            storageDateYear += 1;
                            storageDateMonth = 1;
                        }

                        const storageDateString = `${storageDateYear}-${storageDateMonth}-${storageDate.getDate()}`;

                        if (storage[storageDateString] === undefined) {
                            storage[storageDateString] = [];
                            for (let j = 0; j < 10; j++) {
                                storage[storageDateString].push(null)
                            }
                        }
                    }

                    const minEmptySlot = getMinEmptySlot(startDate, endDate, storage, tData);
                    const randomId = Math.floor(Math.random() * 99999);
                    for (let i = 0; i <= difDate; i++) {
                        const storageDate = new Date(tData.name.getFullYear(), tData.name.getMonth(), tData.name.getDate() + i);
                        let storageDateYear = tData.name.getFullYear();
                        let storageDateMonth = tData.name.getMonth() + 1;

                        if (storageDateMonth >= 13) {
                            storageDateYear += 1;
                            storageDateMonth = 1;
                        }

                        const storageDateString = `${storageDateYear}-${storageDateMonth}-${storageDate.getDate()}`;

                        storage[storageDateString][minEmptySlot] = { 'id': randomId, 'subject': subject.value, 'startDate': startDateInput.value, 'endDate': endDateInput.value, 'difDate': difDate, 'memo': memo.value, 'color': chooseButton.style.backgroundColor };

                        for (let key in storage) {
                            localStorage[key] = JSON.stringify(storage[key]);
                        }

                    }
                    const table = document.getElementById('table');
                    table.remove();

                    addTable(bodyWrapper);
                }
            }
        }
    }
}

function getMinEmptySlot(startDate, endDate, storage, tData) {
    const difTime = endDate.getTime() - startDate.getTime();
    const difDate = difTime / (1000 * 3600 * 24);

    let minEmptySlot = 0;
    for (minEmptySlot = 0; minEmptySlot < 10; minEmptySlot++) {
        let success = true;
        for (let i = 0; i <= difDate; i++) {
            const storageDate = new Date(tData.name.getFullYear(), tData.name.getMonth(), tData.name.getDate() + i);
            let storageDateYear = tData.name.getFullYear();
            let storageDateMonth = tData.name.getMonth() + 1;

            if (storageDateMonth >= 13) {
                storageDateYear += 1;
                storageDateMonth = 1;
            }
            const storageDateString = `${storageDateYear}-${storageDateMonth}-${storageDate.getDate()}`;
            if (storage[storageDateString][minEmptySlot]) {
                success = false;
                break;
            }
        }

        if (success) break;
    }

    if (minEmptySlot === 10) {
        throw new Error('slot is full');
    }

    return minEmptySlot;
}

function closePalette() {
    const palette = document.getElementById('palette');
    palette.remove();
}

function viewPalette(parent) {
    colorPalette(parent);

    for (let i = 0; i < 8; i++) {
        const colorChip = document.getElementById(`colorChip${i}`);
        colorChip.addEventListener('click', changeColor);

        function changeColor() {
            parent.style.backgroundColor = colorChip.style.backgroundColor;
        }
    }
}

function addTRow(parent, i) {
    const tRow = document.createElement('tr');
    tRow.id = `tr${i}`;
    parent.appendChild(tRow);
}

function addTData(parent, i, j) {
    const tData = document.createElement('td');
    tData.id = `td${i}${j}`;
    parent.appendChild(tData);
}