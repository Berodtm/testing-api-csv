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
}

// Call handleCSVData with processData as the callback
handleCSVData(processData);
