// js/games/quiz.js

const TICKLEBOX_QUIZES = {
    'pop-culture': [
        {
            question: "Which movie won the Oscar for Best Picture in 2020?",
            options: [
                "Parasite",
                "1917",
                "Joker",
                "Once Upon a Time in Hollywood"
            ],
            correct: 0,
            explanation: "Parasite made history as the first non-English language film to win Best Picture."
        },
        {
            question: "Who is known as the 'Queen of Pop'?",
            options: [
                "Madonna",
                "Beyoncé",
                "Lady Gaga",
                "Taylor Swift"
            ],
            correct: 0,
            explanation: "Madonna has held this title since the 1980s due to her influence and longevity."
        },
        {
            question: "Which streaming service released 'Stranger Things'?",
            options: [
                "Netflix",
                "Amazon Prime",
                "Disney+",
                "Hulu"
            ],
            correct: 0,
            explanation: "Stranger Things is a Netflix Original series that premiered in 2016."
        },
        {
            question: "What is the highest-grossing film of all time?",
            options: [
                "Avatar",
                "Avengers: Endgame",
                "Titanic",
                "Star Wars: The Force Awakens"
            ],
            correct: 1,
            explanation: "Avengers: Endgame surpassed Avatar in 2019 with $2.798 billion at the box office."
        },
        {
            question: "Which artist has the most Grammy Awards?",
            options: [
                "Beyoncé",
                "Quincy Jones",
                "Alison Krauss",
                "Georg Solti"
            ],
            correct: 3,
            explanation: "Georg Solti, a conductor, holds the record with 31 Grammy Awards."
        }
    ],
    'science': [
        {
            question: "What is the chemical symbol for gold?",
            options: ["Go", "Gd", "Au", "Ag"],
            correct: 2,
            explanation: "Au comes from the Latin word for gold, 'aurum'."
        },
        {
            question: "How many bones are in the human body?",
            options: ["206", "196", "216", "226"],
            correct: 0,
            explanation: "Adults have 206 bones, while babies are born with about 300."
        },
        {
            question: "What planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            correct: 1,
            explanation: "Mars appears red due to iron oxide (rust) on its surface."
        },
        {
            question: "What is the speed of light in vacuum?",
            options: [
                "299,792 km/s",
                "300,000 km/s",
                "299,792,458 m/s",
                "300,000,000 m/s"
            ],
            correct: 2,
            explanation: "The exact speed of light in vacuum is 299,792,458 meters per second."
        },
        {
            question: "What does DNA stand for?",
            options: [
                "Deoxyribonucleic Acid",
                "Deoxyribose Nucleic Acid",
                "Deoxyribose Nucleotide Acid",
                "Deoxyribonucleotide Acid"
            ],
            correct: 0,
            explanation: "DNA stands for Deoxyribonucleic Acid."
        }
    ]
    // Add more categories...
};

class TickleboxQuiz {
    constructor() {
        this.currentCategory = 'pop-culture';
        this.currentQuestion = 0;
        this.score = 0;
        this.quizData = [];
        this.selectedAnswers = [];
        
        this.init();
    }
    
    init() {
        this.loadQuiz(this.currentCategory);
        this.setupEventListeners();
    }
    
    loadQuiz(category) {
        this.currentCategory = category;
        this.currentQuestion = 0;
        this.score = 0;
        this.selectedAnswers = [];
        
        this.quizData = TICKLEBOX_QUIZES[category] || TICKLEBOX_QUIZES['pop-culture'];
        this.renderQuiz();
    }
    
