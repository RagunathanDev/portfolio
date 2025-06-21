// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Skill bars animation
const skillBars = document.querySelectorAll('.skill-progress');
const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
};

// Intersection Observer for skill bars
const skillsSection = document.querySelector('.skills');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelector('input[placeholder*="Subject"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
    });
}

// Typing indicator functionality
const typingIndicator = document.getElementById('typingIndicator');
let typingTimer;

const showTypingIndicator = () => {
    if (typingIndicator) {
        typingIndicator.style.display = 'flex';
    }
};

const hideTypingIndicator = () => {
    if (typingIndicator) {
        typingIndicator.style.display = 'none';
    }
};

const handleTyping = () => {
    showTypingIndicator();
    
    // Clear existing timer
    clearTimeout(typingTimer);
    
    // Hide typing indicator after 2 seconds of no typing
    typingTimer = setTimeout(() => {
        hideTypingIndicator();
    }, 2000);
};

// Add typing event listeners to form inputs
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
formInputs.forEach(input => {
    input.addEventListener('input', handleTyping);
    input.addEventListener('focus', handleTyping);
    input.addEventListener('blur', () => {
        setTimeout(hideTypingIndicator, 1000);
    });
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// Counter animation for stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const suffix = counter.textContent.replace(/\d/g, '');
        let current = 0;
        const increment = target / 50;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + suffix;
            }
        };
        
        updateCounter();
    });
};

// Intersection Observer for counter animation
const statsSection = document.querySelector('.hero-stats');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Parallax effect for floating cards
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        card.style.transform = `translateY(${yPos}px)`;
    });
});

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Hide typing indicator initially
    if (typingIndicator) {
        typingIndicator.style.display = 'none';
    }
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.floating-card, .timeline-content, .skill-category, .contact-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Initialize Games
    initializeGames();
});

// Games Functionality
function initializeGames() {
    initializeTypingGame();
    initializePuzzleGame();
    initializeQuizGame();
}

