// Function to add a new item to the list
function addItem() {
    // Get the value from the input field
    const input = document.getElementById('itemInput');
    const itemText = input.value;

    // Create a new list item element
    const newItem = document.createElement('li');
    newItem.textContent = itemText;

    // Create a remove button for the new item
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.onclick = function() {
        newItem.remove();
    };

    // Append the remove button to the new item
    newItem.appendChild(removeButton);

    // Append the new item to the list
    const list = document.getElementById('itemList');
    list.appendChild(newItem);

    // Clear the input field
    input.value = '';
}

// Add event listener to the add button
document.getElementById('addItemButton').addEventListener('click', addItem);

// Array to store quote objects
const quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },
    { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Motivation" },
    { text: "The only true wisdom is in knowing you know nothing.", category: "Wisdom" },
    { text: "The journey of a thousand miles begins with one step.", category: "Wisdom" }
];

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `"${randomQuote.text}" - ${randomQuote.category}`;
}

// Function to create the form for adding new quotes
function createAddQuoteForm() {
    const form = document.createElement('form');

    const quoteLabel = document.createElement('label');
    quoteLabel.textContent = 'Quote:';
    const quoteInput = document.createElement('input');
    quoteInput.type = 'text';
    quoteInput.id = 'newQuoteText';

    const categoryLabel = document.createElement('label');
    categoryLabel.textContent = 'Category:';
    const categoryInput = document.createElement('input');
    categoryInput.type = 'text';
    categoryInput.id = 'newQuoteCategory';

    const addButton = document.createElement('button');
    addButton.textContent = 'Add Quote';
    addButton.type = 'button';
    addButton.onclick = addQuote;

    form.appendChild(quoteLabel);
    form.appendChild(quoteInput);
    form.appendChild(categoryLabel);
    form.appendChild(categoryInput);
    form.appendChild(addButton);

    document.body.appendChild(form);
}

// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        alert('Quote added successfully!');
    } else {
        alert('Please enter both a quote and a category.');
    }
}

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    createAddQuoteForm();
    document.getElementById('showQuoteButton').addEventListener('click', showRandomQuote);
});