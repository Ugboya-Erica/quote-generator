const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')

let apiQuotes =[];

//Show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
//remove loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//show New quote
function newQuote(){
    loading()
    //pick a ransom quote from the API array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //check if author field is blank replace with "Anonymous"
    if(!quote.author){
        authorText.textContent = quote.author;
    }else{
    authorText.textContent = quote.author;
    }

    //check quote length

    if(quote.text.length > 70){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote')
    }
    //set quote and hide the loader

    quoteText.textContent = quote.text;
    complete();
}


//get quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
      const response = await fetch(apiUrl);
      apiQuotes = await response.json();
      newQuote();
    } catch (error) {
      // Catch Error Here
    }
}


//tweet quote

function tweetQuote(){
    const twitterUrl = https=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

//adding event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//onload
getQuotes()


/*async function getQuote(){
    const proxyUrl = 'https://cors-anywhere.herokuapp.com'
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        console.log(data)
    }catch(error){
        getQuote();
        console.log('No quote', error);
    }
}

getQuote();*/