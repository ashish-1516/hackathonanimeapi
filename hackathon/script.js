// const uri = 'https://api.jikan.moe/v3/search/anime?q='

let displayarea = document.getElementById('display')
// displayarea.setAttribute('onkeypress', 'execute(event)')

async function getAnime() {
  try {
    let searchAnime = document.getElementById('word').value
    let uri = `https://api.jikan.moe/v3/search/anime?q=${searchAnime}`
    let animeURI = await fetch(uri)
    let animeData = await animeURI.json()
    anime = animeData.results
    console.log(uri)
    displayarea.innerHTML = ''
    anime.forEach((data) => displayAnime(data))

    function displayAnime({
      title,
      image_url,
      type,
      start_date,
      end_date,
      score,
      url,
    }) {
      let info = document.createElement('div')
      info.setAttribute('onclick', 'knowmore()')
      info.setAttribute('class', 'col-sm-6 info')
      let start
      let end

      if (end_date === null) {
        end = 'Till Date'
      } else {
        end = new Date(end_date).toLocaleDateString('en-GB')
      }
      start = new Date(start_date).toLocaleDateString('en-GB')

      info.innerHTML = `<div><img class="poster" src=${image_url}/></div>
      <div class="details">
    <h3>${title}</h3>
    <p><b>Type: </b>${type}</p>
    <p><b>Start Date: </b>${start}</p>
    <p><b>End Date: </b>${end}</p>
    <p><b>IMDB Rating: <span class="fa fa-star checked"></span></b>${score}/10</p>
    <a href="${url}" target="_blank">Know More...</a>
  </div>`
      displayarea.append(info)
    }
  } catch (err) {
    alert('Enter a valid Anime Name')
  }
}
document.onkeydown = function execute(event) {
  const enterkey = 13
  if (event.keycode === enterkey) {
    getAnime()
  }
}