// Typing Game
function initializeTypingGame() {
    const typingWords = [
        'function', 'variable', 'array', 'object', 'class', 'method', 'interface',
        'inheritance', 'polymorphism', 'encapsulation', 'abstraction', 'algorithm',
        'data structure', 'recursion', 'iteration', 'asynchronous', 'promise',
        'callback', 'closure', 'prototype', 'framework', 'library', 'API',
        'microservice', 'database', 'cache', 'queue', 'stack', 'tree', 'graph'
    ];

    const startBtn = document.getElementById('startTypingBtn');
    const typingInput = document.getElementById('typingInput');
    const currentWord = document.getElementById('currentWord');
    const wpmDisplay = document.getElementById('wpmDisplay');
    const accuracyDisplay = document.getElementById('accuracyDisplay');
    const timeDisplay = document.getElementById('timeDisplay');

    let gameActive = false;
    let timeLeft = 60;
    let correctWords = 0;
    let totalWords = 0;
    let startTime;
    let timer;

    if (startBtn) {
        startBtn.addEventListener('click', startTypingGame);
    }

    if (typingInput) {
        typingInput.addEventListener('input', checkWord);
        typingInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !gameActive) {
                startTypingGame();
            }
        });
    }

    function startTypingGame() {
        gameActive = true;
        timeLeft = 60;
        correctWords = 0;
        totalWords = 0;
        startTime = Date.now();
        
        startBtn.textContent = '⏸️ Pause';
        startBtn.disabled = true;
        typingInput.disabled = false;
        typingInput.value = '';
        typingInput.focus();
        
        showNewWord();
        startTimer();
    }

    function showNewWord() {
        const randomWord = typingWords[Math.floor(Math.random() * typingWords.length)];
        currentWord.textContent = randomWord;
    }

    function checkWord() {
        const typedWord = typingInput.value.trim();
        const targetWord = currentWord.textContent;

        if (typedWord === targetWord) {
            correctWords++;
            totalWords++;
            typingInput.value = '';
            showNewWord();
        } else if (typedWord.endsWith(' ')) {
            totalWords++;
            typingInput.value = '';
            showNewWord();
        }
    }

    function startTimer() {
        timer = setInterval(() => {
            timeLeft--;
            timeDisplay.textContent = `${timeLeft}s`;

            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    }

    function endGame() {
        gameActive = false;
        clearInterval(timer);
        
        const timeElapsed = (Date.now() - startTime) / 1000 / 60; // in minutes
        const wpm = Math.round(correctWords / timeElapsed);
        const accuracy = totalWords > 0 ? Math.round((correctWords / totalWords) * 100) : 0;

        wpmDisplay.textContent = wpm;
        accuracyDisplay.textContent = `${accuracy}%`;
        
        startBtn.textContent = '🚀 Start Game';
        startBtn.disabled = false;
        typingInput.disabled = true;
        currentWord.textContent = 'Click Start to begin!';
    }
}

// Puzzle Game
function initializePuzzleGame() {
    const puzzleBlocks = document.querySelectorAll('.puzzle-block');
    const checkBtn = document.getElementById('checkPuzzleBtn');
    const resetBtn = document.getElementById('resetPuzzleBtn');

    let draggedElement = null;

    puzzleBlocks.forEach(block => {
        block.addEventListener('dragstart', handleDragStart);
        block.addEventListener('dragend', handleDragEnd);
        block.addEventListener('dragover', handleDragOver);
        block.addEventListener('drop', handleDrop);
    });

    if (checkBtn) {
        checkBtn.addEventListener('click', checkPuzzle);
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', resetPuzzle);
    }

    function handleDragStart(e) {
        draggedElement = this;
        this.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
    }

    function handleDragEnd(e) {
        this.classList.remove('dragging');
        draggedElement = null;
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }

    function handleDrop(e) {
        e.preventDefault();
        if (draggedElement && this !== draggedElement) {
            const allBlocks = [...puzzleBlocks];
            const draggedIndex = allBlocks.indexOf(draggedElement);
            const droppedIndex = allBlocks.indexOf(this);

            if (draggedIndex < droppedIndex) {
                this.parentNode.insertBefore(draggedElement, this.nextSibling);
            } else {
                this.parentNode.insertBefore(draggedElement, this);
            }
        }
    }

    function checkPuzzle() {
        const blocks = document.querySelectorAll('.puzzle-block');
        let correct = 0;

        blocks.forEach((block, index) => {
            const correctOrder = parseInt(block.dataset.order);
            if (index + 1 === correctOrder) {
                block.classList.add('correct');
                block.classList.remove('incorrect');
                correct++;
            } else {
                block.classList.add('incorrect');
                block.classList.remove('correct');
            }
        });

        const accuracy = Math.round((correct / blocks.length) * 100);
        showNotification(`Puzzle completed! Accuracy: ${accuracy}%`, accuracy === 100 ? 'success' : 'error');
    }

    function resetPuzzle() {
        const blocks = document.querySelectorAll('.puzzle-block');
        blocks.forEach(block => {
            block.classList.remove('correct', 'incorrect');
        });

        // Reset to original order
        const puzzleContainer = document.getElementById('puzzleBlocks');
        const sortedBlocks = Array.from(blocks).sort((a, b) => {
            return parseInt(a.dataset.order) - parseInt(b.dataset.order);
        });

        sortedBlocks.forEach(block => {
            puzzleContainer.appendChild(block);
        });
    }
}

// Quiz Game
function initializeQuizGame() {
    const quizQuestions = [
        {
            question: "What is the time complexity of Binary Search?",
            options: ["O(log n)", "O(n)", "O(n²)", "O(1)"],
            correct: 0
        },
        {
            question: "Which data structure uses LIFO principle?",
            options: ["Queue", "Stack", "Tree", "Graph"],
            correct: 1
        },
        {
            question: "What does REST stand for in REST API?",
            options: ["Remote State Transfer", "Representational State Transfer", "Resource State Transfer", "Request State Transfer"],
            correct: 1
        },
        {
            question: "Which design pattern is used for creating objects?",
            options: ["Observer", "Factory", "Singleton", "Strategy"],
            correct: 1
        },
        {
            question: "What is the primary purpose of Docker?",
            options: ["Version Control", "Containerization", "Database Management", "Load Balancing"],
            correct: 1
        }
    ];

    const quizQuestion = document.getElementById('quizQuestion');
    const quizOptions = document.getElementById('quizOptions');
    const quizResult = document.getElementById('quizResult');
    const nextBtn = document.getElementById('nextQuizBtn');

    let currentQuestionIndex = 0;
    let score = 0;

    if (nextBtn) {
        nextBtn.addEventListener('click', loadNextQuestion);
    }

    loadQuestion(0);

    function loadQuestion(index) {
        if (index >= quizQuestions.length) {
            showFinalResults();
            return;
        }

        const question = quizQuestions[index];
        quizQuestion.innerHTML = `<h4>${question.question}</h4>`;
        
        quizOptions.innerHTML = '';
        question.options.forEach((option, optionIndex) => {
            const button = document.createElement('button');
            button.className = 'quiz-option';
            button.textContent = option;
            button.dataset.correct = optionIndex === question.correct;
            button.addEventListener('click', () => selectAnswer(optionIndex));
            quizOptions.appendChild(button);
        });

        quizResult.textContent = '';
        quizResult.className = 'quiz-result';
        nextBtn.style.display = 'none';
    }

    function selectAnswer(selectedIndex) {
        const question = quizQuestions[currentQuestionIndex];
        const options = document.querySelectorAll('.quiz-option');
        
        options.forEach((option, index) => {
            option.disabled = true;
            if (index === question.correct) {
                option.classList.add('correct');
            } else if (index === selectedIndex && index !== question.correct) {
                option.classList.add('incorrect');
            }
        });

        if (selectedIndex === question.correct) {
            score++;
            quizResult.textContent = '✅ Correct!';
            quizResult.className = 'quiz-result correct';
        } else {
            quizResult.textContent = '❌ Incorrect!';
            quizResult.className = 'quiz-result incorrect';
        }

        nextBtn.style.display = 'inline-flex';
    }

    function loadNextQuestion() {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }

    function showFinalResults() {
        const percentage = Math.round((score / quizQuestions.length) * 100);
        quizQuestion.innerHTML = `<h4>Quiz Complete!</h4>`;
        quizOptions.innerHTML = '';
        quizResult.textContent = `You scored ${score}/${quizQuestions.length} (${percentage}%)`;
        quizResult.className = 'quiz-result ' + (percentage >= 70 ? 'correct' : 'incorrect');
        nextBtn.textContent = '🔄 Restart Quiz';
        nextBtn.onclick = restartQuiz;
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        nextBtn.textContent = '➡️ Next Question';
        nextBtn.onclick = loadNextQuestion;
        loadQuestion(0);
    }
}

console.log('🚀 Portfolio website loaded successfully!');
console.log('📧 Contact: raghunathan731@gmail.com');
console.log('📱 Phone: +91 9994763414');
console.log('💼 LinkedIn: linkedin.com/in/ragunathan-m'); 