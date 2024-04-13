const inputNumber = document.getElementById('inputNumber');
const resultDiv = document.getElementById('result');

inputNumber.addEventListener('input', handleInput);

function handleInput() {
  const input = inputNumber.value.toString(); // Convert to string
  const reversedInput = input.split('').reverse().join('');

  if (input === reversedInput) {
    resultDiv.textContent = `${input} is a palindrome.`;
  } else {
    resultDiv.textContent = `${input} is not a palindrome.`;
  }
}
