const LEVEL_STYLES = {
    1: {
        darkBg: 'dark:bg-gray-800',
        darkBorder: 'dark:border-gray-700',
        buttonBg: 'bg-red-700',
        buttonHover: 'hover:bg-red-800',
        buttonDark: 'dark:bg-red-600',
        buttonDarkHover: 'dark:hover:bg-red-700',
        ring: 'focus:ring-4 focus:ring-red-300',
        darkRing: 'dark:focus:ring-red-800',
        counterBg: 'bg-red-200',
        counterText: 'text-red-800'
    },
    2: {
        darkBg: 'dark:bg-gray-800',
        darkBorder: 'dark:border-gray-700',
        buttonBg: 'bg-orange-700',
        buttonHover: 'hover:bg-orange-800',
        buttonDark: 'dark:bg-orange-600',
        buttonDarkHover: 'dark:hover:bg-orange-700',
        ring: 'focus:ring-4 focus:ring-orange-300',
        darkRing: 'dark:focus:ring-orange-800',
        counterBg: 'bg-orange-200',
        counterText: 'text-orange-800'
    },
    3: {
        darkBg: 'dark:bg-gray-800',
        darkBorder: 'dark:border-gray-700',
        buttonBg: 'bg-yellow-700',
        buttonHover: 'hover:bg-yellow-800',
        buttonDark: 'dark:bg-yellow-600',
        buttonDarkHover: 'dark:hover:bg-yellow-700',
        ring: 'focus:ring-4 focus:ring-yellow-300',
        darkRing: 'dark:focus:ring-yellow-800',
        counterBg: 'bg-yellow-200',
        counterText: 'text-yellow-800'
    },
    4: {
        darkBg: 'dark:bg-gray-800',
        darkBorder: 'dark:border-gray-700',
        buttonBg: 'bg-green-700',
        buttonHover: 'hover:bg-green-800',
        buttonDark: 'dark:bg-green-600',
        buttonDarkHover: 'dark:hover:bg-green-700',
        ring: 'focus:ring-4 focus:ring-green-300',
        darkRing: 'dark:focus:ring-green-800',
        counterBg: 'bg-green-200',
        counterText: 'text-green-800'
    },
    5: {
        darkBg: 'dark:bg-gray-800',
        darkBorder: 'dark:border-gray-700',
        buttonBg: 'bg-blue-700',
        buttonHover: 'hover:bg-blue-800',
        buttonDark: 'dark:bg-blue-600',
        buttonDarkHover: 'dark:hover:bg-blue-700',
        ring: 'focus:ring-4 focus:ring-blue-300',
        darkRing: 'dark:focus:ring-blue-800',
        counterBg: 'bg-blue-200',
        counterText: 'text-blue-800'
    }
};

const LEVEL_DESCRIPTIONS = {
    1: "Just started learning these concepts. Keep practicing!",
    2: "Making progress! Continue reviewing these cards.",
    3: "Getting better! These concepts are becoming familiar.",
    4: "Keep going! You've almost memorized these long term!",
    5: "You've mastered these concepts! Review as needed."
};

function generateLevelCard(level) {
    const styles = LEVEL_STYLES[level];
    return `
    <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow ${styles.darkBg} ${styles.darkBorder}">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Level ${level}</h5>
        
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            ${LEVEL_DESCRIPTIONS[level]}
        </p>
        
        <a href="/studentdash?level=${level}"
            class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white ${styles.buttonBg} ${styles.buttonHover} ${styles.ring} focus:outline-none ${styles.buttonDark} ${styles.buttonDarkHover} ${styles.darkRing} rounded-lg">
            <span class="level-${level}-count inline-flex items-center justify-center w-4 h-4 ms-2 mr-2 text-xs font-semibold ${styles.counterText} ${styles.counterBg} rounded-full">
                0
            </span>
            Flashcards to study
        </a>
    </div>
    `;
}

module.exports = {
    generateLevelCard,
    LEVEL_STYLES,
    LEVEL_DESCRIPTIONS
};