    renderQuiz() {
        const container = document.getElementById('tickleboxQuizContainer');
        if (!container) return;
        
        const question = this.quizData[this.currentQuestion];
        
        container.innerHTML = `
            <div class="ticklebox-quiz-question">
                <div class="ticklebox-quiz-progress">
                    <div class="ticklebox-quiz-progress-bar" 
                         style="width: ${((this.currentQuestion + 1) / this.quizData.length) * 100}%">
                    </div>
                    <div class="ticklebox-quiz-progress-text">
                        Question ${this.currentQuestion + 1} of ${this.quizData.length}
                    </div>
                </div>
                
                <div class="ticklebox-quiz-question-text">
                    ${question.question}
                </div>
                
                <div class="ticklebox-quiz-options">
                    ${question.options.map((option, index) => `
                        <button class="ticklebox-quiz-option" 
                                data-index="${index}"
                                onclick="window.tickleboxQuiz.selectAnswer(${index})">
                            <span class="ticklebox-quiz-option-letter">
                                ${String.fromCharCode(65 + index)}
                            </span>
                            <span class="ticklebox-quiz-option-text">${option}</span>
                        </button>
                    `).join('')}
                </div>
                
                <div class="ticklebox-quiz-navigation">
                    ${this.currentQuestion > 0 ? `
                        <button class="ticklebox-quiz-prev" onclick="window.tickleboxQuiz.prevQuestion()">
                            ← Previous
                        </button>
                    ` : ''}
                    
                    <button class="ticklebox-quiz-next" 
                            onclick="window.tickleboxQuiz.nextQuestion()"
                            ${this.selectedAnswers[this.currentQuestion] === undefined ? 'disabled' : ''}>
                        ${this.currentQuestion === this.quizData.length - 1 ? 'Finish Quiz' : 'Next Question →'}
                    </button>
                </div>
            </div>
        `;
    }
    
    selectAnswer(answerIndex) {
        this.selectedAnswers[this.currentQuestion] = answerIndex;
        
        // Update UI
        const options = document.querySelectorAll('.ticklebox-quiz-option');
        options.forEach((option, index) => {
            option.classList.remove('selected', 'correct', 'wrong');
            
            if (index === answerIndex) {
                option.classList.add('selected');
            }
        });
        
        // Enable next button
        const nextBtn = document.querySelector('.ticklebox-quiz-next');
        if (nextBtn) nextBtn.disabled = false;
    }
    
    nextQuestion() {
        if (this.currentQuestion < this.quizData.length - 1) {
            this.currentQuestion++;
            this.renderQuiz();
            
            // Restore previously selected answer
            if (this.selectedAnswers[this.currentQuestion] !== undefined) {
                setTimeout(() => {
                    const option = document.querySelector(`.ticklebox-quiz-option[data-index="${this.selectedAnswers[this.currentQuestion]}"]`);
                    if (option) {
                        option.classList.add('selected');
                    }
                }, 100);
            }
        } else {
            this.finishQuiz();
        }
    }
    
    prevQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.renderQuiz();
            
