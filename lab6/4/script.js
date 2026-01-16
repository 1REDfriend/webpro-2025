const movieInput = document.getElementById('movieInput');
const addBtn = document.getElementById('addBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
const listContainer = document.getElementById('listContainer');

const STORAGE_KEY = 'myFavoriteMovies';

document.addEventListener('DOMContentLoaded', loadMovies);

function loadMovies() {
    const movies = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    renderList(movies);
}

function saveToLocalStorage(movies) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
}

function renderList(movies) {
    listContainer.innerHTML = '';

    if (movies.length === 0) {
        listContainer.innerHTML = '<div class="empty-state">ยังไม่มีรายการโปรด</div>';
        clearAllBtn.classList.add('hidden');
    } else {
        clearAllBtn.classList.remove('hidden');
        
        movies.forEach((movie, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'movie-item';
            
            itemDiv.innerHTML = `
                <div class="movie-info">
                    <i class="fa-solid fa-clapperboard movie-icon"></i>
                    <span>${movie}</span>
                </div>
                <button class="delete-btn" onclick="deleteMovie(${index})">ลบ</button>
            `;
            
            listContainer.appendChild(itemDiv);
        });
    }
}

function addMovie() {
    const movieName = movieInput.value.trim();

    if (movieName === '') {
        alert('กรุณากรอกชื่อภาพยนตร์หรือซีรีส์');
        return;
    }

    const movies = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    movies.push(movieName);

    saveToLocalStorage(movies);
    renderList(movies);

    movieInput.value = '';
    movieInput.focus();
}

function deleteMovie(index) {
    const movies = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    movies.splice(index, 1);

    saveToLocalStorage(movies);
    renderList(movies);
}

function clearAllMovies() {
    if (confirm('คุณต้องการลบรายการทั้งหมดใช่หรือไม่?')) {
        localStorage.removeItem(STORAGE_KEY);
        loadMovies();
    }
}

addBtn.addEventListener('click', addMovie);

clearAllBtn.addEventListener('click', clearAllMovies);

movieInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addMovie();
    }
});