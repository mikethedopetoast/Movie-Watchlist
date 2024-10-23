const watchlistContainer = document.getElementById("watchlist-container")
let watchlistHtml = ""
let watchlistArray = JSON.parse(localStorage.getItem("watchlist") || [])

render()

// To display the returned results for watchlist
function render() {
    watchlistHtml = ""
    if(watchlistArray.length) {
        watchlistArray.forEach(movie => {
          renderWatchlist(movie)
        })
    } else {
        renderWatchlistNoResults()
    }
}

// To display movies results based on Watchlist
function renderWatchlist(movie) {
    let poster = movie.Poster == "N/A" ? "images/No_Image_Available.jpg" : movie.Poster
    
    watchlistContainer.innerHTML = watchlistHtml += `
    <div class="movie">
        <div class="poster-wrapper">
            <img class="movie-poster" src=${poster} alt="movie-poster" />
        </div>
        <div class="movie-body">
            <h2 class="movie-title">
                ${movie.Title}
                <span class="movie-rating">
                    <i class="fa-solid fa-star"></i>
                    ${movie.imdbRating}
                </span>
            </h2>
            <div class="movie-details">
                <p class="movie-runtime">${movie.Runtime}</p>
                <p class="movie-genre">${movie.Genre}</p>
                <div class="btn-wrapper">
                    <i class="fa-solid fa-circle-minus"></i>
                    <button class="add-remove-btn" data-id=${movie.imdbID}>
                        Remove
                    </button>
                </div>
            </div>
            <p class="movie-description">${movie.Plot}</p>
        </div>
    </div>
    <hr>
    `
}

// To display the following message when watchlist is empty
function renderWatchlistNoResults() {
    document.getElementById("watchlist-container").innerHTML = `
    <div class="body-wrapper">
    <h2 class="no-data">Your watchlist is looking a little empty 😭</h2>
    <a href="index.html">
    <i class="fa-solid fa-circle-plus"></i>
    Let's add some movies!
    </a>
    </div>
    `
}

// To remove movies from Watchlist
document.addEventListener("click", (e) => {
    if(e.target.dataset.id) {
        watchlistArray = watchlistArray.filter(movie => movie.imdbID !== e.target.dataset.id)
        localStorage.setItem("watchlist", JSON.stringify(watchlistArray))
        render()
    }
})