const formEl = document.getElementById("form")
const searchInput = document.getElementById("search-input")
const moviesContainer = document.getElementById("movies-container")
let moviesHtml = ""
let moviesArray = []
let moviesDetailsArray = []
let watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]")

// To display search results or return no results when movies are not found in database
formEl.addEventListener("submit", (e) => {
    e.preventDefault()
    fetch(`https://www.omdbapi.com/?s=${searchInput.value}&type=movie&apikey=5e2a632d`)
        .then(res => res.json())
        .then(data => {
            moviesHtml = ""
            if(data.Response === "True") {
                moviesContainer.innerHTML = ""
                moviesArray = data.Search
                for (let movie of moviesArray) {
                    getMovieDetails(movie.imdbID)
                }
            } else {
                renderNoResults()
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error)
        })
})

// To get detailed information of each movie
function getMovieDetails(imdbID) {
    fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=5e2a632d`)
        .then(res => res.json())
        .then(data => {
            moviesDetailsArray.push(data)
            renderResults(data)
        })
        .catch(error => {
            console.error("Error fetching movie details:", error)
        })
}

// To display movies results based on search input
function renderResults(movie) {
    let poster = movie.Poster == "N/A" ? "images/No_Image_Available.jpg" : movie.Poster
    let circleIcon = watchlist.includes(movie.imdbID) ? "fa-circle-minus" : "fa-circle-plus"
    
    moviesContainer.innerHTML = moviesHtml += `
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
                    <i class="fa-solid ${circleIcon}"></i>
                    <button class="add-remove-btn" data-id=${movie.imdbID}>
                        Watchlist
                    </button>
                </div>
            </div>
            <p class="movie-description">${movie.Plot}</p>
        </div>
    </div>
    <hr>
    `
}

// To display the following message when search result is empty
function renderNoResults() {
    moviesContainer.innerHTML = `
    <div class="body-wrapper">
        <h2 class="no-data">
            Unable to find what you're looking for.<br>Please try another search.
        </h2>
    </div>
    `
}

// To add or remove movies to Watchlist
document.addEventListener("click", (e) => {
    if(e.target.dataset.id) {
        const targetMovieObj = moviesDetailsArray.filter(movie => movie.imdbID === e.target.dataset.id)[0]
        if (!watchlist.includes(targetMovieObj)) {
            e.target.previousElementSibling.classList.remove("fa-circle-plus")
            e.target.previousElementSibling.classList.add("fa-circle-minus")    
            watchlist.push(targetMovieObj)
        }
        else {
            e.target.previousElementSibling.classList.remove("fa-circle-minus")
            e.target.previousElementSibling.classList.add("fa-circle-plus")
            
            // Find the index of the movie to remove
            const indexToRemove = watchlist.indexOf(targetMovieObj)
            // Remove the movie using splice()
            if (indexToRemove !== -1) {
                watchlist.splice(indexToRemove, 1)
            }
        }
        localStorage.setItem("watchlist", JSON.stringify(watchlist))
    }
})