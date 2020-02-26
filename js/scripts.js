/**********************************************************
PUBLIC API REQUESTS PROJECT
TEAM TREEHOUSE FULLSTACK TECH DEGREE UNIT 5
BY: JAMIE GOBEILLE
DATE: 2/22/2019
***********************************************************/

/**********************************************************
OBJECTIVE 1: Get and display 12 random users

With information provided from The Random User Generator API, send a single request to the API, and use the response data to display 12 users, along with some basic information for each:
Image
First and Last Name
Email
City or location
Refer to the mockups and the comments in the index.html file for an example of what info should be displayed on the page and how it should be styled.

DOCUMENTATION FOR API BELOW:
https://randomuser.me/
***********************************************************/

/* How to approach
1.) Using Async/Await, make a call to the randomUser API and retrieve the information needed
2.) Parse the information into JSON
3.) Map through each data set up to 12 people requested and dynamically append to the page 
*/

//vars
const randomUsersUrl =
  "https://randomuser.me/api/?results=12&nat=us&exc=login,gender,registered,id";
const gallery = document.querySelector(".gallery");
const modalArray = [];
const body = document.querySelector("body");

//Handle all Fetch requests
const getJSON = async url => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    throw error;
  }
};

//get the users
const getRandomUsers = users => {
  users.results.map(user => {
    generateCardHTML(user);
  });
};

// Generate HTML and append it to the page

const generateCardHTML = person => {
  const card = document.createElement("div");
  card.className = "card";
  gallery.appendChild(card);
  //dynamically insert card info
  card.innerHTML = `
      <div class="card-img-container">
          <img class="card-img" src="${person.picture.medium}" alt="profile picture">
      </div>
      <div class="card-info-container">
          <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
          <p class="card-text">${person.email}</p>
          <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
      </div>
        `;
  generateModalHTML(person);
};

/**********************************************************
When any part of an employee item in the directory is clicked, a modal window should pop up with the following details displayed:
Image
Name
Email
City or location
Cell Number
Detailed Address, including street name and number, state or country, and post code.
Birthday
Make sure there’s a way to close the modal window
Refer to the mockups and the comments in the index.html file for an example of what info should be displayed on the page and how it should be styled.
***********************************************************/

/* How to approach
1.) Create a click listener on each card
2.) create modal card generator function
3.) append the modal to each card and hide it. When click listener clicks on it then add that modal to the page
*/

const generateModalHTML = person => {
  //dynamically insert card info
  const modal = document.createElement("div");
  modal.className = "modal-container";
  modal.innerHTML = `
  <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
          <img class="modal-img" src="${person.picture.large}" alt="profile picture">
          <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
          <p class="modal-text">${person.email}</p>
          <p class="modal-text cap">${person.location.city}</p>
          <hr>
          <p class="modal-text">${person.cell}</p>
          <p class="modal-text"> ${person.location.street.number} ${person.location.street.name}., ${person.location.city}, ${person.location.state} ${person.location.postcode}</p>
          <p class="modal-text">Birthday: ${person.dob.date}</p>
      </div>

        `;

  modalArray.push(modal);
};

const cardClickEvent = () => {
  const cards = [...document.querySelectorAll(".card")];

  cards.map(card => {
    card.addEventListener("click", () => {
      const cardName = card.childNodes[3].childNodes[1].textContent;
      modalArray.map(modal => {
        const modalName =
          modal.childNodes[1].childNodes[3].childNodes[3].textContent;
        if (modalName === cardName) {
          body.append(modal);
          modalExitButton(modal);
        }
      });
    });
  });
};

const modalExitButton = modal => {
  const exitButton = document.querySelector(".modal-close-btn");
  exitButton.addEventListener("click", () => {
    body.removeChild(modal);
  });
};

//call functions
getJSON(randomUsersUrl)
  .then(getRandomUsers)
  .then(cardClickEvent);
