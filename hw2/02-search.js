    document.addEventListener('DOMContentLoaded', function() {
      const userInput = document.getElementById('userInput');
      const outputDiv = document.getElementById('output');
      const searchButton = document.getElementById('searchButton');
      console.log('Characters:', characters);
      if (searchButton) { 
        console.log('Search Button:', searchButton);
        searchButton.addEventListener('click', handleClick);
      } else {
        console.log('Search Button not found.');
      }

      function handleClick() {
        const searchValue = userInput.value.trim();
        console.log('User input:', searchValue); // Log user input

        if (searchValue === '') {
          outputDiv.textContent = 'Please enter a name to search.';
          return;
        }

        const matchedCharacters = characters.filter(character =>
          character.name.includes(searchValue)
        );


        if (matchedCharacters.length > 0) {
          // Format the output as boxes with highlighted search word
          const output = matchedCharacters.map(character => {
            const highlightedName = character.name.replace(new RegExp(searchValue, 'g'), (match) => `<span class="highlight">${match}</span>`);
            return `<div class="character-box">
                      <div>${highlightedName}</div>
                      <div>${character.birth_year}</div>
                    </div>`;
          }).join('');
          outputDiv.innerHTML = output;
        } else {
          outputDiv.textContent = 'No matching characters found.';
        }
      }
    });
