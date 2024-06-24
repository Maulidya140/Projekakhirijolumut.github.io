const questions = [
    { image: 'picture/baju.png', correct: 'baju', options: ['baju', 'bisa', 'bola'] },
    { image: 'picture/bumi.png', correct: 'bumi', options: ['bumi', 'susu', 'kopi'] },
    { image: 'picture/cabe.png', correct: 'cabe', options: ['cuka', 'coba', 'cabe'] },
    { image: 'picture/susu.png', correct: 'susu', options: ['sapu', 'susu', 'keju'] },
    { image: 'picture/keju.png', correct: 'keju', options: ['meja', 'siku', 'keju'] },
    { image: 'picture/sapi.png', correct: 'sapi', options: ['sapi', 'kayu', 'siku'] },
    { image: 'picture/kopi.png', correct: 'kopi', options: ['gula', 'kopi', 'roti'] },
    { image: 'picture/roti.png', correct: 'roti', options: ['roti', 'topi', 'jari'] },
    { image: 'picture/tahu.png', correct: 'tahu', options: ['kuku', 'bahu', 'tahu'] },
    { image: 'picture/meja.png', correct: 'meja', options: ['meja', 'kuda', 'rusa'] }
];

let currentQuestionIndex = 0;
let score = 0;

function showQuestion(index) {
    const question = questions[index];
    const questionImage = document.getElementById('question-image');
    const optionsContainer = document.querySelector('.options');
    
    questionImage.src = question.image;
    questionImage.alt = question.correct;
    
    optionsContainer.innerHTML = '';
    question.options.forEach(option => {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('option');
        optionDiv.textContent = option;
        optionDiv.setAttribute('data-answer', option.toLowerCase());
        optionsContainer.appendChild(optionDiv);
    });
    
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.addEventListener('click', checkAnswer);
    });
}

function checkAnswer(event) {
    const selectedAnswer = event.target.getAttribute('data-answer');
    const correctAnswer = questions[currentQuestionIndex].correct;
    
    if (selectedAnswer === correctAnswer) {
        score++;
        showFeedback(true);
        updateScore(true);
    } else {
        showFeedback(false);
        updateScore(false);
    }
    
    currentQuestionIndex++;
    setTimeout(() => {
        if (currentQuestionIndex < questions.length) {
            showQuestion(currentQuestionIndex);
        } else {
            showFinalScore();
        }
    }, 1000);
}

function showFeedback(correct) {
    const feedbackDiv = document.createElement('div');
    feedbackDiv.id = 'feedback';
    if (correct) {
        feedbackDiv.textContent = '✔';
        feedbackDiv.classList.add('correct');
    } else {
        feedbackDiv.textContent = '✘';
        feedbackDiv.classList.add('incorrect');
    }
    document.querySelector('.container').appendChild(feedbackDiv);
    setTimeout(() => {
        feedbackDiv.remove();
    }, 1000);
}

function updateScore(correct) {
    const scoreDiv = document.getElementById('score');
    scoreDiv.textContent = `Score : ${score}`;
    
    if (correct) {
        scoreDiv.classList.add('pop');
        setTimeout(() => {
            scoreDiv.classList.remove('pop');
        }, 500);
    }
}

function showFinalScore() {
    const finalScoreDiv = document.getElementById('final-score');
    const finalScoreText = document.getElementById('final-score-text');
    const scoreStarsDiv = document.getElementById('score-stars');
    
    finalScoreText.textContent = `Kuis selesai! Skor akhir Anda adalah : ${score} dari ${questions.length}`;
    
    // Menghapus bintang yang ada
    while (scoreStarsDiv.firstChild) {
        scoreStarsDiv.removeChild(scoreStarsDiv.firstChild);
    }
    
    // Menambahkan bintang berdasarkan nilai skor
    for (let i = 0; i < score; i++) {
        const star = document.createElement('span');
        star.textContent = '★'; // Karakter Unicode untuk bintang
        star.classList.add('star');
        scoreStarsDiv.appendChild(star);
    }
    
    finalScoreDiv.classList.remove('hidden');
    document.querySelector('.question').classList.add('hidden');
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.querySelector('.question').classList.remove('hidden');
    document.getElementById('final-score').classList.add('hidden');
    updateScore(false);
    showQuestion(currentQuestionIndex);
}

document.addEventListener('DOMContentLoaded', () => {
    showQuestion(currentQuestionIndex);
    document.getElementById('restart-button').addEventListener('click', restartQuiz);
});
