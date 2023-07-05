document.addEventListener("DOMContentLoaded",()=>{
 fetch("https://api.jikan.moe/v4/anime")
 .then((response) => response.json())
 .then((data) => {
   let animes=data.data //array of anime data

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

displayAnime(animes)


  
})

.catch((error) => {
    console.error("Error:", error);
  });

 //function to display anime cards in container
 function displayCard(anime) {
    const cardContainer=document.getElementById("animeContainer")
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
  
      const nextBtn=document.createElement('button')
      nextBtn.textContent="Next"
      animeElement.appendChild(nextBtn)
  
      cardContainer.appendChild(animeElement)
  }
//function to display all details of all anime
function displayAnime(anime){
    const displaycontainer=document.getElementById("displayCurrent")
    //use to clear the previous content .......
     displaycontainer.innerHTML=" "
  
     //iterate through the data and create a card for each with anime details
    anime.forEach(anime=>{
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
      displaycontainer.appendChild(animeElement)
    })
   }
})