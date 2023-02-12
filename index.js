import { getMoviesHtml, resizePlotElement, lineClampPlotText, handleReadMoreElement } from "./shared.js"

// get items from local and session storage
const watchlistData = JSON.parse(localStorage.getItem("watchlistArray"))
const sessionMovies = JSON.parse(sessionStorage.getItem("current movies"))

// localStorage.clear()   

let searchButtonEnabled = false

let imdbIdArray = []
let moviesArray = []
let watchlistArray = []

const placeholderContainerIndex = document.getElementById("placeholder-container-index")
const movieFeedContainer = document.getElementById("movie-feed-container")
const searchForm = document.getElementById("search-form")

// assign storage items to variables as appropriate

if(watchlistData){
    watchlistArray = watchlistData
}

if(sessionMovies && sessionMovies.length > 0){
    moviesArray = sessionMovies
    renderMovies()
}

// index page event listeners

searchForm.addEventListener("submit", getSearchResults)

document.addEventListener("keypress", (e) => {
    if(e.key === "Enter"){
        getSearchResults(e)
    }
})

document.getElementById("index-page-nav").addEventListener("click", () => {
    sessionStorage.setItem("current movies", JSON.stringify(moviesArray))
    window.location.href="watchlist.html";
})

document.addEventListener("click", (e) => {
    if(e.target.dataset.watchlistId){
        addToWatchlist(e.target.dataset.watchlistId)
    }
    else if(e.target.dataset.readMore){
        lineClampPlotText(e.target.dataset.readMore)
    }
})

document.addEventListener("focusin", (e) => {
    if(e.target.id === "movie-title-input"){
        searchForm.reset()
    }
})

window.addEventListener("resize", () => {
    resizePlotElement(moviesArray)
})

// index page functions

async function getSearchResults(e){
    e.preventDefault()

    imdbIdArray = []
    moviesArray = []

    const movieTitleInput = document.getElementById("movie-title-input")
    const movieTitle = movieTitleInput.value

    if(movieTitle !== ""){
        searchButtonEnabled = true
    }

    if(searchButtonEnabled){
        placeholderContainerIndex.classList.remove("hidden")
        movieFeedContainer.classList.add("hidden")
        placeholderContainerIndex.innerHTML = '<img class="loading-gif" src="images/loading.gif" >'

        const response = await fetch(`http://www.omdbapi.com/?s=${movieTitle}&apikey=8eeeb0ec`)
        const data = await response.json()

        const moviesList = data.Search

        if(moviesList){
            moviesList.forEach(movie => {
                imdbIdArray.push(movie.imdbID)
            })

            imdbIdArray.forEach(imbdId => {
                getEachMovie(imbdId)
            })
        }
        else{
            placeholderContainerIndex.textContent = "Unable to find what you are looking for. Please try again."
        }
    }
    searchButtonEnabled = false
}

async function getEachMovie(imbdId){
    const response = await fetch(`http://www.omdbapi.com/?i=${imbdId}&apikey=8eeeb0ec`)
    const data = await response.json()

    moviesArray.push({
        title: data.Title,
        rating: data.imdbRating,
        poster: data.Poster,
        runtime: data.Runtime,
        genre: data.Genre,
        imdbId: data.imdbID,
        plot: data.Plot,
    })

    if(moviesArray.length === imdbIdArray.length){
        renderMovies()
    }
}

function renderMovies(){
    placeholderContainerIndex.classList.add("hidden")
    movieFeedContainer.classList.remove("hidden")
    movieFeedContainer.innerHTML = getMoviesHtml(moviesArray, "icon_add.png", "add")
    
    handleReadMoreElement(moviesArray)
}

function addToWatchlist(id){
    const movieToWatch = moviesArray.filter(movie => {
        return movie.imdbId === id
    })[0]

    const matchingMovieArray = watchlistArray.filter(movie => {
        return movie.imdbId === movieToWatch.imdbId
    })

    if(matchingMovieArray.length === 0){
        document.getElementById(`watchlist-${id}`).textContent = "Added"
        setTimeout(() => {
            document.getElementById(`watchlist-${id}`).textContent = "Watchlist"
        }, 1000)
        watchlistArray.unshift(movieToWatch)

        localStorage.setItem("watchlistArray", JSON.stringify(watchlistArray))
    } 
}










