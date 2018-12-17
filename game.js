const gameSummary = {
    numbers: 0,
    win: 0,
    losses: 0,
    draws: 0,
}

const game = {
    playerHand: null,
    aiHand: null,
}

const hands = [...document.querySelectorAll('.select img')];

//Wybór gracza
const handSelection = function () {
    console.log(this.dataset.option);
    game.playerHand = this.dataset.option;
    hands.forEach(element => element.style.boxShadow = '');
    this.style.boxShadow = "0 0 0 4px yellowgreen";
}

hands.forEach(element => {
    element.addEventListener('click', handSelection);
});

const aiChoice = function () {
    const aiHand = hands[Math.floor(Math.random() * hands.length)]
        .dataset.option;
    return aiHand;
}

const checkResult = function (player, ai) {
    // console.log(player, ai);
    if (player === ai) {
        return 'draw';
    } else if (
        (player === "papier" && ai === "kamień") ||
        (player === "kamień" && ai === "nożyczki") ||
        (player === "nożyczki" && ai === "papier")) {
        return 'win';
    } else {
        return 'loss';
    }
}
//Publikacja wyniku

function publishResult(player, ai, result) {
    document.querySelector('[data-summary="your-choice"]').textContent = player;
    document.querySelector('[data-summary="ai-choice"]').textContent = ai;
    // document.querySelector('[data-summary="who-win"]').textContent = ai;

    document.querySelector('p.numbers span').textContent = ++gameSummary.numbers;
    if (result === "win") {
        document.querySelector('p.wins span').textContent = ++gameSummary.win;
        document.querySelector('[data-summary="who-win"]').textContent = 'Ty wygrales!!!';
        document.querySelector('[data-summary="who-win"]').style.color = "green";
    } else if (result === "loss") {
        document.querySelector('p.losses span').textContent = ++gameSummary.losses;
        document.querySelector('[data-summary="who-win"]').textContent = 'Komputer wygral :(';
        document.querySelector('[data-summary="who-win"]').style.color = "red";
    } else {
        document.querySelector('p.draws span').textContent = ++gameSummary.draws;
        document.querySelector('[data-summary="who-win"]').textContent = 'Remis :\\';
        document.querySelector('[data-summary="who-win"]').style.color = "gray";

    }
}

const endGame = function () {
    document.querySelector(`[data-option="${game.playerHand}"]`)
        .style.boxShadow = '';
    game.playerHand = null;
    game.aiHand = null;
}

// funkcja sterująca
const startGame = function () {
    if (!game.playerHand) {
        return alert("Wybierz dloń!")
    }
    game.aiHand = aiChoice();
    const gameResult = checkResult(game.playerHand, game.aiHand);
    console.log(gameResult);
    publishResult(game.playerHand, game.aiHand, gameResult);
    endGame()
}
document.querySelector('.start').addEventListener('click', startGame)