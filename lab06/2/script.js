async function loadStudentData() {
    try {
        const response = await fetch('student-score.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status
                }`);
        }
        const students = await response.json();

        const container = document.getElementById('card-container');

        students.forEach(student => {
            let imageSrc = '';
            let headerClass = '';

            if (student.gender === 'Male') {
                imageSrc = 'https://cdn-icons-png.flaticon.com/512/4128/4128176.png';
                headerClass = 'bg-male';
            } else {
                imageSrc = 'https://cdn-icons-png.flaticon.com/512/4128/4128244.png';
                headerClass = 'bg-female';
            }
            const cardHTML = `
                <div class="card">
                    <div class="card-header ${headerClass}">
                        <img src="${imageSrc}" alt="${student.name}" class="card-img">
                    </div>
                    <div class="card-body">
                        <div class="student-name">${student.id
                }. ${student.name
                }</div>
                        <ul class="score-list">
                            <li><span>Physics :</span> <span>${student.scores.physics
                }</span></li>
                            <li><span>Mathematics :</span> <span>${student.scores.mathematics
                }</span></li>
                            <li><span>English :</span> <span>${student.scores.english
                }</span></li>
                        </ul>
                    </div>
                </div>
            `;

            container.innerHTML += cardHTML;
        });
    } catch (error) {
        console.error('Error loading data:', error);
        document.getElementById('card-container').innerHTML = '<p>เกิดข้อผิดพลาดในการโหลดข้อมูล</p>';
    }
}
document.addEventListener('DOMContentLoaded', loadStudentData);