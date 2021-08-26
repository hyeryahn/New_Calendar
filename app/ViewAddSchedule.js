export function ViewAddSchedule(parent) {
    const viewAddSchedule = document.createElement('div');
    viewAddSchedule.id = 'viewAddSchedule';
    parent.appendChild(viewAddSchedule);

    addSubjectWrapper(viewAddSchedule);
    addStartWrapper(viewAddSchedule);
    addEndWrapper(viewAddSchedule);
    addMemoWrapper(viewAddSchedule);
    addButtonWrapper(viewAddSchedule);
}
function addSubjectWrapper(parent) {
    const subjectWrapper = document.createElement('div');
    subjectWrapper.id = 'subjectWrapper';
    subjectWrapper.className = 'scheduleWrapper';
    parent.appendChild(subjectWrapper);

    addSubject(subjectWrapper);
    chooseColor(subjectWrapper);
}

function addSubject(parent) {
    const subject = document.createElement('input');
    subject.id = 'subject';
    subject.type = 'text';
    subject.value = '제목';
    parent.appendChild(subject);
}

function chooseColor(parent) {
    const chooseButton = document.createElement('button');
    chooseButton.id = 'chooseButton';
    parent.appendChild(chooseButton);
}

export function colorPalette(parent) {
    const palette = document.createElement('div');
    palette.id = 'palette';
    parent.appendChild(palette);

    colorChip(palette);
}

function colorChip(parent){
    for (let i = 0; i < 8; i++) {
        const colorChip = document.createElement('button');
        colorChip.className = 'colorChip';
        colorChip.id = `colorChip${i}`;
        colorChip.style.backgroundColor = `hsl(${i * 45}, 50%,70%)`;
        parent.appendChild(colorChip);
    }
}

function addStartWrapper(parent) {
    const startWrapper = document.createElement('div');
    startWrapper.id = 'startWrapper';
    startWrapper.className = 'scheduleWrapper';
    parent.appendChild(startWrapper);

    addStartDate(startWrapper);
}

function addStartDate(parent) {
    const startName = document.createElement('span');
    startName.id = 'startName';
    startName.innerText = '시작';
    parent.appendChild(startName);

    const startDateInput = document.createElement('input');
    startDateInput.id = 'startDateInput';
    startDateInput.className = 'dateInput';
    startDateInput.type = 'date';
    parent.appendChild(startDateInput);
}


function addEndWrapper(parent) {
    const endWrapper = document.createElement('div');
    endWrapper.id = 'endWrapper';
    endWrapper.className = 'scheduleWrapper';
    parent.appendChild(endWrapper);

    addEndDate(endWrapper);
}

function addEndDate(parent) {
    const endDate = document.createElement('span');
    endDate.id = 'endDate';
    endDate.innerText = '종료';
    parent.appendChild(endDate);

    const endDateInput = document.createElement('input');
    endDateInput.id = 'endDateInput';
    endDateInput.className = 'dateInput';
    endDateInput.type = 'date';
    parent.appendChild(endDateInput);
}

function addMemoWrapper(parent) {
    const memoWrapper = document.createElement('div');
    memoWrapper.id = 'memoWrapper';
    parent.appendChild(memoWrapper);

    addMemo(memoWrapper);
}

function addMemo(parent) {
    const memoLabel = document.createElement('p');
    memoLabel.id = 'memoLabel';
    memoLabel.innerText = '메모';
    parent.appendChild(memoLabel);

    const memo = document.createElement('textarea');
    memo.id = 'memo';
    parent.appendChild(memo);
}

function addButtonWrapper(parent) {
    const buttonWrapper = document.createElement('div');
    buttonWrapper.id = 'buttonWrapper';
    parent.appendChild(buttonWrapper);

    addCancelButton(buttonWrapper);
    addSaveButton(buttonWrapper)

}

function addCancelButton(parent) {
    const cancelButton = document.createElement('button');
    cancelButton.id = 'cancelButton';
    cancelButton.innerText = '취소';
    parent.appendChild(cancelButton);
}

function addSaveButton(parent) {
    const saveButton = document.createElement('button');
    saveButton.id = 'saveButton';
    saveButton.innerText = '저장';
    parent.appendChild(saveButton);
}
