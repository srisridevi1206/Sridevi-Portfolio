document.addEventListener('DOMContentLoaded', () => {
    // Resume View Functionality
    const cvBtn = document.querySelector('.cv-btn');
    
    if (cvBtn) {
        cvBtn.addEventListener('click', (e) => {
            // Add visual feedback
            const originalText = cvBtn.innerHTML;
            cvBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening...';
            cvBtn.style.pointerEvents = 'none';
            
            // Reset button after a short delay
            setTimeout(() => {
                cvBtn.innerHTML = '<i class="fas fa-check"></i> Opened!';
                setTimeout(() => {
                    cvBtn.innerHTML = originalText;
                    cvBtn.style.pointerEvents = 'auto';
                }, 1500);
            }, 300);
        });
    }

    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Add your form submission logic here
        // Example: Send to an API endpoint
        try {
            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.textContent = 'Sending...';
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Reset form
            contactForm.reset();
            submitBtn.textContent = 'Message Sent!';
            
            setTimeout(() => {
                submitBtn.textContent = 'Send Message';
            }, 3000);
            
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again.');
        }
    });
});
