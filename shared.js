function getMoviesHtml(arr, icon, altFragment){
    let moviesHtml = ""

    arr.forEach(movie => {

        // start by handling data item properties with "N/A" values
        let posterLink = ""
        let altText = ""
        let plotText = ""
        let runtimeText = ""

        if(movie.poster !== "N/A"){
            posterLink = movie.poster
            altText = `${movie.title} poster`
        }
    
        if(movie.plot !== "N/A"){
            plotText = movie.plot
        }

        if(movie.runtime !== "N/A"){
            runtimeText = movie.runtime
        }
        else{
            runtimeText = "- mins"
        }

        // the movie title container is included separately for mobile and large screens to accommodate different displays
        moviesHtml += `
            <div class="movie-container">
                <div class="movie-title-container small-screens">
                    <h3 class="movie-title">${movie.title}</h3>
                    <span class="star"><img class="star-img" src="images/icon_star.png" alt="star icon"></span>
                    <h6 class="rating">${movie.rating}</h6>
                </div>
                <div class="movie-img-container">
                    <img class="movie-img" src="${posterLink}" alt="${altText}">
                </div>
                <div class="movie-details-container">
                    <div class="movie-title-container big-screens">
                        <h3 class="movie-title">${movie.title}</h3>
                        <span class="star"><img class="star-img" src="images/icon_star.png" alt="star icon"></span>
                        <h6 class="rating">${movie.rating}</h6>
                    </div>
                    <div class="movie-data-container">
                        <h5 class="duration">${runtimeText}</h5>
                        <h5 class="genre">${movie.genre}</h5>
                        <button class="add-remove-button" data-watchlist-id="${movie.imdbId}">
                            <span class="watchlist-container"><img class="watchlist-icon" src="images/${icon}" alt="${altFragment} icon" data-watchlist-id="${movie.imdbId}"></span>
                            <span class="watchlist-text" data-watchlist-id="${movie.imdbId}" id="watchlist-${movie.imdbId}">Watchlist</span>
                        </button>
                    </div>
                    <div class="movie-blurb-container">
                        <span id="truncate-${movie.imdbId}" class="blurb three-lines">${plotText}</span>
                        <span id="read-more-${movie.imdbId}" class="read-more hidden" data-read-more="${movie.imdbId}">Read more</span>
                    </div>
                </div>
            </div>`
    })
    return moviesHtml
}

function resizePlotElement(arr){
    arr.forEach(movie => {
        let textEl = document.getElementById(`truncate-${movie.imdbId}`)
        let readMoreBtn = document.getElementById(`read-more-${movie.imdbId}`)

        readMoreBtn.classList.add("hidden")

        textEl.classList.add("three-lines")
        textEl.classList.remove("expanded")

        readMoreBtn.textContent = "Read more"

        if(textEl.scrollHeight > textEl.offsetHeight){
            readMoreBtn.classList.remove("hidden")
        }
    })
}

function lineClampPlotText(imdbId){
    let textEl = document.getElementById(`truncate-${imdbId}`)
    let readMoreBtn = document.getElementById(`read-more-${imdbId}`)

    textEl.classList.toggle("expanded")
    textEl.classList.toggle("three-lines")

    readMoreBtn.textContent = readMoreBtn.textContent === "Read more" ? "Read less" : "Read more"
}

function handleReadMoreElement(arr){
    arr.forEach(movie => {
        let textEl = document.getElementById(`truncate-${movie.imdbId}`)
        let readMoreBtn = document.getElementById(`read-more-${movie.imdbId}`)

        if(textEl.scrollHeight > textEl.offsetHeight){
            readMoreBtn.classList.remove("hidden")
        }
    })
}

export {getMoviesHtml, resizePlotElement, lineClampPlotText, handleReadMoreElement}