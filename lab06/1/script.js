async function loadEmployeeData() {
    try {
        const response = await fetch('employees.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const employees = await response.json();

        const tableBody = document.querySelector('#employee-table tbody');

        employees.forEach(employee => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${employee.id}</td>
                <td>${employee.name}</td>
                <td>${employee.gender}</td>
                <td>${employee.position}</td>
                <td>${employee.address}</td>
            `;

            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error('ไม่สามารถโหลดข้อมูลได้:', error);
        alert('เกิดข้อผิดพลาดในการโหลดข้อมูล กรุณาตรวจสอบ Console');
    }
}

document.addEventListener('DOMContentLoaded', loadEmployeeData);