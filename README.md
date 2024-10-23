# Create your watchlist through this easy-to-use movie search engine via OMDB API 🌏

This project is deployed at the [link here.](https://moviewatchlistbymtdt.netlify.app/)

### Project Overview
- The movie site only consisted of two pages as of October 2024 - a search page (main) and a watchlist page.
- User could search for any movie and add their favourites to the watchlist page.
- These movies data is retrieved from the Open Movie Database API. 😉

### Screenshots

### Techstack
- HTML
- CSS
- Javascript
- Responsive Design
- API

### Challenges
- Challenge: to allow users to both add and remove movies (through the search page) and reflect in displaying the right icon
- Solution:
  - use Element.classList to flip the icon classes
  - use push() to add the specified movie data to the end of the watchlist array
  - use indexOf() to find the index of the movie to remove (from the watchlist)
  - remove the specified movie using splice()

```
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
            const indexToRemove = watchlist.indexOf(targetMovieObj)
            if (indexToRemove !== -1) {
                watchlist.splice(indexToRemove, 1)
            }
        }
        localStorage.setItem("watchlist", JSON.stringify(watchlist))
    }
})
```

## Resources
- [OMDB API](https://www.omdbapi.com/)
