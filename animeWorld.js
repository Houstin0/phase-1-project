document.addEventListener("DOMContentLoaded",()=>{
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

//displayAnime(animes)


  
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
  
      cardContainer.appendChild(animeElement)
     //displayResult.appendChild(animeElement)
  }

//event listener for search button
 const searchButton=document.getElementById("searchBtn")
 searchButton.addEventListener('click',(e)=>{
  e.preventDefault();
  const searchInput=document.getElementById("searchBar").value;
  fetchAnime(searchInput)
 })
 // function to search for inputed anime and display the results
   function fetchAnime(searchValue) {
    console.log(searchValue);
    fetch(`https://api.jikan.moe/v4/anime?q=${searchValue}`,{
        method: 'GET'
    })
    .then(response => response.json())
    .then(data=>{
        console.log(data);
     const animes=data.data
       if(animes.length>0){
       const displayResultContainer=document.getElementById("displayCurrent")
       displayResultContainer.innerHTML=" "

       animes.forEach(anime=>{
        const animeElement=displayAnimeResult(anime)
        displayResultContainer.appendChild(animeElement)
       })
       }else{
        console.log("No results found");
       }
    })
    .catch(error=>{
        console.log("Error:",error);
    })
   }

 //function to display searched anime results
function displayAnimeResult(anime){
    const displayResultContainer=document.getElementById("displayCurrent")
    //use to clear the previous content .......
     displayResultContainer.innerHTML=" "
  
     //iterate through the data and create a card for each with anime details
      const animeElement=document.createElement("div")
      animeElement.classList.add("animeCard")
    
      //add information to the animeCard
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
    
      //add the animeCard to the container
      displayResultContainer.appendChild(animeElement)
    
   }

   
})