/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data

    for (const item of games) {

        // create a new div element, which will become the game card

        const gameCard = document.createElement("div");

        // add the class game-card to the list

        gameCard.classList.add("game-card");

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")

        // gameCard.innerHTML = `
        //     <h3> ${item.name} </h3>
        //     <p> Collected: ${item.pledged}/${item.goal} </p>
        //     <p> Supporters: ${item.backers} </p>
        //     <img src=${item.img}>
        // `;

        gameCard.innerHTML = `
            <img src=${item.img} class="game-img">
            <h3> ${item.name} </h3>
            <p> ${item.description} </p>
            <p> Backers: ${item.backers} </p>
        `;

        // append the game to the games-container

        gamesContainer.appendChild(gameCard);
    
    }

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers

const totalContributions = GAMES_JSON.reduce((total, game) => {
    return total + game.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas

contributionsCard.textContent = totalContributions.toLocaleString("en-US");

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalAmount = GAMES_JSON.reduce((total, game) => {
    return total + game.pledged;
}, 0);

// set inner HTML using template literal

raisedCard.textContent = "$" + totalAmount.toLocaleString("en-US");

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

gamesCard.textContent = GAMES_JSON.length;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal

    const unfundedGames = GAMES_JSON.filter((game) => {
        return game.pledged < game.goal;
    });

    // use the function we previously created to add the unfunded games to the DOM

    addGamesToPage(unfundedGames);

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal

    const fundedGames = GAMES_JSON.filter((game) => {
        return game.pledged >= game.goal;
    });

    // use the function we previously created to add unfunded games to the DOM

    addGamesToPage(fundedGames);

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM

    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games

const totalUnfundedGames = GAMES_JSON.reduce((total, game) => {
    if (game.pledged < game.goal) {
        return total + 1;
    } else {
        return total;
    }
}, 0);

// create a string that explains the number of unfunded games using the ternary operator

// const unfundedGamesMessage = `
//     A total of $${totalAmount.toLocaleString("en-US")} has been raised for ${GAMES_JSON.length} ${GAMES_JSON.length > 1 ? "games" : "game"}.
//     ${totalUnfundedGames > 0 ?
//     `Currently, ${totalUnfundedGames} ${totalUnfundedGames > 1 ? "games remain" : "game remains"} unfunded.
//     We need your help to fund ${totalUnfundedGames > 1 ? "these amazing games" : "this amazing game"}!` :
//     `Currently, all games have been funded successfully. Thank you so much for all your help and supporting game developers!`}
// `;

const unfundedGamesMessage1 = `A total of $${totalAmount.toLocaleString("en-US")} has been raised for ${GAMES_JSON.length} ${GAMES_JSON.length > 1 ? "games" : "game"}.`;
const unfundedGamesMessage2 = `Currently, ${totalUnfundedGames} ${totalUnfundedGames > 1 ? "games remain" : "game remains"} unfunded.`;
const unfundedGamesMessage3 = `We need your help to fund ${totalUnfundedGames > 1 ? "these amazing games" : "this amazing game"}!`;
const unfundedGamesMessage4 = `Currently, all games have been funded successfully. Thank you so much for all your help and supporting game developers!`;

const unfundedGamesMessage = `${unfundedGamesMessage1} ${totalUnfundedGames > 0 ? unfundedGamesMessage2 + " " + unfundedGamesMessage3 : unfundedGamesMessage4}`;

// create a new DOM element containing the template string and append it to the description container

const unfundedGamesParagraph = document.createElement("p");
unfundedGamesParagraph.textContent = unfundedGamesMessage;

descriptionContainer.appendChild(unfundedGamesParagraph);


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

const [firstGame, secondGame, remainingSortedGames] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element

const firstGameTitle = document.createElement("p");
firstGameTitle.textContent = firstGame.name;

firstGameContainer.appendChild(firstGameTitle);

// do the same for the runner up item

const secondGameTitle = document.createElement("p");
secondGameTitle.textContent = secondGame.name;

secondGameContainer.appendChild(secondGameTitle);
