/********************
  Quote Array
 ********************/

  let quotes = [
    {
        quote:'The greatest glory in living lies not in never falling, but in rising every time we fall.', source:'Nelson Mandela', citation:'Long walk to freedom', year:'1965'
    },
    {
        quote:'The way to get started is to quit talking and begin doin', source:'Walt Disney', citation:'Walt Disney made this statement in 1957 during an interview', year:'1957'
    },
    {
        quote:'our time is limited, so dont waste it living someone elses life. Dont be trapped by dogma – which is living with the results of other peoples thinking.', source:'Steve Jobs', citation:'commencement address at Stanford Uni.', year:'2005'
    },
    {
        quote:'The future belongs to those who believe in the beauty of their dreams.', source:'Eleanor Roosevelt', citation:'first appeared in print', year:'1978'
    },
    {
        quote:'If you look at what you have in life, you will always have more. If you look at what you dont have in life, you will never have enough', source:'Oprah Winfrey', citation:'beauty-dreams', year:'2018'
    },
    {
        quote:'If you set your goals ridiculously high and its a failure, you will fail above everyone elses success', source:'James Cameron', citation:'James Cameron', year:'1964'
    },
    {
        quote:'You may say I am a dreamer, but I am not the only one. I hope someday you will join us. And the world will live as one.', source:'John Lennon', citation:'John Lennons song Imagine', year:'1971'
    },
    {
        quote:'You must be the change you wish to see in the world', source:'Mahatma Gandhi', citation:'directly from his writings', year:'unknown'
    },
    {
        quote:'Spread love everywhere you go. Let no one ever come to you without leaving happier', source:'Mother Teresa', citation:'mission of spreading love and kindness.', year:'unknown'
    },
  
    
  ];

  /********************
 random quote
 ********************/

 function showRandomQuote () {
    let randomNum = Math.floor (Math.random()*quote.length);
    let randomQuote = quotes[randomNum];
    return randomQuote;
 }


/********************
  print quote
 ********************/

  function printQuote () {
    let randomQuote = showRandomQuote();
    let quoteBox = document.getElementById("quote-box");
    let html = `<p class="quote"> ${randomQuote.quote}</p>
                <p> class="source" ${randomQuote.source}</p>
                <span class="citation" ${randomQuote.citation}</span>
                `;
    if(randomQuote.year != 'unknown'){
        html += `<span class="year"> ${randomQuote.year}</span>`;
    }
    html += `</p>`;
    quoteBox.innerHTML = html;
    return document.body.style.backgroundColor.getColor();
  }