const playerBoards = [ "Deserts", "Plains", "Swamps", "Lakes", "Forests", "Mountains", "Wastelands" ];
const factions = ["Blessed", "Felines", "Goblins", "Illusionists", "Inventors",
"Lizards", "Moles", "Monks", "Navigators", "Omar", "Philosophers", "Psychics"];
const innovations =["Architecture", "Census", "Colleges", "Communications", "Deus Ex Machina", "Guild","League of Cities", "Library", "Monument", "Palace", "Professors", "School",
"Sewerage", "Steam Power", "Steel", "Trading Routes", "University", "Workshop"]; // an array with named objects for the 18 Innovation tiles
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
    
    const firstPlayerIndex = Math.floor(Math.random() * playerCount) + 1;  // Randomly picks the first player

  
    const setupText = `Game setup for ${playerCount} players. Player ${firstPlayerIndex} goes first.`;


    let setupInfo = document.getElementById('setup-info');
    if (!setupInfo) {
        setupInfo = document.createElement('div');
        setupInfo.id = 'setup-info';
        document.getElementById('display').insertBefore(setupInfo, document.getElementById('display').firstChild); // displays the text of player count and start player
    }
    setupInfo.textContent = setupText;
        displayItems('Player Boards', getRandomSubset(playerBoards, playerCount +1 ));
        displayItems('Factions', getRandomSubset(factions, playerCount + 1 ), 3);
        displayItems('Innovation Tiles', getRandomSubset(innovations, 2 * (playerCount +1)), 5);  // number of Innovation tiles uses a slight more complex formula
        displayItems('Competency Tiles', getRandomSubset(competency, 12));
        displayItems('Palaces', getRandomSubset(palaces, playerCount + 1));
        displayItems('Round Bonuses', getRandomSubset(roundBonus, 6));
        displayItems('Book Actions', getRandomSubset(bookActions, 3));
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

function displayItems(title, items, columns = 4) {
    const display = document.getElementById('display');
    const section = document.createElement('div');
    section.className = 'section-grid'; // Apply grid layout to each section
    section.innerHTML = `<h3>${title}</h3><div class='images-container'></div>`;

    const imagesContainer = section.querySelector('.images-container');

    var offset = false; // a variable to check if there should be an offset

    if (columns == 3){
        imagesContainer.classList.add('three-columns');
    } else if (columns == 5 && items.length % 4 === 2){
        offset = true;
        console.log(offset);
        imagesContainer.classList.add('four-columns');
    }
    else {
        imagesContainer.classList.add('four-columns');
    }
    var backgroundColors = [];
    if ((title === "Innovation Tiles") || (title === "Competency Tiles")){
        backgroundColors = ['#F4D03F' , '#3498DB', '#935116', '#B3B6B7' ];
        backgroundColors.reverse();
    }
    items.forEach((item, index) => {
        const imageName = item.toLowerCase().replace(/\s+/g, '') + '.jpg';
        const imagePath = `img/${imageName}`;

        const itemContainer = document.createElement('div');
        itemContainer.className = 'item-container';
    
        if ( offset == true){
            if ( index <2){
                itemContainer.style.gridColumn = 'span 2';  // puts the items offset if applicaable
                itemContainer.classList.add('spanned-item');  //resizes them to the same size as the rest as span defaults to them being bigger
            }
            else {itemContainer.classList.add('four-columns');}
        
        }
        if (backgroundColors){
            var reverseIndex = items.length - 1 - index;
            var colorIndex = reverseIndex % backgroundColors.length;
            if (title === "Innovation Tiles" && index <2){
                // Calculate which colors to blend based on index
            const color1 = backgroundColors[colorIndex + 2 - index];  // picks the right blend for the offsets
            const color2 = backgroundColors[colorIndex + 1 - index];

            // Apply a linear gradient background combining two colors
            itemContainer.style.background = `linear-gradient(to right, ${color1} 50%, ${color2} 50%)`;
        } else {
            
            itemContainer.style.backgroundColor = backgroundColors[ colorIndex]
        }
    }
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

