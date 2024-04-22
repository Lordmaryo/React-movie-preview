const apiKey = "078c567caf4a3e126bb54bf55e04a395";
const apiUrl = `https://api.themoviedb.org/3/discover/movie?
sort_by=popularity.desc&api_key=${apiKey}&page=1`;
const imagePath = "https://image.tmdb.org/t/p/w1280";
const searchUrl = `https://api.themoviedb.org/3/search/
movie?api_key=${apiKey}&query=`;
const form = document.getElementById("form");
const searchForm = document.getElementById("search-box");
const resultsContainer = document.getElementById("results");
const main = document.getElementById("main");
const skeletalLoader = document.querySelector(".skeletal-loader");

// get movies from api and display to front page
getMovies(apiUrl);

//get movies from api
async function getMovies(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      displayMovies(data.results);
    } else {
      displayMovieUnavailable();
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

// function for unavailable movies
function displayMovieUnavailable() {
  main.innerHTML = "<h2>Movie Unavailable!</h2>";
}

// display movies to UI
function displayMovies(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { title, overview, poster_path, vote_average } = movie;
    const movieCard = document.createElement("div");
    movieCard.classList.add("image-card");
    movieCard.innerHTML = `
        <img src="${imagePath + poster_path}" alt="${title}">
        <div class="movie-content">
            <div class="description">
                <h3>${title}</h3>
                <span style="color: ${displayClassByRating(vote_average)}">
                ${vote_average}
                </span>
            </div>    
                <div class="overview">
                    <p>${overview || "No Overview"}</p>
               </div>
        </div>"
        `;
    main.appendChild(movieCard);
  });
}

// display style color according to ratings
function displayClassByRating(rating) {
  if (rating <= 5) {
    return "red";
  } else if (rating >= 8) {
    return "#5ced73";
  } else {
    return "yellow";
  }
}

// event listner for search
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let searchValue = searchForm.value;
  if (searchValue !== "") {
    getMovies(searchUrl + searchValue);
    searchValue = "";
  } else {
    window.location.reload();
  }
});