const playerBoards = [ "Deserts", "Plains", "Swamps", "Lakes", "Forests", "Mountains", "Wastelands" ];
const factions = ["Blessed", "Felines", "Goblins", "Illusionists", "Inventors",
"Lizards", "Moles", "Monks", "Navigators", "Omar", "Philosophers", "Psychics"];
const innovations = Array.from({length: 18}, (_, i) => `Innovation ${i + 1} `); // an array with numbered object for the 18 Innovation tiles
const palaces = Array.from({length: 16}, (_, i) => `Palace ${i + 1}`);  // makes an array with an object for each numbered Palace, excluding the Special Palace which is either always or never included
const roundBonus = Array.from({length: 10}, (_, i) => `Round Bounus Tile ${i + 1} `); // an array with numbered object for the  10 Round Bonus Tiles
const bookActions = Array.from({length: 6}, (_, i) => `Book Action ${i + 1} `); // an array with numbered object for the 6 Book Aciton Tiles
const competency = Array.from({length: 12}, (_, i) => `Competency Tile ${i + 1} `); // an array with numbered object for the  12 different Competency Tiles
const roundScoring = Array.from({length: 12}, (_, i) => `Round Scoring Tile ${i + 1} `); // an array with numbered object for the 12 Round Scoring Tiles
const endScoring = Array.from({length: 4}, (_, i) => `End Scoring Tile ${i + 1} `); // an array with numbered object for the  4 Endgame Scoring Tiles

var minPlayers = 1;
var maxPlayers = 5;

function startRandomization() {
    const playerCount = parseInt(document.getElementById('playerCount').value);
    if (isNaN(playerCount) || playerCount < minPlayers || playerCount > maxPlayers){
        alert('Please under a valid number of player between ' + minPlayers + ' and ' + maxPlayers +'.' );  // gives an alert if the number is out of range or not a number
        return;
        }
        displayItems('playerBoards',shuffleTile(playerBoards.slice(0, playerCount +1 )));
        displayItems('factions', shuffleTile(factions.slice(0, playerCount + 1 )));
    }
    const display = document.getElementById('display');

function shuffleTile(tile){
    return tile.sort(() => Math.random() - 0.5);
}

function displayItems(title, items) {
    const display = document.getElementById('display');
    const section = document.createElement('div');
    section.innerHTML = `<h3>${title}</h3><p>${items.join(', ')}</p>`;
    display.appendChild(section);
}

