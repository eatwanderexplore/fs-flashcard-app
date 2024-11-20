// Global object to store total counts for each level
let totalCounts = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
};

// Initialize counts on page load
document.addEventListener('DOMContentLoaded', function() {
    // Store initial counts
    for (let level = 1; level <= 5; level++) {
        const cards = document.querySelectorAll(`.flashcard[data-level="${level}"]`);
        totalCounts[level] = cards.length;
    }
    
    // Set initial counter displays
    updateCounterDisplays();
    
    // Set up other event listeners
    setupModalHandlers();
    setupFlashcardObserver();
});

function setupModalHandlers() {
    const modal = document.getElementById('crud-modal');
    const openModalBtn = document.getElementById('new-flashcard-btn');
    const closeModalBtn = modal.querySelector('[data-modal-toggle="crud-modal"]');
    
    function openModal() {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
    }
    
    openModalBtn?.addEventListener('click', openModal);
    closeModalBtn?.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    modal?.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Prevent modal content clicks from closing the modal
    modal?.querySelector('.relative')?.addEventListener('click', function(event) {
        event.stopPropagation();
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && !modal?.classList.contains('hidden')) {
            closeModal();
        }
    });
}

function setupFlashcardObserver() {
    const flashcardsContainer = document.querySelector('.flex.flex-col');
    if (flashcardsContainer) {
        const observer = new MutationObserver(function(mutations) {
            let needsUpdate = false;
            mutations.forEach(mutation => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-level') {
                    needsUpdate = true;
                }
            });
            if (needsUpdate) {
                updateTotalCounts();
                updateCounterDisplays();
            }
        });
        
        observer.observe(flashcardsContainer, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['data-level']
        });
    }
}

function updateTotalCounts() {
    // Update the total counts object
    for (let level = 1; level <= 5; level++) {
        const cards = document.querySelectorAll(`.flashcard[data-level="${level}"]`);
        totalCounts[level] = cards.length;
    }
}

function updateCounterDisplays() {
    // Update all counter displays with the stored total counts
    for (let level = 1; level <= 5; level++) {
        const counters = document.querySelectorAll(`.level-${level}-count`);
        counters.forEach(counter => {
            const currentCount = parseInt(counter.textContent);
            const newCount = totalCounts[level];
            
            if (currentCount !== newCount) {
                // Animate counter update
                counter.style.transform = 'scale(1.2)';
                counter.textContent = newCount;
                setTimeout(() => {
                    counter.style.transform = 'scale(1)';
                }, 200);
            }
        });
    }
}

// Updated card level handler
function updateCardLevel(cardId, action) {
    fetch(`/updateFlashcardLevel/${cardId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: action })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const cardContainer = document.getElementById(`flashcard-container-${cardId}`);
            const oldLevel = parseInt(cardContainer.dataset.level);
            const newLevel = parseInt(data.newLevel);
            
            // Update card level
            cardContainer.dataset.level = newLevel;
            
            // Update the total counts
            totalCounts[oldLevel]--;
            totalCounts[newLevel]++;
            
            // Fade out and hide card if filtering by level
            const currentLevel = new URLSearchParams(window.location.search).get('level');
            if (currentLevel && newLevel !== parseInt(currentLevel)) {
                cardContainer.style.opacity = '0';
                setTimeout(() => {
                    cardContainer.remove();
                }, 300);
            }
            
            // Update counter displays
            updateCounterDisplays();
            
            // Show success notification
            showNotification(`Card moved from Level ${oldLevel} to Level ${newLevel}`);
        } else {
            showNotification('Error updating card level', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('Error updating card level', 'error');
    });
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed bottom-4 right-4 p-4 rounded-lg text-white ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } transition-opacity duration-300 z-50`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Card flipping functionality
function flipCard(cardId) {
    const questionSide = document.getElementById(`question-side-${cardId}`);
    const answerSide = document.getElementById(`answer-side-${cardId}`);
    
    if (answerSide.classList.contains('hidden')) {
        questionSide.classList.add('hidden');
        answerSide.classList.remove('hidden');
    } else {
        answerSide.classList.add('hidden');
        questionSide.classList.remove('hidden');
    }
}