document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.certificate-modal');
    const modalImg = document.getElementById('modal-certificate');
    const closeModal = document.querySelector('.close-modal');
    const viewButtons = document.querySelectorAll('.view-certificate');

    // Certificate paths
    const certificatePaths = {
        cert1: 'certificate of Software eng job simu from forage.pdf',
        cert2: 'infosys springboard Genai transformer GpT-3 Certificate.pdf',
        cert3: 'assets/certificates/react.jpg',
        cert4: 'intro to data science by infosys springboard.pdf',
        cert5: 'Tcs in master data certificate.pdf',
        cert6: 'assets/certificates/machine-learning.jpg'
    };

    // Add PDF indicators to buttons
    viewButtons.forEach(button => {
        const certId = button.dataset.certificate;
        const certPath = certificatePaths[certId];
        
        if (certPath && certPath.toLowerCase().endsWith('.pdf')) {
            button.innerHTML += ' 📄';
            button.title = 'Click to open PDF in new tab';
        } else {
            button.title = 'Click to view certificate';
        }
    });

    // Open certificate
    viewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const certId = e.target.dataset.certificate;
            const certPath = certificatePaths[certId];
            
            // Check if it's a PDF file
            if (certPath && certPath.toLowerCase().endsWith('.pdf')) {
                // Open PDF in new tab
                window.open(certPath, '_blank');
            } else {
                // Show image in modal
                modalImg.src = certPath;
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Handle keyboard events
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});
