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
  "https://randomuser.me/api/?results=12&nat=us&inc=picture,name,email,location";
const gallery = document.querySelector(".gallery");

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
const getRandomUsers = async url => {
  const users = await getJSON(url);
  users.results.map(user => {
    generateHTML(user);
    console.log(user);
  });
};

// Generate HTML and append it to the page

const generateHTML = person => {
  const card = document.createElement("div");
  card.className = "card";
  gallery.appendChild(card);
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
};

getRandomUsers(randomUsersUrl);
