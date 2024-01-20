const csvUrl = 'https://raw.githubusercontent.com/Berodtm/testing-api-csv/main/Pokedex_Ver_SV2.csv';

// Function to fetch CSV data
async function fetchCSV(url) {
    try {
      const response = await fetch(url);
      const data = await response.text();
      return data; // Return the data
    } catch (error) {
      console.error('Error fetching the CSV:', error);
      return null; // Return null in case of an error
    }
}

// Function to parse CSV data
function parseCSV(csvData) {
    // Split the data into lines
    const lines = csvData.split('\n');
    const headers = lines[0].split(',');

    const result = lines.slice(1).map(line => {
        const values = line.split(',');
        const obj = headers.reduce((accumulator, header, index) => {
            accumulator[header] = values[index];
            return accumulator;
        }, {});
        return obj;
    });

    return result;
}

let parsedDataGlobal = []; // Global variable to store the parsed data

// Function to handle CSV data and call a callback
async function handleCSVData(callback) {
    const csvData = await fetchCSV(csvUrl);
    if (csvData) {
        parsedDataGlobal = parseCSV(csvData);
        console.log(parsedDataGlobal);
        callback(); // Call the callback function
    }
}

// Callback function to process data
function processData() {
    let grassPokemonCount = 0;

    for (let pokee of parsedDataGlobal) {
        if (pokee.Type1 === 'Grass') { // Assuming 'Type1' is the correct property
            grassPokemonCount++;
        }
    }

    console.log('Count of Grass-type Pokémon: ' + grassPokemonCount);
    console.log(findMegaPokemon(parsedDataGlobal));
}

// Call handleCSVData with processData as the callback
handleCSVData(processData);

let bulbasaurTypePokemon = [];
const FindBulbasaurButton = document.getElementById("findBulbButton");
const FindBulbasaurOutput = document.getElementById('output');

function sortBulbasaurTypePokemon(pokemonList) {
    bulbasaurTypePokemon = [];
    for (let bulb of pokemonList) {
        if (bulb.Original_Name === "Bulbasaur") {
                bulbasaurTypePokemon.push(bulb.Name);
            }
    }
    bulbasaurTypePokemon.sort();
    FindBulbasaurOutput.innerText = bulbasaurTypePokemon;
    console.log(sortBulbasaurTypePokemon);
    return bulbasaurTypePokemon;
};

FindBulbasaurButton.addEventListener('click', () => {
    let sortedArray = sortBulbasaurTypePokemon(parsedDataGlobal);
    console.log(sortedArray); 
});

let monsterTypePokemon = [];
const findMonsterPokemonButton = document.getElementById('findMonsterButton');
const findMonsterPokemonOutput = document.getElementById("monsterOutput");

function findMonsterPokemonFunction(pokemonList) {
    monsterPokemonArray = [];
    for (let monster of pokemonList) {
        if (monster.Egg_Group1 === 'Monster') {
            monsterPokemonArray.push(monster.Name);
        }
    }
    monsterPokemonArray.sort();
    if (monsterPokemonArray.length > 1) {
        findMonsterPokemonOutput.innerText = "Monster Pokémon: " + monsterPokemonArray.slice(0, -1).join(', ') + ' and ' + monsterPokemonArray[monsterPokemonArray.length - 1];
    } else if (monsterPokemonArray.length === 1) {
        findMonsterPokemonOutput.innerText = "Monster Pokémon: " + monsterPokemonArray[0];
    } else {
        findMonsterPokemonOutput.innerText = "No Monster Pokémon found.";
    }
    
    // findMonsterPokemonOutput.innerText = monsterPokemonArray;
    console.log(monsterTypePokemon);
    return monsterPokemonArray;
}

findMonsterPokemonButton.addEventListener('click', () => {
    let sortedArray = findMonsterPokemonFunction(parsedDataGlobal);
    console.log(sortedArray);
})

const findMegaPokemon = (pokemonList) => {
    let megaPokemonArray = pokemonList.filter(pokemon => pokemon.Name && pokemon.Name.includes('Mega'));
    return megaPokemonArray;
}




// "My PS5 Collection: " + ps5Games.slice(0, -1).join(', ') + ' and ' + ps5Games[ps5Games.length - 1]