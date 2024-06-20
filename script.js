let userScore = 0;
let compScore = 0;

let choices = document.querySelectorAll(".option");

const genCompChoice = () => {
    let number = Math.random();
    let compChoice;

    if (number < 1/3) {
        compChoice = "option-rock";
    }
    else if (number < 2/3) {
        compChoice = "option-paper";
    }
    else {
        compChoice = "option-scissor";
    }

    return compChoice;
}

const updateScore = () => {
    let playerBox = document.querySelector(".player-score");
    let compBox = document.querySelector(".computer-score");

    playerBox.innerHTML = userScore + "<br>" + "Player";
    compBox.innerHTML = compScore + "<br>" + "Computer";
}

const updateDecision = (result, userChoice, compChoice) => {
    let box = document.querySelector(".decision-box");
    let decisionText;

    if (result == -1) {
        decisionText = `Computer won! ${capitalize(compChoice.replace("option-", ""))} wins over ${userChoice.replace("option-", "")}`;
    }
    else if (result == 1) {
        decisionText = `Player won! ${capitalize(userChoice.replace("option-", ""))} wins over ${compChoice.replace("option-", "")}`;
    }
    else if (result == 0) {
        decisionText = "That was a tie.";
    }
    else {
        decisionText = "No Decision";
    }

    box.innerText = decisionText;
}

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const makeDecision = (userChoice, compChoice) => {
    let result;
    // 1: win 
    // 0: tie 
    // -1: loss
    if (userChoice === compChoice) {
        result = 0;
    }
    // user: rock
    else if (userChoice === "option-rock") {
        if (compChoice === "option-paper") {
            compScore++;
            result = -1;
        }
        else if (compChoice === "option-scissor") {
            userScore++;
            result = 1;
        }
    }
    // user: paper
    else if (userChoice === "option-paper") {
        if (compChoice === "option-rock") {
            userScore++;
            result = 1;
        }
        else if (compChoice === "option-scissor") {
            compScore++;
            result = -1;
        }
    }
    // user: scissor
    else if (userChoice === "option-scissor") {
        if (compChoice === "option-paper") {
            userScore++;
            result = 1;
        }
        else if (compChoice === "option-rock") {
            compScore++;
            result = -1;
        }
    }

    updateScore();
    updateDecision(result, userChoice, compChoice);
}

const playGame = (userChoice) => {
    console.log("user choice: ", userChoice);
    let compChoice = genCompChoice();
    console.log("comp choice: ", compChoice);

    makeDecision(userChoice, compChoice);
}

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        console.log("the choice is clicked...", userChoice);

        playGame(userChoice);
    })
})

document.querySelector("button").addEventListener("click", () => {
    userScore = 0;
    compScore = 0;

    updateScore();
    updateDecision(-2);
})

document.addEventListener("keydown", (e) => {
    let userChoice;
    if (e.key === "Enter") {
        userScore = 0;
        compScore = 0;

        updateScore();
        updateDecision(-2);
    } else if (e.key === "1") {
        userChoice = "option-rock";
    } else if (e.key === "2") {
        userChoice = "option-paper";
    } else if (e.key === "3") {
        userChoice = "option-scissor";
    } else {
        // alert("Invalid key! Press 1 for Rock, 2 for Paper, 3 for Scissors.");
        return;
    }

    if (userChoice) {
        playGame(userChoice);
    }
})
