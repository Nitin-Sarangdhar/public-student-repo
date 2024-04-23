document.addEventListener("DOMContentLoaded", function() {
  const input = document.getElementById('searchInput');
  const text = document.getElementById('text');
  let originalText = text.textContent; // Store the original text content
  let timeoutId;

  input.addEventListener('input', handleInput);
  input.addEventListener('change', handleInput); // Add change event listener

  function handleInput() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(performSearch, 500); // Adjust the delay time as needed
  }

  function performSearch() {
    const searchText = input.value.trim();
    const regex = new RegExp(`\\b${searchText}\\b`, 'gi'); // Match only whole word
    
    console.log("Original Text:", text.innerHTML); // Log original text before highlighting

    // Clear previous highlighting
    text.innerHTML = originalText;

    // Highlight matching words
    text.innerHTML = text.innerHTML.replace(regex, match => `<span class="highlight">${match}</span>`);

    console.log("Highlighted Text:", text.innerHTML); // Log highlighted text after highlighting

    // Print the input value
    console.log("Search Text:", searchText);
  }
});
