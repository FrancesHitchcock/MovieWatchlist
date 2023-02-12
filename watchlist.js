import { getMoviesHtml, resizePlotElement, lineClampPlotText, handleReadMoreElement } from "./shared.js"

const placeholderContainerWatchlist = document.getElementById("placeholder-container-watchlist")
const watchlistFeedContainer = document.getElementById("watchlist-feed-container")

// get watchlist from local storage

const watchlistData = JSON.parse(localStorage.getItem("watchlistArray"))

// watchlist page event listeners

document.getElementById("watchlist-page-nav").addEventListener("click", () => {
    window.location.href="index.html"
})

document.getElementById("go-to-movies-btn").addEventListener("click", () => {
    window.location.href="index.html"
})

document.addEventListener("click", (e) => {
    if(e.target.dataset.watchlistId){
        removeFromWatchlist(e.target.dataset.watchlistId)
    }
})

document.addEventListener("click", (e) => {
    if(e.target.dataset.readMore){
        lineClampPlotText(e.target.dataset.readMore)
    }
})

window.addEventListener("resize", () => {
    resizePlotElement(watchlistData)
})

// watchlist page functions

function renderWatchlist(){
    if(watchlistData && watchlistData.length > 0){
        placeholderContainerWatchlist.classList.add("hidden")
        watchlistFeedContainer.classList.remove("hidden")
        watchlistFeedContainer.innerHTML = getMoviesHtml(watchlistData, "icon_remove.png", "remove")

        handleReadMoreElement(watchlistData)
    }
    else{
        placeholderContainerWatchlist.classList.remove("hidden")
        watchlistFeedContainer.classList.add("hidden")
    }
    localStorage.setItem("watchlistArray", JSON.stringify(watchlistData))
}

function removeFromWatchlist(id){
    const movieToRemove = watchlistData.filter(movie => {
        return movie.imdbId === id
    })[0]

    watchlistData.splice(watchlistData.indexOf(movieToRemove), 1)

    localStorage.setItem("watchlistArray", JSON.stringify(watchlistData))
    renderWatchlist()
}

renderWatchlist()