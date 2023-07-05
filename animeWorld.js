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
  


 })

.catch((error) => {
    console.error("Error:", error);
  });
})