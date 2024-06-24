const questions = [
    {
        answer: "KERETA",
        images: [
            {letter: "U", src: "picture/kereta.png"}
        ]
    },
    {
        answer: "KAMERA",
        images: [
            {letter: "A", src: "picture/kamera.png"}
        ]
    },
    {
        answer: "KELAPA",
        images: [
            {letter: "A", src: "picture/kelapa.png"}
        ]
    },
    {
        answer: "PEPAYA",
        images: [
            {letter: "I", src: "picture/pepaya.png"}
        ]
    },
    {
        answer: "GURITA",
        images: [
            {letter: "U", src: "picture/gurita.png"}
        ]
    }
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;

window.onload = function() {
    loadQuestion(currentQuestionIndex);
};

function loadQuestion(index) {
    const question = questions[index];
    shuffleArray(question.images);
    const imagesContainer = document.getElementById('images');
    imagesContainer.innerHTML = '';
    question.images.forEach(image => {
        const img = document.createElement('img');
        img.src = image.src;
        img.className = 'image';
        img.setAttribute('data-letter', image.letter);
        imagesContainer.appendChild(img);
    });
    document.getElementById('answer').value = '';
    document.getElementById('feedback').textContent = '';
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function checkAnswer() {
    const userAnswer = document.getElementById('answer').value.toUpperCase();
    const feedback = document.getElementById('feedback');
    if (userAnswer === questions[currentQuestionIndex].answer) {
        feedback.textContent = "Jawaban benar!";
        feedback.style.color = "green";
        correctAnswers++;
    } else {
        feedback.textContent = "Jawaban salah.";
        feedback.style.color = "red";
        incorrectAnswers++;
    }
    updateScore();
    setTimeout(nextQuestion, 1000); // Delay pindah ke soal berikutnya selama 1 detik

}

function updateScore() {
    document.getElementById('correct-answers').textContent = correctAnswers;
    document.getElementById('incorrect-answers').textContent = incorrectAnswers;
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    } else {
        showFinalScore();
    }
}

function showFinalScore() {
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('score-container').style.display = 'block';
}

function restartQuiz() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    loadQuestion(currentQuestionIndex);
    updateScore();

    document.getElementById('score-container').style.display = 'none';
    document.getElementById('question-container').style.display = 'block';  // Tampilkan elemen pertanyaan lagi
}