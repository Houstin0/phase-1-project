document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("searchBtn");
  const loadMoreButton = document.getElementById("loadMoreBtn");
  let currentPage = 1;
  const animeGrid = document.getElementById("animeGrid");
  const modal = document.getElementById("animeModal");
  const closeModalButton = document.querySelector(".close");
  const modalDetails = document.getElementById("modalDetails");
  const commentsList = document.getElementById("commentsList");
  let currentAnimeId = null;

  searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    const searchInput = document.getElementById("searchBar").value;
    fetchAnime(searchInput);
  });

  loadMoreButton.addEventListener("click", () => {
    fetchTopAnimes(++currentPage);
  });

  function fetchAnime(searchValue) {
    fetch(`https://api.jikan.moe/v4/anime?q=${searchValue}`)
      .then((response) => response.json())
      .then((data) => {
        const animes = data.data;
        displayAnimes(animes, true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function fetchTopAnimes(page) {
    fetch(`https://api.jikan.moe/v4/top/anime?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        const animes = data.data;
        displayAnimes(animes);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function displayAnimes(animes, reset = false) {
    if (reset) {
      animeGrid.innerHTML = "";
    }
    animes.forEach((anime) => {
      const animeCard = document.createElement("div");
      animeCard.classList.add("animeCard");
      animeCard.innerHTML = `
        <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
        <h3>${anime.title}</h3>
      `;
      animeCard.addEventListener("click", () => {
        openModal(anime.mal_id);
      });
      animeGrid.appendChild(animeCard);
    });
  }

  function openModal(animeId) {
    fetch(`https://api.jikan.moe/v4/anime/${animeId}`)
      .then((response) => response.json())
      .then((data) => {
        const anime = data.data;
        currentAnimeId = animeId;
        modalDetails.innerHTML = `
          <h2>${anime.title}</h2>
          <div class="modal-content">
            <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
            <div class="modal-text">
              <p>${anime.synopsis}</p>

            </div>
          </div>
                        <p>Status: ${anime.status}</p>
              <p>Episodes: ${anime.episodes}</p>
              <p>Rating: ${anime.score}</p>
        `;
        fetchComments(animeId);
        modal.style.display = "block";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  

  function closeModal() {
    modal.style.display = "none";
    currentAnimeId = null;
  }

  closeModalButton.addEventListener("click", closeModal);

  window.addEventListener("click", (event) => {
    if (event.target == modal) {
      closeModal();
    }
  });

  function fetchComments(animeId) {
    const comments = JSON.parse(localStorage.getItem(`anime-${animeId}-comments`)) || [];
    commentsList.innerHTML = comments.map(comment => `<p>${comment}</p>`).join('');
  }

  document.getElementById("submitCommentBtn").addEventListener("click", () => {
    const commentInput = document.getElementById("commentInput").value;
    if (commentInput && currentAnimeId) {
      let comments = JSON.parse(localStorage.getItem(`anime-${currentAnimeId}-comments`)) || [];
      comments.push(commentInput);
      localStorage.setItem(`anime-${currentAnimeId}-comments`, JSON.stringify(comments));
      fetchComments(currentAnimeId);
      document.getElementById("commentInput").value = '';
    }
  });


  fetchTopAnimes(currentPage);
});
