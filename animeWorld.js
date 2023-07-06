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
  console.log(searchValue);
  fetch(`https://api.jikan.moe/v4/anime?q=${searchValue}`,{
      method: 'GET'
  })
  .then(response => response.json())
  .then(data=>{
   const animes=data.data
     if(animes.length>0){
     const displayResultContainer=document.getElementById("displaySearchResult")
     displayResultContainer.innerHTML=" "// clear previous content
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
    
    const titleElement=document.createElement('h3')
    titleElement.textContent=anime.title_english
    infoElement.appendChild(titleElement)

    const episodesElement=document.createElement('p')
    episodesElement.textContent=`Episodes: ${anime.episodes}` 
    infoElement.appendChild(episodesElement)

    const statusElement=document.createElement("p")
    statusElement.textContent=`Status: ${anime.status}`
    infoElement.appendChild(statusElement)
  



  
    
    const durationElement=document.createElement("p")
    durationElement.textContent=`Duration: ${anime.duration}`
    infoElement.appendChild(durationElement)



    const airedElement=document.createElement("p")
    airedElement.textContent=`Aired from: ${anime.aired.string}`
    infoElement.appendChild(airedElement)
    
    const ratedElement=document.createElement("p")
    ratedElement.textContent=`Rated:${anime.rating}`
    infoElement.appendChild(ratedElement)
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
    //
    cardContainer.innerHTML=" "
  
      const animeElement=document.createElement("div")
      animeElement.classList.add("animeCard")
    
      const imageElement=document.createElement("img")
      imageElement.src=anime.images.jpg.image_url
      imageElement.alt="Anime pic"
      animeElement.appendChild(imageElement)
    
      const titleElement=document.createElement('h3')
      titleElement.textContent=anime.title
      animeElement.appendChild(titleElement)

      const episodesElement=document.createElement('p')
      episodesElement.textContent=`Episodes: ${anime.episodes}` 
      animeElement.appendChild(episodesElement)
  
      const ratingElement=document.createElement('p')
      ratingElement.textContent=`rating: ${anime.rating}`
      animeElement.appendChild(ratingElement)
    
      const descriptionElement=document.createElement('p')
      descriptionElement.textContent=anime.synopsis
      animeElement.appendChild(descriptionElement)
      
      
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
     //displayResult.appendChild(animeElement)
  }  
})