document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');
    const loginBtn = document.querySelector('.login-btn');

    // Use window.auth for global compatibility
    var auth = window.auth;

    // Check if user is already logged in
    auth.onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in, redirect to admin dashboard
            window.location.href = 'admin-dashboard.html';
        }
    });

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        
        // Disable login button and show loading state
        loginBtn.disabled = true;
        loginBtn.textContent = 'Logging in...';
        
        // Clear previous messages
        loginMessage.className = 'login-message';
        loginMessage.style.display = 'none';
        
        // Attempt to sign in
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Successfully logged in
                const user = userCredential.user;
                console.log('Admin logged in:', user.email);
                
                // Show success message
                showMessage('Login successful! Redirecting...', 'success');
                
                // Redirect to admin dashboard after a short delay
                setTimeout(() => {
                    window.location.href = 'admin-dashboard.html';
                }, 1500);
            })
            .catch((error) => {
                // Handle login errors
                console.error('Login error:', error);
                
                let errorMessage = 'Login failed. Please try again.';
                
                switch (error.code) {
                    case 'auth/user-not-found':
                        errorMessage = 'No admin account found with this email.';
                        break;
                    case 'auth/wrong-password':
                        errorMessage = 'Incorrect password.';
                        break;
                    case 'auth/invalid-email':
                        errorMessage = 'Invalid email address.';
                        break;
                    case 'auth/too-many-requests':
                        errorMessage = 'Too many failed attempts. Please try again later.';
                        break;
                    case 'auth/user-disabled':
                        errorMessage = 'This account has been disabled.';
                        break;
                }
                
                showMessage(errorMessage, 'error');
                
                // Re-enable login button
                loginBtn.disabled = false;
                loginBtn.textContent = 'Login';
            });
    });

    function showMessage(message, type) {
        loginMessage.textContent = message;
        loginMessage.className = `login-message ${type}`;
        loginMessage.style.display = 'block';
    }
}); 