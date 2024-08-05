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
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote));
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
        saveQuotes();
        populateCategorySelect(); // Update the category dropdown
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        alert('Quote added successfully!');
    } else {
        alert('Please enter both a quote and a category.');
    }
}

// Function to load the last viewed quote from session storage
function loadLastViewedQuote() {
    const lastViewedQuote = sessionStorage.getItem('lastViewedQuote');
    if (lastViewedQuote) {
        const quote = JSON.parse(lastViewedQuote);
        const quoteDisplay = document.getElementById('quoteDisplay');
        quoteDisplay.innerHTML = `"${quote.text}" - ${quote.category}`;
    }
}

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    createAddQuoteForm();
    document.getElementById('showQuoteButton').addEventListener('click', showRandomQuote);
    document.getElementById('exportQuotesButton').addEventListener('click', exportQuotes);
    document.getElementById('fileInput').addEventListener('change', handleFileUpload);
    document.getElementById('categorySelect').addEventListener('change', filterQuotes);
    populateCategorySelect();
    loadLastViewedQuote();
});

// Function to load quotes from local storage
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    return storedQuotes ? JSON.parse(storedQuotes) : [];
}

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Array to store quote objects, initialized from local storage
const quote = loadQuotes();

// Function to export quotes to a JSON file
function exportQuotes() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Function to handle file upload and update quotes
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const uploadedQuotes = JSON.parse(e.target.result);
            quotes.push(...uploadedQuotes);
            saveQuotes();
            alert('Quotes uploaded successfully!');
        };
        reader.readAsText(file);
    }
}

// Function to display a random quote from the selected category
function showRandomQuote() {
    const categorySelect = document.getElementById('categorySelect');
    const selectedCategory = categorySelect.value;
    const filteredQuotes = quotes.filter(quote => quote.category === selectedCategory);
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];
    const quoteDisplay = document.getElementById('quoteDisplay');
    if (randomQuote) {
        quoteDisplay.innerHTML = `"${randomQuote.text}" - ${randomQuote.category}`;
        sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote));
    } else {
        quoteDisplay.innerHTML = 'No quotes available for this category.';
    }
}

// Function to populate the category dropdown
function populateCategorySelect() {
    const categorySelect = document.getElementById('categorySelect');
    categorySelect.innerHTML = ''; // Clear existing options
    const categories = [...new Set(quotes.map(quote => quote.category))];
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

// Function to filter quotes based on the selected category
function filterQuotes() {
    const categorySelect = document.getElementById('categorySelect');
    const selectedCategory = categorySelect.value;
    localStorage.setItem('lastSelectedCategory', selectedCategory); // Save the selected category to local storage
    const filteredQuotes = quotes.filter(quote => quote.category === selectedCategory);
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = ''; // Clear existing quotes
    filteredQuotes.forEach(quote => {
        const quoteElement = document.createElement('div');
        quoteElement.textContent = `"${quote.text}" - ${quote.category}`;
        quoteDisplay.appendChild(quoteElement);
    });
}

 // Restore the last selected category from local storage
 const lastSelectedCategory = localStorage.getItem('lastSelectedCategory');
 if (lastSelectedCategory) {
     categorySelect.value = lastSelectedCategory;
     filterQuotes(); // Update the displayed quotes based on the restored category
 }