            // Restore previously selected answer
            if (this.selectedAnswers[this.currentQuestion] !== undefined) {
                setTimeout(() => {
                    const option = document.querySelector(`.ticklebox-quiz-option[data-index="${this.selectedAnswers[this.currentQuestion]}"]`);
                    if (option) {
                        option.classList.add('selected');
                    }
                }, 100);
            }
        }
    }
    
    finishQuiz() {
        // Calculate score
        this.score = 0;
        this.selectedAnswers.forEach((answer, index) => {
            if (answer === this.quizData[index].correct) {
                this.score++;
            }
        });
        
        // Show results
        const container = document.getElementById('tickleboxQuizContainer');
        const resultsContainer = document.getElementById('tickleboxQuizResults');
        
        if (!container || !resultsContainer) return;
        
        const percentage = (this.score / this.quizData.length) * 100;
        let resultText = '';
        let resultEmoji = '';
        
        if (percentage >= 80) {
            resultText = 'Quiz Master!';
            resultEmoji = '🏆';
        } else if (percentage >= 60) {
            resultText = 'Great Job!';
            resultEmoji = '🎉';
        } else if (percentage >= 40) {
            resultText = 'Good Try!';
            resultEmoji = '👍';
        } else {
            resultText = 'Better Luck Next Time!';
            resultEmoji = '😊';
        }
        
        container.style.display = 'none';
        resultsContainer.style.display = 'block';
        resultsContainer.innerHTML = `
            <div class="ticklebox-quiz-result">
                <div class="ticklebox-quiz-result-emoji">${resultEmoji}</div>
                <h2 class="ticklebox-quiz-result-title">${resultText}</h2>
                <div class="ticklebox-quiz-result-score">
                    You scored ${this.score} out of ${this.quizData.length}
                </div>
                <div class="ticklebox-quiz-result-percentage">
                    ${percentage.toFixed(1)}%
                </div>
                <div class="ticklebox-quiz-result-details">
                    ${this.quizData.map((question, index) => {
                        const userAnswer = this.selectedAnswers[index];
                        const isCorrect = userAnswer === question.correct;
                        
                        return `
                            <div class="ticklebox-quiz-result-question ${isCorrect ? 'correct' : 'wrong'}">
                                <div class="ticklebox-quiz-result-question-text">
                                    Q${index + 1}: ${question.question}
                                </div>
                                <div class="ticklebox-quiz-result-answer">
                                    Your answer: ${question.options[userAnswer] || 'Not answered'}
                                </div>
                                ${!isCorrect ? `
                                    <div class="ticklebox-quiz-result-correct">
                                        Correct answer: ${question.options[question.correct]}
                                    </div>
                                ` : ''}
                                <div class="ticklebox-quiz-result-explanation">
                                    ${question.explanation}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
                <div class="ticklebox-quiz-result-actions">
                    <button class="ticklebox-btn-primary" onclick="window.tickleboxQuiz.restartQuiz()">
                        Play Again
                    </button>
                    <button class="ticklebox-btn-secondary" onclick="window.tickleboxQuiz.takeScreenshot()">
                        <svg viewBox="0 0 24 24" width="16" height="16">
                            <path fill="currentColor" d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"/>
                        </svg>
                        Share Result
                    </button>
                </div>
            </div>
        `;
        
        // Scroll to results
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }
    
    restartQuiz() {
        this.currentQuestion = 0;
        this.score = 0;
        this.selectedAnswers = [];
        
        const container = document.getElementById('tickleboxQuizContainer');
        const resultsContainer = document.getElementById('tickleboxQuizResults');
        
        if (container && resultsContainer) {
            container.style.display = 'block';
            resultsContainer.style.display = 'none';
            this.renderQuiz();
        }
    }
    
    takeScreenshot() {
        const resultsContainer = document.getElementById('tickleboxQuizResults');
        if (!resultsContainer) return;
        
        // Create screenshot preview
        const preview = document.getElementById('tickleboxScreenshotPreview');
        const resultContent = resultsContainer.querySelector('.ticklebox-quiz-result');
        
        if (preview && resultContent) {
            preview.innerHTML = `
                <div class="ticklebox-screenshot-content">
                    <div class="ticklebox-screenshot-header">
                        <div class="ticklebox-screenshot-logo">
                            <span class="ticklebox-logo-icon">🎮</span>
                            <span class="ticklebox-logo-text">TickleBox</span>
                        </div>
                        <div class="ticklebox-screenshot-title">Quiz Result</div>
                    </div>
                    ${resultContent.innerHTML}
                    <div class="ticklebox-screenshot-footer">
                        Play this quiz and more at ticklebox.com
                    </div>
                </div>
            `;
        }
        
        // Show modal
        const modal = document.getElementById('tickleboxScreenshotModal');
        if (modal) {
            modal.classList.add('show');
        }
    }
    
    setupEventListeners() {
        // Category selection
        document.querySelectorAll('.ticklebox-quiz-category').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.ticklebox-quiz-category').forEach(b => {
                    b.classList.remove('active');
                });
                btn.classList.add('active');
                
                const category = btn.getAttribute('data-category');
                this.loadQuiz(category);
            });
        });
        
        // Share button
        const shareBtn = document.getElementById('tickleboxQuizShare');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                const share = new TickleboxShare({
                    title: 'TickleBox - Interactive Quiz ',
                    text: `I just scored ${this.score}/${this.quizData.length} on TickleBox Quiz! Can you beat my score?`,
                    url: window.location.href
                });
                share.openModal();
            });
        }
        
        // Screenshot download
        const downloadBtn = document.getElementById('tickleboxScreenshotDownload');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                // Implement screenshot download functionality
                // This would require html2canvas or similar library
                console.log('Download screenshot');
            });
        }
        
        // Screenshot share
        const screenshotShareBtn = document.getElementById('tickleboxScreenshotShare');
        if (screenshotShareBtn) {
            screenshotShareBtn.addEventListener('click', () => {
                const share = new TickleboxShare({
                    title: 'My Quiz Result - TickleBox',
                    text: `Check out my quiz result on TickleBox!`,
                    url: window.location.href
                });
                share.openModal();
            });
        }
    }
}

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.tickleboxQuiz = new TickleboxQuiz();
});