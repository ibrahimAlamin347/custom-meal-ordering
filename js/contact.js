document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const firstName = formData.get('firstName');
            const lastName = formData.get('lastName');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!firstName || !lastName || !email || !subject || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Show success message
            showSuccessMessage();
        });
    }
    
    function showSuccessMessage() {
        const formContainer = document.querySelector('.form-container');
        const formHeader = document.querySelector('.form-header');
        const contactForm = document.querySelector('.contact-form');
        
        // Hide the form
        contactForm.style.display = 'none';
        
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div class="success-icon">
                <i class="bx bx-check-circle"></i>
            </div>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
            <button type="button" class="btn-new-message" onclick="resetForm()">Send Another Message</button>
        `;
        
        // Insert success message after form header
        formHeader.insertAdjacentElement('afterend', successMessage);
        
        // Add success styling
        successMessage.style.background = 'rgba(76, 175, 80, 0.1)';
        successMessage.style.borderRadius = '15px';
        successMessage.style.padding = '40px';
        successMessage.style.textAlign = 'center';
        successMessage.style.marginTop = '20px';
    }
});

// Global function to reset form
function resetForm() {
    const contactForm = document.querySelector('.contact-form');
    const successMessage = document.querySelector('.success-message');
    
    if (contactForm && successMessage) {
        // Show the form again
        contactForm.style.display = 'block';
        
        // Remove success message
        successMessage.remove();
        
        // Reset form fields
        contactForm.reset();
    }
}

// Add some additional CSS for the success message
const additionalStyles = `
    .success-message {
        animation: slideIn 0.5s ease;
    }
    
    .success-icon {
        margin-bottom: 20px;
    }
    
    .success-icon i {
        font-size: 4rem;
        color: #4caf50;
    }
    
    .success-message h3 {
        color: #4caf50;
        margin-bottom: 15px;
        font-size: 1.8rem;
    }
    
    .success-message p {
        color: #666;
        margin-bottom: 30px;
        font-size: 1.1rem;
    }
    
    .btn-new-message {
        background: #d41b27;
        color: white;
        padding: 12px 30px;
        border: none;
        border-radius: 25px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .btn-new-message:hover {
        background: #b31414;
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(212, 27, 39, 0.3);
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement("style");
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet); 