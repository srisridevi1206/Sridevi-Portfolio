document.addEventListener('DOMContentLoaded', function() {
    const book = document.querySelector('.book');
    const cover = document.querySelector('.book-cover');
    const pages = document.querySelectorAll('.page');
    let currentPage = -1; // -1 = cover showing, 0 = first page, etc.
    let isAnimating = false;
    
    function initializePages() {
        // Set up proper z-index stacking for realistic page layering
        pages.forEach((page, index) => {
            page.style.zIndex = pages.length - index + 10;
            page.classList.remove('turned'); // Reset all pages
            
            // Add click handlers for each page
            page.addEventListener('click', handlePageClick);
        });
        
        // Reset cover
        cover.classList.remove('turned');
        cover.style.zIndex = 100; // Cover always on top when closed
        
        // Add navigation indicators
        addNavigationIndicators();
        updatePageState();
    }
    
    function addNavigationIndicators() {
        // Create navigation hints
        pages.forEach((page, index) => {
            if (!page.querySelector('.nav-hint-left')) {
                const leftHint = document.createElement('div');
                leftHint.className = 'nav-hint-left';
                leftHint.innerHTML = '←';
                page.appendChild(leftHint);
                
                const rightHint = document.createElement('div');
                rightHint.className = 'nav-hint-right';
                rightHint.innerHTML = '→';
                page.appendChild(rightHint);
            }
        });
    }

    function handlePageClick(e) {
        if (isAnimating) return;
        
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const pageWidth = rect.width;
        
        // Determine navigation direction based on click position
        if (clickX < pageWidth / 2) {
            navigateToPage(currentPage - 1); // Go back
        } else {
            navigateToPage(currentPage + 1); // Go forward
        }
    }
    
    function navigateToPage(targetPage) {
        if (isAnimating) return;
        if (targetPage < -1 || targetPage >= pages.length) return; // Invalid page
        
        isAnimating = true;
        
        // Determine direction of navigation
        const direction = targetPage > currentPage ? 'forward' : 'backward';
        
        if (direction === 'forward') {
            turnPagesForward(targetPage);
        } else {
            turnPagesBackward(targetPage);
        }
    }
    
    function turnPagesForward(targetPage) {
        if (currentPage === -1 && targetPage >= 0) {
            // Open cover first
            cover.classList.add('turned');
            setTimeout(() => {
                currentPage = 0;
                if (targetPage > 0) {
                    turnPagesToTarget(targetPage);
                } else {
                    isAnimating = false;
                    updatePageState();
                }
            }, 600);
        } else {
            turnPagesToTarget(targetPage);
        }
    }
    
    function turnPagesBackward(targetPage) {
        if (targetPage === -1) {
            // Close to cover
            turnPagesToTarget(0);
            setTimeout(() => {
                cover.classList.remove('turned');
                currentPage = -1;
                isAnimating = false;
                updatePageState();
            }, 300);
        } else {
            turnPagesToTarget(targetPage);
        }
    }
    
    function turnPagesToTarget(targetPage) {
        let pagesToTurn = [];
        
        if (targetPage > currentPage) {
            // Turning forward
            for (let i = currentPage; i < targetPage; i++) {
                pagesToTurn.push({ page: i, action: 'turn' });
            }
        } else {
            // Turning backward
            for (let i = currentPage - 1; i >= targetPage; i--) {
                pagesToTurn.push({ page: i, action: 'unturn' });
            }
        }
        
        // Execute page turns with staggered timing
        pagesToTurn.forEach((item, index) => {
            setTimeout(() => {
                if (item.action === 'turn') {
                    pages[item.page].classList.add('turned');
                } else {
                    pages[item.page].classList.remove('turned');
                }
                
                // Update current page and finish animation on last page
                if (index === pagesToTurn.length - 1) {
                    setTimeout(() => {
                        currentPage = targetPage;
                        isAnimating = false;
                        updatePageState();
                    }, 400);
                }
            }, index * 200);
        });
    }

    function updatePageState() {
        // Update navigation hints visibility
        pages.forEach((page, index) => {
            const leftHint = page.querySelector('.nav-hint-left');
            const rightHint = page.querySelector('.nav-hint-right');
            
            if (leftHint && rightHint) {
                // Show/hide navigation hints based on current position
                leftHint.style.opacity = (currentPage > -1) ? '0.6' : '0';
                rightHint.style.opacity = (currentPage < pages.length - 1) ? '0.6' : '0';
                
                // Show hints on current visible page
                if (index === currentPage) {
                    leftHint.style.display = currentPage > -1 ? 'block' : 'none';
                    rightHint.style.display = currentPage < pages.length - 1 ? 'block' : 'none';
                } else {
                    leftHint.style.display = 'none';
                    rightHint.style.display = 'none';
                }
            }
        });
        
        // Update page counter display
        updatePageCounter();
    }
    
    function updatePageCounter() {
        // Create or update page counter
        let counter = book.querySelector('.page-counter');
        if (!counter) {
            counter = document.createElement('div');
            counter.className = 'page-counter';
            book.appendChild(counter);
        }
        
        if (currentPage === -1) {
            counter.textContent = 'Cover';
        } else {
            counter.textContent = `Page ${currentPage + 1} of ${pages.length}`;
        }
    }
    
    function resetBook() {
        if (isAnimating) return;
        navigateToPage(-1); // Go back to cover
    }

    // Cover click handler
    cover.addEventListener('click', (e) => {
        if (currentPage === -1) {
            // Open book
            navigateToPage(0);
        } else {
            // Handle navigation based on click position
            const rect = cover.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const coverWidth = rect.width;
            
            if (clickX < coverWidth / 2) {
                navigateToPage(currentPage - 1);
            } else {
                navigateToPage(currentPage + 1);
            }
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!book.matches(':hover')) return;
        
        switch(e.key) {
            case 'ArrowRight':
            case ' ':
                e.preventDefault();
                navigateToPage(currentPage + 1);
                break;
            case 'ArrowLeft':
                e.preventDefault();
                navigateToPage(currentPage - 1);
                break;
            case 'Home':
                e.preventDefault();
                navigateToPage(-1);
                break;
            case 'End':
                e.preventDefault();
                navigateToPage(pages.length - 1);
                break;
            case 'Escape':
                e.preventDefault();
                resetBook();
                break;
        }
    });
    
    // Double-click to reset
    book.addEventListener('dblclick', resetBook);

    // Enhanced touch events for mobile
    let startX, startY;
    let isDragging = false;
    let dragThreshold = 50;

    book.addEventListener('touchstart', e => {
        if (isAnimating) return;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isDragging = true;
    });

    book.addEventListener('touchmove', e => {
        if (!isDragging) return;
        e.preventDefault();
    });

    book.addEventListener('touchend', e => {
        if (!isDragging || isAnimating) return;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        // Only process horizontal swipes
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > dragThreshold) {
            if (diffX > 0) {
                // Swipe left - next page
                navigateToPage(currentPage + 1);
            } else {
                // Swipe right - previous page
                navigateToPage(currentPage - 1);
            }
        }
        
        isDragging = false;
    });

    // Initialize the book
    initializePages();
});
