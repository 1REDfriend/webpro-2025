const drag_item = document.querySelectorAll('.drag-item')
drag_item.forEach(item => {
    let startX, startY;

    item.addEventListener('mousedown', (e) => {
        item.classList.add('is-drag');
        startX = e.clientX;
        startY = e.clientY;
    })

    window.addEventListener('mousemove', (e) => {
        if (!item.classList.contains('is-drag')) return;
        item.style.setProperty('--x', `${e.clientX - startX}px`);
        item.style.setProperty('--y', `${e.clientY - startY}px`);
    });

    window.addEventListener('mouseup', (e) => {
        if (!item.classList.contains('is-drag')) return;
        item.classList.remove('is-drag');
        item.style.removeProperty('--x');
        item.style.removeProperty('--y');
    })
})