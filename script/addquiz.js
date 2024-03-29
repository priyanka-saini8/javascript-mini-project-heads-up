let quizData;
let data = JSON.parse(localStorage.getItem('quizDataLocal'));
if (Array.isArray(data) && data.length > 0) {
    quizData = data;
} 
else {
    quizData = [
        {
            question: "What is the most used programming language in 2019?",
            a: "Java",
            b: "C",
            c: "Python",
            d: "JavaScript",
            correct: "d",
        },
        {
            question: "Who is the President of US?",
            a: "Florin Pop",
            b: "Donald Trump",
            c: "Ivan Saldano",
            d: "Mihai Andrei",
            correct: "b",
        },
        {
            question: "What does HTML stand for?",
            a: "Hypertext Markup Language",
            b: "Cascading Style Sheet",
            c: "Jason Object Notation",
            d: "Helicopters Terminals Motorboats Lamborginis",
            correct: "a",
        },
        {
            question: "What year was JavaScript launched?",
            a: "1996",
            b: "1995",
            c: "1994",
            d: "none of the above",
            correct: "b",
        }
    ];
}
const question = document.getElementById('addquestion');
const answerEls = document.querySelectorAll(".answer");
const optionA = document.getElementById('addanswera');
const optionB = document.getElementById('addanswerb');
const optionC = document.getElementById('addanswerc');
const optionD = document.getElementById('addanswerd');
const btnAdd = document.getElementById('addQ');

displayQuestionOnPanel();

btnAdd.addEventListener("click", () => {
    addQestion();
    displayQuestionOnPanel();
});

function addQestion() {
    let messageLabel = document.getElementById('message');
    if ((question.value == "") || (optionA.value == "") || (optionB.value == "") || (optionC.value == "") || (optionD.value == "") || (getSelected() == undefined)) {
        messageLabel.setAttribute("class", "error");
        messageLabel.innerHTML = "(&cross;) All fields are required";
    } else {
        messageLabel.setAttribute("class", "success");
        messageLabel.innerHTML = "(&check;) Question added";
        const questionData = {
            question: question.value,
            a: optionA.value,
            b: optionB.value,
            c: optionC.value,
            d: optionD.value,
            correct: getSelected()
        };
        quizData.push(questionData);
        deselectAnswers();
        emptyQuestionFields();
    }
}

function displayQuestionOnPanel() {
    const qpHeader = document.getElementById('qp-header');
    if (quizData.length == 0) {
        qpHeader.innerHTML = `<label class='question'>Question Panel</label><br>
                            <label>No question is added yet</label>`;
    } else {
        qpHeader.innerHTML = "<label class='question'>Question Panel</label>";
        for (let i = 0; i < quizData.length; i++) {
            const questionBox = document.createElement('div');
            questionBox.setAttribute("id", "display-question-box");
            questionBox.setAttribute("class", "display-question-box");
            qpHeader.appendChild(questionBox);

            const btnDelete = document.createElement('button');
            btnDelete.setAttribute("class", "delete");
            btnDelete.setAttribute("onclick", `deleteQuestion(${i})`);
            questionBox.appendChild(btnDelete);
            btnDelete.innerHTML = "Delete";

            const panelQuestion = document.createElement('label');
            panelQuestion.setAttribute("class", "question");
            questionBox.appendChild(panelQuestion);
            panelQuestion.innerHTML = `Q${i + 1} ${quizData[i].question}`;

            const allOptions = document.createElement('div');
            allOptions.setAttribute("id", "alloptions");
            questionBox.appendChild(allOptions);

            allOptions.innerHTML = `<label>(a) ${quizData[i].a} ${displayTickCross("a", quizData[i].correct)}</label><br>
                            <label>(b) ${quizData[i].b} ${displayTickCross("b", quizData[i].correct)}</label><br>
                            <label>(c) ${quizData[i].c} ${displayTickCross("c", quizData[i].correct)}</label><br>
                            <label>(d) ${quizData[i].d} ${displayTickCross("d", quizData[i].correct)}</label><br>`
        }

    }
    createQuizFile();
}


function getSelected() {
    let answer = undefined;

    answerEls.forEach((answerEl) => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

function deselectAnswers() {
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;
    });
}

function displayTickCross(check, answer) {
    if (check == answer) return "&check;";
    else return "";
}

function deleteQuestion(delIndex) {
    for (let i = 0; i < quizData.length; i++) {
        if (i == delIndex) 
            quizData.splice(i,1);
    }
    displayQuestionOnPanel();
}

function createQuizFile() {
    const quizDataJSON = JSON.stringify(quizData);
    localStorage.setItem("quizDataLocal", quizDataJSON);
}

function emptyQuestionFields() {
    question.value = "";
    optionA.value = "";
    optionB.value = "";
    optionC.value = "";
    optionD.value = "";
}

function moveToHome() {
    let text = "Are you sure to want to leave this page!";
    if (confirm(text) == true) {
        location.href='../index.html'
    }
}

