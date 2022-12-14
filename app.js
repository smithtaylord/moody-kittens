let kittens = [];
let images = ['CAT1.jpg', 'CAT2.jpg','CAT3.jpg','CAT4.jpg','CAT5.jpg']
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */



function addKitten(event) {
  event.preventDefault();
  let form = event.target;
  let kitten = {
    id: generateId(),
    name: form.name.value,
    affectionLevel: 6,
    mood: 'happy',
    img: randomImg(),
    hidden: '',
    ranAway: 'hidden',
    text: 'text-light'
    
  }
  let index = kittens.findIndex(kitten => kitten.name == form.name.value)
  if (index == -1) {
    kittens.push(kitten)
    saveKittens()
    form.reset();
  }
}



/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem('kittens', JSON.stringify(kittens))
  drawKittens()
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let storedKittens = JSON.parse(window.localStorage.getItem('kittens'))
  if (storedKittens) {
    kittens = storedKittens
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let kittenListElement = document.getElementById("kitten-list")
  let kittensTemplate = ""
  kittens.forEach(kitten => {
    kittensTemplate += `
    <div class="card bg-dark container3 kitten ${kitten.mood} ${kitten.text}">
    <div class="d-flex justify-content-center">
      <img  src="${kitten.img}" height="200" alt="Cat Image">
    </div>
    <p><strong>Kitten's Name: </strong>${kitten.name}</p>
    <div id="" class="text-center ${kitten.ranAway}">
        <p><strong>Ran Away</strong></p>
    </div>
    <div class="${kitten.hidden}">
    <p><strong>Kitten's Mood: </strong>${kitten.mood}</p>
    <p><strong>Affection Level: </strong>${kitten.affectionLevel}</p>
    <div class=" text-center d-flex space-around"> 
    <button class = "kitten-btn btn-cancel" onclick="pet('${kitten.id}')"><strong>Pet</strong></button>
    <button class = "kitten-btn" onclick="catnip('${kitten.id}')"><strong>CatNip</strong></button>
    </div>
    </div>
    </div>
    `
  })
  
  kittenListElement.innerHTML = kittensTemplate
}


/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {
  let index = kittens.findIndex(kitten => kitten.id === id)
  if (index == -1){
    throw new Error("Invalid Kitten Id")
  }
  return index;
}


/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {
  let kitten = kittens[findKittenById(id)]
  let random = Math.random();
  if (random > .5) {
    kitten.affectionLevel += 1
  } else {
    kitten.affectionLevel -= 1
  }
  setKittenMood(kitten)
  saveKittens()
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let kitten = kittens[findKittenById(id)]
  kitten.mood = 'tolerant'
  kitten.affectionLevel = 5
  saveKittens()  
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {
  if (kitten.affectionLevel >= 6) {
    kitten.mood = 'happy'
  } else if (kitten.affectionLevel >= 3 && kitten.affectionLevel <= 5) {
    kitten.mood = 'tolerant'
  } else if (kitten.affectionLevel <= 3 && kitten.affectionLevel >= 2) {
    kitten.mood = 'angry'
  }
  if (kitten.affectionLevel == 1) {
    kitten.mood = 'gone'
    kitten.hidden = 'hidden'
    kitten.ranAway = ''
    kitten.text = 'text-danger'
    console.log('ran away');
  }
  saveKittens()
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens(){
  kittens.splice(0,kittens.length)
  saveKittens()
  getStarted()
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  console.log('Good Luck, Take it away');
  drawKittens()
  
}

function kittenLength() {
  document.getElementById("kittenLength").innerHTML = 'Remove ' + kittens.length + ' kittens'
}
loadKittens();
kittenLength();

function randomImg(){
  return images[Math.floor(Math.random() * 5)]
}




// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens();

