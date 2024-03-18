const playerBoards = [ "Deserts", "Plains", "Swamps", "Lakes", "Forests", "Mountains", "Wastelands" ];
const factions = ["Blessed", "Felines", "Goblins", "Illusionists", "Inventors",
"Lizards", "Moles", "Monks", "Navigators", "Omar", "Philosophers", "Psychics"];
const innovations = Array.from({length: 18}, (_, i) => `Innovation ${i + 1} `); // an array with numbered object for the 18 Innovation tiles
const palaces = Array.from({length: 16}, (_, i) => `Palace ${i + 1}`);  // makes an array with an object for each numbered Palace, excluding the Special Palace which is either always or never included
const roundBonus = Array.from({length: 10}, (_, i) => `Round Bonus Tile ${i + 1} `); // an array with numbered object for the  10 Round Bonus Tiles
const bookActions = Array.from({length: 6}, (_, i) => `Book Action ${i + 1} `); // an array with numbered object for the 6 Book Aciton Tiles
const competency = Array.from({length: 12}, (_, i) => `Competency Tile ${i + 1} `); // an array with numbered object for the  12 different Competency Tiles
const roundScoring = Array.from({length: 12}, (_, i) => `Round Scoring Tile ${i + 1} `); // an array with numbered object for the 12 Round Scoring Tiles
const endScoring = Array.from({length: 4}, (_, i) => `End Scoring Tile ${i + 1} `); // an array with numbered object for the  4 Endgame Scoring Tiles

var minPlayers = 2;
var maxPlayers = 5;

function getRandomSubset(array, n) { // Creates a shallow copy of the array and shuffles it
    let shuffledArray = [...array].sort(() => Math.random() - 0.5); 
    return shuffledArray.slice(0, n);  // Slices the first 'n' elements to get the subset
}

function startRandomization() {
    document.getElementById('display').innerHTML = ''; //clears the previous display
    const playerCount = parseInt(document.getElementById('playerCount').value);
    console.log('Generating a game for ' + playerCount +' players');  //logs a Randomization attempt and notes the player count
    if (isNaN(playerCount) || playerCount < minPlayers || playerCount > maxPlayers){
        alert('Please under a valid number of player between ' + minPlayers + ' and ' + maxPlayers +'.' );  // gives an alert if the number is out of range or not a number
        return;
        }
        displayItems('Player Boards', getRandomSubset(playerBoards, playerCount +1 ));
        displayItems('Factions', getRandomSubset(factions, playerCount + 1 ));
        displayItems('Innovation Tiles', getRandomSubset(innovations, 2 * (playerCount +1)));  // number of Innovation tiles uses a slight more complex formula
        displayItems('Palaces', getRandomSubset(palaces, playerCount + 1));
        displayItems('Round Bonuses', getRandomSubset(roundBonus, 6));
        displayItems('Book Actions', getRandomSubset(bookActions, 3));
        displayItems('Competency Tiles', getRandomSubset(competency, 12));
        displayItems('Round Scoring Tiles', getRandomSubset(roundScoring,6));
        displayItems('Endgame Scoring', getRandomSubset(endScoring, 1));
    }
    const display = document.getElementById('display');

// function shuffleTile(tile){
//     return tile.sort(() => Math.random() - 0.5);
// }

// function displayItems(title, items) {
//     const display = document.getElementById('display');
//     const section = document.createElement('div');
//     section.innerHTML = `<h3>${title}</h3><p>${items.join(', ')}</p>`;
//     display.appendChild(section);
// }

function displayItems(title, items) {
    const display = document.getElementById('display');
    const section = document.createElement('div');
    section.className = 'section-grid'; // Apply grid layout to each section
    section.innerHTML = `<h3>${title}</h3><div class='images-container'></div>`;

    const imagesContainer = section.querySelector('.images-container');

    items.forEach(item => {
        const imageName = item.toLowerCase().replace(/\s+/g, '_') + '.jpg';
        const imagePath = `img/${imageName}`;

        const itemContainer = document.createElement('div');
        itemContainer.className = 'item-container';

        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = item;
        img.className = 'game-component-image';
        img.onerror = function() {
            this.style.display = 'none'; // Hide if not found
            itemContainer.textContent = item; // Show text as fallback
        };

        itemContainer.appendChild(img);
        imagesContainer.appendChild(itemContainer);
    });

    display.appendChild(section);
}

