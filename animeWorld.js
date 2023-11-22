document.addEventListener("DOMContentLoaded", () => {
  //event listener for search button
  const searchButton = document.getElementById("searchBtn");
  searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    const searchInput = document.getElementById("searchBar").value;
    fetchAnime(searchInput);
  });
  // function to search for inputed anime in the api and display the results
  function fetchAnime(searchValue) {
    if (searchValue.trim() === "") {
      // If empty, hide the displayResultContainer
      const displayResultContainer = document.getElementById(
        "displaySearchResult"
      );
      displayResultContainer.style.display = "none";
      return;
    }
    fetch(`https://api.jikan.moe/v4/anime?q=${searchValue}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const animes = data.data;
        const displayResultContainer = document.getElementById(
          "displaySearchResult"
        );

        if (animes.length > 0) {
          displayResultContainer.style.display = "block";
          displayResultContainer.innerHTML = " "; //add card elements

          animes.forEach((anime) => {
            const animeElement = displayAnimeResult(anime);
            displayResultContainer.appendChild(animeElement);
          });
        } else {
          alert("No results found");
          fetchAnimeDetailsFromDatabase();
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  //function to display searched anime results
  function displayAnimeResult(anime) {
    const displayResultContainer = document.getElementById(
      "displaySearchResult"
    );
    displayResultContainer.innerHTML = " ";
    //create anime card
    const animeElement = document.createElement("div");
    animeElement.classList.add("animeCardResult");
    //add information to the animeCard
    const imageElement = document.createElement("img");
    imageElement.src = anime.images.jpg.image_url;
    imageElement.alt = "Anime pic";
    animeElement.appendChild(imageElement);
    const description = document.createElement("p");
    description.textContent = `Description: ${anime.synopsis}`;
    animeElement.appendChild(description);


    //add more info card elements
    const infoElement = document.createElement("div");
    infoElement.classList.add("infoCard");
    const titleElement = document.createElement("h2");
    titleElement.textContent = anime.title;
    infoElement.appendChild(titleElement);
    const statusElement = document.createElement("p");
    statusElement.textContent = `Status: ${anime.status}`;
    infoElement.appendChild(statusElement);
    const episodesElement = document.createElement("p");
    episodesElement.textContent = `Episodes: ${anime.episodes}`;
    infoElement.appendChild(episodesElement);
    const ratedscore = document.createElement("p");
    ratedscore.textContent = `Rated score: ${anime.score}, scored by:${anime.scored_by}`;
    infoElement.appendChild(ratedscore);
    const durationElement = document.createElement("p");
    durationElement.textContent = `Duration: ${anime.duration}`;
    infoElement.appendChild(durationElement);
    const yearElement = document.createElement("p");
    yearElement.textContent = `Year: ${anime.year}`;
    infoElement.appendChild(yearElement);
    const airedElement = document.createElement("p");
    airedElement.textContent = `Aired from ${anime.aired.string}`;
    infoElement.appendChild(airedElement);
    const ratedElement = document.createElement("p");
    ratedElement.textContent = `Rated:${anime.rating}`;
    infoElement.appendChild(ratedElement);
    const genreElement = document.createElement("p");
    const genres = anime.genres;
    genres.forEach((genre) => {
      genreElement.textContent = `Genre: ${genre.name}`;
      infoElement.appendChild(genreElement);
    });
    const producersElement = document.createElement("p");
    const producers = anime.producers;
    producers.forEach((producer) => {
      producersElement.textContent = `Producers: ${producer.name}`;
      infoElement.appendChild(producersElement);
    });
    const backgroundElement = document.createElement("p");
    backgroundElement.textContent = `Backgound: ${anime.background}`;
    infoElement.appendChild(backgroundElement);
    //add the animeCard to the container
    displayResultContainer.appendChild(animeElement);
    displayResultContainer.appendChild(infoElement);
  }

  ///

  //fetching data from the api and create a list of them
  fetch("https://api.jikan.moe/v4/anime")
    .then((response) => response.json())
    .then((data) => {
      let animes = data.data; //array of anime data
      console.log(animes);
      animes.forEach((anime) => {
        const list = document.getElementById("animeList");
        const animeList = document.createElement("li");
        animeList.textContent = anime.title;
        list.appendChild(animeList);

        animeList.addEventListener("click", (e) => {
          e.preventDefault();
          displayCard(anime);
        });
      });
    })
    .catch((error) => {
      console.log("Error:", error);
    });

  //function to display anime cards in container with list
  function displayCard(anime) {
    const cardContainer = document.getElementById("animeContainer");
    //add card elements
    cardContainer.innerHTML = " "; // clear previous html
    const animeElement = document.createElement("div");
    animeElement.classList.add("animeCard");
    //add card elements and appending them
    const imageElement = document.createElement("img");
    imageElement.src = anime.images.jpg.image_url;
    imageElement.alt = "Anime pic";
    animeElement.appendChild(imageElement);
    const trailerElment = document.createElement("img");
    trailerElment.src = anime.trailer.embed_url;
    trailerElment.alt = "trailer pic";
    animeElement.appendChild(trailerElment);
    const titleElement = document.createElement("h2");
    titleElement.textContent = anime.title;
    animeElement.appendChild(titleElement);
    const statusElement = document.createElement("p");
    statusElement.textContent = `Status: ${anime.status}`;
    animeElement.appendChild(statusElement);
    const episodesElement = document.createElement("p");
    episodesElement.textContent = `Episodes: ${anime.episodes}`;
    animeElement.appendChild(episodesElement);
    const ratedscore = document.createElement("p");
    ratedscore.textContent = `Rated score: ${anime.score}, scored by:${anime.scored_by}`;
    animeElement.appendChild(ratedscore);
    const durationElement = document.createElement("p");
    durationElement.textContent = `Duration: ${anime.duration}`;
    animeElement.appendChild(durationElement);
    const yearElement = document.createElement("p");
    yearElement.textContent = `Year: ${anime.year}`;
    animeElement.appendChild(yearElement);
    const airedElement = document.createElement("p");
    airedElement.textContent = `Aired from ${anime.aired.string}`;
    animeElement.appendChild(airedElement);
    const ratingElement = document.createElement("p");
    ratingElement.textContent = `rated: ${anime.rating}`;
    animeElement.appendChild(ratingElement);
    const genreElement = document.createElement("p");
    const genres = anime.genres;
    genres.forEach((genre) => {
      genreElement.textContent = `Genre: ${genre.name}`;
      animeElement.appendChild(genreElement);
    });
    const producersElement = document.createElement("p");
    const producers = anime.producers;
    producers.forEach((producer) => {
      producersElement.textContent = `Producers: ${producer.name}`;
      animeElement.appendChild(producersElement);
    });
    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = `Description: ${anime.synopsis}`;
    animeElement.appendChild(descriptionElement);
    const backgroundElement = document.createElement("p");
    backgroundElement.textContent = `Backgound: ${anime.background}`;
    animeElement.appendChild(backgroundElement);

    const likeButton = document.createElement("button");
    likeButton.textContent = "Like";
    likeButton.classList.add("likeButton");
    animeElement.appendChild(likeButton);
    likeButton.addEventListener("click", (e) => {
      e.preventDefault();
      likeButton.style.backgroundColor = "royalblue";
      likeButton.textContent = "liked";
    });
    cardContainer.appendChild(animeElement);
  }
  //add event listener to the submit button
  const submitButton = document.getElementById("submitBtn");
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const commentInput = document.getElementById("comment");
    const comments = commentInput.value;
    postToDb(comments);
  });
  //function to post the inputed favorite anime
  function postToDb(comment) {
    fetch("https://animeworld-lgf0.onrender.com/Comment", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify([comment]),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Data added successfully", data);
      })
      .catch((error) => {
        alert("Error: Favorite Anime not added", error);
      });
  }

  function displayAnimeCards(anime) {
    const displayAnimeContainer = document.getElementById("displayCardsContainer");
    const animeElement = document.createElement("div");
    animeElement.classList.add("displayAnimeCards");

    const imageElement = document.createElement("img");
    imageElement.src = anime.images.jpg.image_url;
    imageElement.alt = "Anime pic";
    animeElement.appendChild(imageElement);
    const titleElement = document.createElement("h4");
    titleElement.textContent = anime.title;
    animeElement.appendChild(titleElement);

    animeElement.addEventListener("click", () => {
      // Handle click event for the anime card
      const displayResultContainer = document.getElementById("displaySearchResult");
      displayResultContainer.innerHTML = " "; // Clear previous html
      // Populate displaySearchResult container with details of the clicked anime
      const detailsElement = displayAnimeResult(anime);
      displayResultContainer.appendChild(detailsElement);
    });

    displayAnimeContainer.append(animeElement);
  }

  fetch("https://api.jikan.moe/v4/anime")
    .then((res) => res.json())
    .then((data) => {
      let animes = data.data;
      animes.forEach((anime) => {
        displayAnimeCards(anime)
      });
    })
    .catch((error) => {
      console.log("Error:", error);
  });

    
});
