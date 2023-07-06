document.addEventListener("DOMContentLoaded",()=>{
//event listener for search button
const searchButton=document.getElementById("searchBtn")
searchButton.addEventListener('click',(e)=>{
 e.preventDefault();
 const searchInput=document.getElementById("searchBar").value;
 fetchAnime(searchInput)

})
// function to search for inputed anime in the api and display the results
function fetchAnime(searchValue) {
  fetch(`https://api.jikan.moe/v4/anime?q=${searchValue}`,{
      method: 'GET'
  })
  .then(response => response.json())
  .then(data=>{
   const animes=data.data
     if(animes.length>0){
     const displayResultContainer=document.getElementById("displaySearchResult")
     displayResultContainer.innerHTML=" "//add card elements
     animes.forEach(anime=>{
      const animeElement=displayAnimeResult(anime)
      displayResultContainer.appendChild(animeElement)
     })
     }else{
      console.log ("No results found");
     }
  })
  .catch(error=>{
      console.log("Error:",error);
  })
}
//function to display searched anime results
function displayAnimeResult(anime){
  const displayResultContainer=document.getElementById("displaySearchResult")
  displayResultContainer.innerHTML=" "//clear the previous content
  //create anime card
    const animeElement=document.createElement("div")
    animeElement.classList.add("animeCardResult")
  //add information to the animeCard
    const imageElement=document.createElement("img")
    imageElement.src=anime.images.jpg.image_url
    imageElement.alt="Anime pic"
    animeElement.appendChild(imageElement)
    const description=document.createElement('p')
    description.textContent=`Description: ${anime.synopsis}`
    animeElement.appendChild(description) 

    const infoElement=document.createElement("div")
    infoElement.classList.add("infoCard")
//add card elements
    const titleElement=document.createElement('h3')
    titleElement.textContent=anime.title_english
    infoElement.appendChild(titleElement)
    const statusElement=document.createElement("p")
    statusElement.textContent=`Status: ${anime.status}`
    infoElement.appendChild(statusElement)
    const episodesElement=document.createElement('p')
    episodesElement.textContent=`Episodes: ${anime.episodes}` 
    infoElement.appendChild(episodesElement)
    const ratedscore=document.createElement("p")
    ratedscore.textContent=`Rated score: ${anime.score}, scored by:${anime.scored_by}`
    infoElement.appendChild(ratedscore)
    const durationElement=document.createElement("p")
    durationElement.textContent=`Duration: ${anime.duration}`
    infoElement.appendChild(durationElement)
    const yearElement=document.createElement("p")
    yearElement.textContent=`Year: ${anime.year}`
    infoElement.appendChild(yearElement)
    const airedElement=document.createElement("p")
    airedElement.textContent=`Aired from ${anime.aired.string}`
    infoElement.appendChild(airedElement)
    const ratedElement=document.createElement("p")
    ratedElement.textContent=`Rated:${anime.rating}`
    infoElement.appendChild(ratedElement)
    const genreElement=document.createElement("p")
    const genres=anime.genres
    genres.forEach(genre=>{
      genreElement.textContent=`Genre: ${genre.name}`
      infoElement.appendChild(genreElement)
    })
    const producersElement=document.createElement("p")
    const producers=anime.producers
    producers.forEach(producer=>{
      producersElement.textContent=`Producers: ${producer.name}`
      infoElement.appendChild(producersElement)
    })
    const backgroundElement=document.createElement("p")
    backgroundElement.textContent=`Backgound: ${anime.background}`
    infoElement.appendChild(backgroundElement)
  //add the animeCard to the container
    displayResultContainer.appendChild(animeElement)
    displayResultContainer.appendChild(infoElement)
}
//fetching data from the api and create a list of them
 fetch("https://api.jikan.moe/v4/anime")
 .then((response) => response.json())
 .then((data) => {
   let animes=data.data //array of anime data
   console.log(animes);
  animes.forEach(anime=>{
    const list=document.getElementById("animeList")
    const animeList=document.createElement('li')
    animeList.textContent=anime.title
    list.appendChild(animeList)

    animeList.addEventListener("click",(e)=>{
      e.preventDefault()
      displayCard(anime)
    })
  })
  })

.catch((error) => {
    
    console.error("Error:", error);
    
  });

 //function to display anime cards in container with list
 function displayCard(anime) {
    const cardContainer=document.getElementById("animeContainer")
    //add card elements
    cardContainer.innerHTML=" "
  
      const animeElement=document.createElement("div")
      animeElement.classList.add("animeCard")
    //add card elements
      const imageElement=document.createElement("img")
      imageElement.src=anime.images.jpg.image_url
      imageElement.alt="Anime pic"
      animeElement.appendChild(imageElement)
      const titleElement=document.createElement('h3')
      titleElement.textContent=anime.title
      animeElement.appendChild(titleElement)
      const statusElement=document.createElement("p")
      statusElement.textContent=`Status: ${anime.status}`
      animeElement.appendChild(statusElement)
      const episodesElement=document.createElement('p')
      episodesElement.textContent=`Episodes: ${anime.episodes}` 
      animeElement.appendChild(episodesElement)
      const ratedscore=document.createElement("p")
      ratedscore.textContent=`Rated score: ${anime.score}, scored by:${anime.scored_by}`
      animeElement.appendChild(ratedscore)
      const durationElement=document.createElement("p")
      durationElement.textContent=`Duration: ${anime.duration}`
      animeElement.appendChild(durationElement)
      const yearElement=document.createElement("p")
      yearElement.textContent=`Year: ${anime.year}`
      animeElement.appendChild(yearElement)
      const airedElement=document.createElement("p")
      airedElement.textContent=`Aired from ${anime.aired.string}`
      animeElement.appendChild(airedElement)
      const ratingElement=document.createElement('p')
      ratingElement.textContent=`rated: ${anime.rating}`
      animeElement.appendChild(ratingElement)
      const genreElement=document.createElement("p")
      const genres=anime.genres
      genres.forEach(genre=>{
        genreElement.textContent=`Genre: ${genre.name}`
        animeElement.appendChild(genreElement)
      })
      const producersElement=document.createElement("p")
      const producers=anime.producers
      producers.forEach(producer=>{
        producersElement.textContent=`Producers: ${producer.name}`
        animeElement.appendChild(producersElement)
      })
      const descriptionElement=document.createElement('p')
      descriptionElement.textContent=`Description: ${anime.synopsis}`
      animeElement.appendChild(descriptionElement)
      const backgroundElement=document.createElement("p")
      backgroundElement.textContent=`Backgound: ${anime.background}`
      animeElement.appendChild(backgroundElement)

      const likeButton=document.createElement("button")
      likeButton.textContent="Like"
      likeButton.classList.add("likeButton")
      animeElement.appendChild(likeButton)
      likeButton.addEventListener("click",(e)=>{
        e.preventDefault()
        likeButton.style.backgroundColor="red"
        likeButton.textContent="liked"
      })
      cardContainer.appendChild(animeElement)
  }  
})