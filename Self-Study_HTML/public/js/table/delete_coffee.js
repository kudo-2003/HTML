// Thêm Phần Xóa ở cho bảng ở đây.
function deleteRow(button) {
    const row = button.parentElement.parentElement;
    const rowIndex = Array.from(row.parentElement.children).indexOf(row);

    // Xóa dữ liệu trong localStorage
    const tableData = JSON.parse(localStorage.getItem('tableData')) || [];
    tableData.splice(rowIndex, 1);
    localStorage.setItem('tableData', JSON.stringify(tableData));

    // Xóa hàng khỏi bảng
    row.remove();
}

// Hàm tải dữ liệu từ localStorage khi trang được tải
function loadTableData() {
    const tableData = JSON.parse(localStorage.getItem('tableData'));
    if (tableData) {
        const tbody = document.querySelector('tbody');
        tbody.innerHTML = ''; // Xóa nội dung cũ

        tableData.forEach(rowData => {
            const row = document.createElement('tr');
            rowData.forEach(data => {
                const cell = document.createElement('td');
                cell.textContent = data;
                row.appendChild(cell);
            });

            // Thêm cột hành động
            const actionCell = document.createElement('td');
            actionCell.innerHTML = `
                <button class="edit-btn" onclick="editRow(this)">Sửa</button>
                <button class="save-btn" onclick="deleteRow(this)">Xóa</button>
            `;
            row.appendChild(actionCell);

            tbody.appendChild(row);
        });
    }
}

// Gọi hàm loadTableData khi trang được tải
document.addEventListener('DOMContentLoaded', loadTableData);