document.addEventListener('DOMContentLoaded', function() {
    // Login Form Handler
    const loginForm = document.getElementById('adminLoginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your authentication logic here
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Simple example (replace with proper authentication)
            if (username === 'admin' && password === 'password') {
                localStorage.setItem('adminLoggedIn', 'true');
                window.location.href = 'dashboard.html';
            } else {
                alert('Invalid credentials');
            }
        });
    }

    // Dashboard Navigation
    const sidebarButtons = document.querySelectorAll('.admin-sidebar button');
    const sections = document.querySelectorAll('.admin-section');

    sidebarButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sectionToShow = button.getAttribute('data-section');
            
            sidebarButtons.forEach(btn => btn.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            button.classList.add('active');
            document.getElementById(sectionToShow).classList.add('active');
        });
    });

    // Add Project Form Handler
    const addProjectForm = document.getElementById('addProjectForm');
    if (addProjectForm) {
        addProjectForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            // Handle project submission
            // You'll need to implement server-side storage
            console.log('Project data:', Object.fromEntries(formData));
            
            // Example response
            alert('Project added successfully!');
            this.reset();
        });
    }

    // Logout Handler
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('adminLoggedIn');
            window.location.href = 'login.html';
        });
    }

    // Image Preview
    const projectImage = document.getElementById('projectImage');
    if (projectImage) {
        projectImage.addEventListener('change', function(e) {
            const preview = document.querySelector('.image-preview');
            const file = this.files[0];
            
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    preview.innerHTML = `<img src="${e.target.result}" style="max-width: 200px;">`;
                }
                reader.readAsDataURL(file);
            }
        });
    }
}); 