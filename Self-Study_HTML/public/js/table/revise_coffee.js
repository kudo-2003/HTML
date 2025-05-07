function editRow(button) {
    const row = button.parentElement.parentElement;
    const cells = row.querySelectorAll('td:not(:last-child)');
    const isEditing = button.textContent === 'Lưu';
    if (isEditing) {
        const rowData = [];
        cells.forEach(cell => {
            const input = cell.querySelector('input');
            if (input) {
                cell.textContent = input.value;
                rowData.push(input.value);
            }
        });
        const tableData = JSON.parse(localStorage.getItem('tableData')) || [];
        const rowIndex = Array.from(row.parentElement.children).indexOf(row);
        tableData[rowIndex] = rowData;
        localStorage.setItem('tableData', JSON.stringify(tableData));
        button.textContent = 'Sửa';
        button.classList.remove('save-btn');
        button.classList.add('edit-btn');
    } else {
        cells.forEach(cell => {
            const text = cell.textContent;
            cell.innerHTML = `<input type="text" value="${text}" />`;
        });
        button.textContent = 'Lưu';
        button.classList.remove('edit-btn');
        button.classList.add('save-btn');
    }
}

function loadTableData() {
    const tableData = JSON.parse(localStorage.getItem('tableData'));
    if (tableData) {
        const rows = document.querySelectorAll('tbody tr');
        rows.forEach((row, index) => {
            const cells = row.querySelectorAll('td:not(:last-child)');
            if (tableData[index]) {
                tableData[index].forEach((data, i) => {
                    cells[i].textContent = data;
                });
            }
        });
    }
}


document.addEventListener('DOMContentLoaded', loadTableData);