document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectGrid = document.getElementById('projectGrid');
    const projects = document.querySelectorAll('.portfolio-item');

    // Check URL hash on page load
    function checkHash() {
        const hash = window.location.hash.replace('#', '') || 'all';
        filterProjects(hash);
        updateActiveButton(hash);
    }

    // Filter projects
    function filterProjects(category) {
        projects.forEach(project => {
            if (category === 'all' || project.classList.contains(category)) {
                project.classList.remove('hidden');
            } else {
                project.classList.add('hidden');
            }
        });
    }

    // Update active button
    function updateActiveButton(category) {
        filterBtns.forEach(btn => {
            if (btn.getAttribute('data-filter') === category) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Event listeners
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-filter');
            window.location.hash = category;
            filterProjects(category);
            updateActiveButton(category);
        });
    });

    // Check hash on page load and hash change
    window.addEventListener('hashchange', checkHash);
    checkHash();
}); 