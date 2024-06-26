const questions = [
    {
        question: "Yang manakah huruf setelah A",
        optionA: "C",
        optionB: "B",
        optionC: "Y",
        optionD: "P",
        correctOption: "optionB"
    },
    {
        question: "Yang manakah huruf sebelum F",
        optionA: "G",
        optionB: "L",
        optionC: "E",
        optionD: "M",
        correctOption: "optionC"
    },
    {
        question: "Yang manakah huruf sebelum P",
        optionA: "O",
        optionB: "Q",
        optionC: "R",
        optionD: "S",
        correctOption: "optionA"
    },
    {
        question: "Yang manakah huruf setelah X",
        optionA: "H",
        optionB: "E",
        optionC: "K",
        optionD: "Y",
        correctOption: "optionD"
    },
    {
        question: "Yang manakah huruf sebelum Z",
        optionA: "X",
        optionB: "Y",
        optionC: "G",
        optionD: "O",
        correctOption: "optionB"
    },
    {
        question: "Yang manakah huruf setelah H",
        optionA: "I",
        optionB: "L",
        optionC: "J",
        optionD: "O",
        correctOption: "optionA"
    },
    {
        question: "Yang manakah huruf setelah Z",
        optionA: "A",
        optionB: "L",
        optionC: "P",
        optionD: "semua salah",
        correctOption: "optionD"
    },
    {
        question: "Yang manakah huruf setelah J",
        optionA: "K",
        optionB: "F",
        optionC: "L",
        optionD: "M",
        correctOption: "optionA"
    },
    {
        question: "Yang manakah huruf sebelum W",
        optionA: "X",
        optionB: "Q",
        optionC: "V",
        optionD: "P",
        correctOption: "optionC"
    },
    {
        question: "Yang manakah huruf sebelum E",
        optionA: "G",
        optionB: "D",
        optionC: "P",
        optionD: "B",
        correctOption: "optionB"
    }
];

let shuffledQuestions = [];

function handleQuestions() {
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)];
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random);
        }
    }
}

let questionNumber = 1;
let playerScore = 0;
let wrongAttempt = 0;
let indexNumber = 0;

function NextQuestion(index) {
    handleQuestions();
    const currentQuestion = shuffledQuestions[index];
    document.getElementById("question-number").innerHTML = questionNumber;
    document.getElementById("player-score").innerHTML = playerScore;
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;
}

function checkforAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber];
    const currentQuestionAnswer = currentQuestion.correctOption;
    const options = document.getElementsByName("option");
    let correctOption = null;

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            correctOption = option.labels[0].id;
        }
    });

    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked === false) {
        document.getElementById('options-modal').style.display = "flex";
    } else {
        options.forEach((option) => {
            if (option.checked === true && option.value === currentQuestionAnswer) {
                document.getElementById(correctOption).style.backgroundColor = "green";
                playerScore++;
                indexNumber++;
                setTimeout(() => {
                    questionNumber++;
                }, 1000);
            } else if (option.checked && option.value !== currentQuestionAnswer) {
                const wrongLabelId = option.labels[0].id;
                document.getElementById(wrongLabelId).style.backgroundColor = "red";
                document.getElementById(correctOption).style.backgroundColor = "green";
                wrongAttempt++;
                indexNumber++;
                setTimeout(() => {
                    questionNumber++;
                }, 1000);
            }
        });
    }
}

function handleNextQuestion() {
    checkforAnswer();
    unCheckRadioButtons();

    setTimeout(() => {
        if (indexNumber <= 9) {
            NextQuestion(indexNumber);
        } else {
            handleEndGame();
        }
        resetOptionBackground();
    }, 1000);
}

function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = "";
    });
}

function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

function handleEndGame() {
    let remark = null;
    let remarkColor = null;

    if (playerScore <= 3) {
        remark = "Poor performance, keep practicing.";
        remarkColor = "red";
    } else if (playerScore >= 4 && playerScore < 7) {
        remark = "Average performance, you can do better.";
        remarkColor = "orange";
    } else if (playerScore >= 7) {
        remark = "Excellent, keep the good work going.";
        remarkColor = "green";
    }
    const playerGrade = (playerScore / 10) * 100;

    document.getElementById('remarks').innerHTML = remark;
    document.getElementById('remarks').style.color = remarkColor;
    document.getElementById('grade-percentage').innerHTML = playerGrade;
    document.getElementById('wrong-answers').innerHTML = wrongAttempt;
    document.getElementById('right-answers').innerHTML = playerScore;
    document.getElementById('score-modal').style.display = "flex";
}

function closeScoreModal() {
    questionNumber = 1;
    playerScore = 0;
    wrongAttempt = 0;
    indexNumber = 0;
    shuffledQuestions = [];
    NextQuestion(indexNumber);
    document.getElementById('score-modal').style.display = "none";
}

function closeOptionModal() {
    document.getElementById('options-modal').style.display = "none";
}
