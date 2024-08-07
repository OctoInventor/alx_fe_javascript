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
        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        quotes.push(newQuote);
        saveQuotes();
        populateCategorySelect(newQuoteCategory); // Update the category dropdown if a new category is introduced
        postQuote(newQuote); // Post the new quote to JSONPlaceholder
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

// Function to populate the category dropdown
function populateCategorySelect(newCategory) {
    const categorySelect = document.getElementById('categorySelect');
    const existingOptions = Array.from(categorySelect.options).map(option => option.value);
    if (!existingOptions.includes(newCategory)) {
        const option = document.createElement('option');
        option.value = newCategory;
        option.textContent = newCategory;
        categorySelect.appendChild(option);
    }
}

// Function to filter quotes based on the selected category
function categoryFilter() {
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

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    createAddQuoteForm();
    document.getElementById('showQuoteButton').addEventListener('click', showRandomQuote);
    document.getElementById('exportQuotesButton').addEventListener('click', exportQuotes);
    document.getElementById('fileInput').addEventListener('change', handleFileUpload);
    document.getElementById('categorySelect').addEventListener('change', categoryFilter);
    document.getElementById('fetchQuotesButton').addEventListener('click', fetchQuotes);
    populateCategorySelect();
    loadLastViewedQuote();
    startPeriodicFetching(60000); // Fetch new quotes every 60 seconds

    // Restore the last selected category from local storage
    const lastSelectedCategory = localStorage.getItem('lastSelectedCategory');
    if (lastSelectedCategory) {
        document.getElementById('categorySelect').value = lastSelectedCategory;
        categoryFilter(); // Update the displayed quotes based on the restored category
    }
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
// const quotes = loadQuotes();

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

// Function to fetch quotes from JSONPlaceholder
async function fetchQuotes() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        // Assuming each post has a title as the quote text and body as the category
        const fetchedQuotes = data.map(post => ({
            text: post.title,
            category: post.body
        }));
        quotes.push(...fetchedQuotes);
        saveQuotes();
        populateCategorySelect();
        alert('Quotes fetched successfully!');
    } catch (error) {
        console.error('Error fetching quotes:', error);
        alert('Failed to fetch quotes.');
    }
}

// Function to post a new quote to JSONPlaceholder
async function postQuote(newQuote) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newQuote)
        });
        const data = await response.json();
        console.log('Posted quote:', data);
        alert('Quote posted successfully!');
    } catch (error) {
        console.error('Error posting quote:', error);
        alert('Failed to post quote.');
    }
}

// Function to periodically fetch new quotes
function startPeriodicFetching(interval) {
    setInterval(fetchQuotes, interval);
}

// Function to update local storage with new quotes
function updateLocalStorage(newQuotes) {
    const existingQuotes = loadQuotes();
    const updatedQuotes = [...existingQuotes, ...newQuotes];
    localStorage.setItem('quotes', JSON.stringify(updatedQuotes));
    return updatedQuotes;
}

// Function to periodically check for new quotes and update local storage
async function checkForNewQuotes() {
    const newQuotes = await fetchQuotes();
    if (newQuotes.length > 0) {
        const updatedQuotes = updateLocalStorageWithConflictResolution(newQuotes);
        quotes.length = 0; // Clear the existing quotes array
        quotes.push(...updatedQuotes); // Update the quotes array with new quotes
        populateCategories(); // Update the category dropdown
        showNotification('New quotes fetched and updated successfully!', 'success');
    }
}