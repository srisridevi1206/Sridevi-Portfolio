document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        // Touch event handling
        let touchStartX = 0;
        let touchStartY = 0;
        
        card.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        });
        
        card.addEventListener('touchend', e => {
            const touchEndX = e.changedTouches[0].screenX;
            const touchEndY = e.changedTouches[0].screenY;
            
            // Calculate touch distance
            const deltaX = Math.abs(touchEndX - touchStartX);
            const deltaY = Math.abs(touchEndY - touchStartY);
            
            // If the touch was more of a tap than a swipe
            if (deltaX < 10 && deltaY < 10) {
                const cardInner = card.querySelector('.card-inner');
                cardInner.style.transform = 
                    cardInner.style.transform === 'rotateY(180deg)' 
                        ? 'rotateY(0deg)' 
                        : 'rotateY(180deg)';
            }
        });

        // Add keyboard accessibility
        card.addEventListener('keypress', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                const cardInner = card.querySelector('.card-inner');
                cardInner.style.transform = 
                    cardInner.style.transform === 'rotateY(180deg)' 
                        ? 'rotateY(0deg)' 
                        : 'rotateY(180deg)';
            }
        });
    });
});
