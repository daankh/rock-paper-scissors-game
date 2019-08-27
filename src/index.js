// VARIABLES
const gameSumarry = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0
}

const game = {
    playerHand: null,
    aiHand: null
}

const hands = [...document.querySelectorAll('.select img')]

//FUNCTIONS
const handSelection = function () {
    //ustawia wybór gracza
    game.playerHand = this.dataset.option
    //reset bordera dla każdej opcji
    hands.forEach(hand => hand.style.boxShadow = "none")
    //border dla wybranej opcji
    this.style.boxShadow = '0 0 0 4px teal'
}

//Publikacja wyniku
const publishResult = function (player, ai, result) {
    document.querySelector('p.numbers span').textContent = ++gameSumarry.numbers;
    document.querySelector('[data-summary="your-choice"').textContent = player
    document.querySelector('[data-summary="ai-choice"').textContent = ai

    //Wersja SWITCH
    switch (result) {
        case "win":
            document.querySelector('p.wins span').textContent = ++gameSumarry.wins
            document.querySelector('[data-summary="who-win"').textContent = "Gracz"
            break;
        case "loss":
            document.querySelector('p.losses span').textContent = ++gameSumarry.losses
            document.querySelector('[data-summary="who-win"').textContent = "Computer"
            break;
        case "draw":
            document.querySelector('p.draws span').textContent = ++gameSumarry.draws
            document.querySelector('[data-summary="who-win"').textContent = "Remis"
            break;
    }
}

//Losowanie opcji komputera
const aiChoice = function () {
    return hands[Math.floor(Math.random() * hands.length)].dataset.option;
}

//Sprawdzanie wyniku
const checkResult = function (player, ai) {
    if (player === ai) {
        return "draw"
    } else if ((player === "papier" && ai === "kamień") || (player === "kamień" && ai === "nożyczki") || (player === "nożyczki" && ai === "papier")) {
        return "win"
    } else {
        return "loss"
    }
}

//Reset po turze
const endGame = function () {
    //Wybranie tylko tego elementu który był wybrany w danej turze
    document.querySelector(`img[data-option="${game.playerHand}"]`).style.boxShadow = "none"
    game.playerHand = null;
}

//Funkcja sterująca
const startGame = function () {
    if (!game.playerHand) {
        return alert("Wybierz dłoń") //Kończy działanie funkcji
    }
    //Losownaie wyboru komputera
    game.aiHand = aiChoice()
    const gameResult = checkResult(game.playerHand, game.aiHand)
    publishResult(game.playerHand, game.aiHand, gameResult)
    endGame()
}

//EVENTS
hands.forEach((hand) => hand.addEventListener('click', handSelection))
document.querySelector('button.start').addEventListener('click', startGame)