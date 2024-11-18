// Client-side code for handling dynamic updates
document.addEventListener('DOMContentLoaded', () => {
    // Add transition style to counters
    const style = document.createElement('style');
    style.textContent = `
        [class*="level-"][class*="-count"] {
            transition: transform 0.2s ease-in-out;
        }
        .flashcard {
            transition: opacity 0.3s ease-in-out;
        }
    `;
    document.head.appendChild(style);

    // Function to update all counters
    function updateAllCounters() {
        for (let level = 1; level <= 5; level++) {
            const cards = document.querySelectorAll(`.flashcard[data-level="${level}"]`);
            const counters = document.querySelectorAll(`.level-${level}-count`);
            const count = cards.length;
            
            counters.forEach(display => {
                const oldCount = parseInt(display.textContent);
                if (oldCount !== count) {
                    display.style.transform = 'scale(1.2)';
                    display.textContent = count;
                    setTimeout(() => {
                        display.style.transform = 'scale(1)';
                    }, 200);
                }
            });
        }
    }

    // Function to handle level changes
    window.updateCardLevel = function(cardId, action) {
        fetch(`/updateFlashcardLevel/${cardId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action: action })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const cardContainer = document.getElementById(`flashcard-container-${cardId}`);
                const oldLevel = cardContainer.dataset.level;
                cardContainer.dataset.level = data.newLevel;
                
                updateAllCounters();
                
                const currentLevel = new URLSearchParams(window.location.search).get('level');
                if (currentLevel && data.newLevel !== parseInt(currentLevel)) {
                    cardContainer.style.opacity = '0';
                    setTimeout(() => {
                        cardContainer.style.display = 'none';
                    }, 300);
                }

                showNotification(`Card moved from Level ${oldLevel} to Level ${data.newLevel}`);
            } else {
                showNotification('Error updating card level', 'error');
            }
        });
    }

    // Function to show notification
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `fixed bottom-4 right-4 p-4 rounded-lg text-white ${
            type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } transition-opacity duration-300`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Initial counter update
    updateAllCounters();

    // Set up observer for flashcard changes
    const flashcardsContainer = document.querySelector('.flex.flex-col');
    if (flashcardsContainer) {
        const observer = new MutationObserver(updateAllCounters);
        observer.observe(flashcardsContainer, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['data-level']
        });
    }
});