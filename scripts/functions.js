export function addDeleteButton() {
    const tableForm = document.getElementById('form-table');
    const tr = document.createElement('tr');
    tr.innerHTML =
        '<td></td>' +
        '<td class="td-button"><button type="submit" name="deleteButton" id="delete-btn">Delete</button></td>';
    tableForm.appendChild(tr);
}

export function getGrade(radioName) {
    let radios = document.getElementsByName(radioName);

    for (let i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
    return 0;
}

export function getUrlParamValue(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}

export function setRadioButton(radioName, value) {
    let radios = document.getElementsByName(radioName);

    for (let i = 0, length = radios.length; i < length; i++) {
        if (radios[i].value === value) {
            radios[i].checked = true;
            break;
        }
    }
}

