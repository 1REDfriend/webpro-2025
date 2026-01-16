async function loadQuizData() {
    try {
        const response = await fetch('questionAnswerData.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const questions = await response.json();
        const questionsList = document.getElementById('questions-list');

        questions.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question-item');

            const questionTitle = document.createElement('div');
            questionTitle.classList.add('question-text');
            questionTitle.textContent = q.question;
            questionDiv.appendChild(questionTitle);

            const optionsGroup = document.createElement('div');
            optionsGroup.classList.add('options-group');

            q.options.forEach((option, optIndex) => {
                const label = document.createElement('label');
                label.classList.add('option-label');

                const prefix = String.fromCharCode(65 + optIndex);

                const input = document.createElement('input');
                input.type = 'radio';
                input.name = `question_${q.id}`;
                input.value = option;

                label.appendChild(input);
                label.appendChild(document.createTextNode(`${prefix}. ${option}`));

                optionsGroup.appendChild(label);
            });

            questionDiv.appendChild(optionsGroup);
            questionsList.appendChild(questionDiv);
        });

    } catch (error) {
        console.error('Error loading quiz:', error);
        document.getElementById('questions-list').innerHTML = '<p style="color:red;">ไม่สามารถโหลดข้อสอบได้ กรุณาตรวจสอบการรัน Server</p>';
    }
}

document.getElementById('quiz-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const answers = {};

    for (let [key, value] of formData.entries()) {
        answers[key] = value;
    }

    console.log('User Answers:', answers);
    alert('ส่งคำตอบเรียบร้อย! (ดูผลใน Console)');
});

document.addEventListener('DOMContentLoaded', loadQuizData);