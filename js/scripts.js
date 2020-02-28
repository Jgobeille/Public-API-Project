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


How to approach
1.) Using Async/Await, make a call to the randomUser API and retrieve the information needed
2.) Parse the information into JSON
3.) Map through each data set up to 12 people requested and dynamically append to the page 

***********************************************************/

/**********************************************************
OBJECTIVE 2:  
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

How to approach
1.) Create a click listener on each card
2.) create modal card generator function
3.) when card is selected, append that model to the body of the page

***********************************************************/

document.addEventListener("DOMContentLoaded", () => {
  const randomUsersUrl =
    "https://randomuser.me/api/?results=12&nat=us&exc=login,gender,registered,id";
  const gallery = document.querySelector(".gallery");
  const modalArray = [];

  const body = document.querySelector("body");

  const p = document.createElement("p");
  const classList = document.querySelector(".gallery");
  p.textContent = "No Employees Found...";
  p.style.display = "none";
  p.className = "page__studentList__p";
  classList.appendChild(p);

  const callFunctions = () => {
    helperFunctions.appendSearchFeature();
    handlers.searchFunctionHandlers();

    mainFunctions
      .getJSON(randomUsersUrl)
      .then(mainFunctions.getRandomUsers)
      .then(mainFunctions.searchFunction)
      .then(mainFunctions.cardClickEvent);
  };
  //vars

  const mainFunctions = {
    //Handle all Fetch requests
    getJSON: async url => {
      try {
        const response = await fetch(url);
        return await response.json();
      } catch (error) {
        throw error;
      }
    },

    //get the users
    getRandomUsers: users => {
      users.results.map(user => {
        mainFunctions.generateCardHTML(user);
      });
    },

    // Generate HTML and append it to the page

    generateCardHTML: person => {
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
      mainFunctions.generateModalHTML(person);
    },
    generateModalHTML: person => {
      //dynamically insert card info
      const date = person.dob.date;
      const modal = document.createElement("div");
      const modalButtons = document.createElement("div");
      modalButtons.className = "modal-btn-container";
      modal.className = "modal-container";
      modal.innerHTML = `
  <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
          <img class="modal-img" src="${
            person.picture.large
          }" alt="profile picture">
          <h3 id="name" class="modal-name cap">${person.name.first} ${
        person.name.last
      }</h3>
          <p class="modal-text">${person.email}</p>
          <p class="modal-text cap">${person.location.city}</p>
          <hr>
          <p class="modal-text">${person.cell}</p>
          <p class="modal-text"> ${person.location.street.number} ${
        person.location.street.name
      }., ${person.location.city}, ${person.location.state} ${
        person.location.postcode
      }</p>
          <p class="modal-text">Birthday: ${helperFunctions.BirthdayFormatter(
            date
          )}</p>
      </div>
  
        `;

      modalButtons.innerHTML = `
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
  `;
      modal.appendChild(modalButtons);

      modalArray.push(modal);
    },

    cardClickEvent: () => {
      const cards = [...document.querySelectorAll(".card")];

      cards.map(card => {
        card.addEventListener("click", () => {
          const cardName = card.childNodes[3].childNodes[1].textContent;
          modalArray.map(modal => {
            const modalName =
              modal.childNodes[1].childNodes[3].childNodes[3].textContent;
            if (modalName === cardName) {
              modal.classList = "modal-container fade-in";
              body.append(modal);
              // mainFunctions.modalToggle(modal);
              handlers.modalButtonHandlers(modal);
              let exitButton = modal.querySelector(".modal-close-btn");
              exitButton.addEventListener("click", () => {
                modal.classList = "modal-container fade-out";
                setTimeout(() => {
                  modal.remove();
                }, 1900);
              });
            }
          });
        });
      });
    },

    searchFunction: input => {
      const cards = [...document.querySelectorAll(".card")];
      if (input) {
        var newList = cards.filter(card => {
          //give all items display of none
          card.style.display = "none";
          //return all list items that match search function

          return card.childNodes[3].childNodes[1].textContent
            .toLowerCase()
            .includes(input.value.toLowerCase());
        });

        if (newList.length > 0) {
          p.style.display = "none";
        } else if (input.value == 0) {
          p.style.display = "none";
        } else {
          p.style.display = "";
        }

        newList.map(listItem => {
          listItem.style.display = "";
        });
      }
    },
    /*
Modal toggle
Add a way to toggle back and forth between employees when the modal window is open.
There should be no errors once the end or beginning of the list is reached.
Example markup for this feature is included in the HTML comments.

How to approach:
1.) find the current position of the selected modal
2.) create event Listeners on the previous and next buttons
3.) if button is next add one to the current position of the modal and minus one for the previous button
4.) also check if position is the end or beginning of the modalArray to keep from logging errors
*/
    modalToggle: modal => {
      let currentModal = modalArray.indexOf(modal);
      console.log(currentModal);
    }
  };

  //Helper functions

  const helperFunctions = {
    //takes number strings and then concats them into proper string format
    BirthdayFormatter: date => {
      const nums = date.split("");
      const day = helperFunctions.slice(nums, 8, 10);
      const month = helperFunctions.slice(nums, 5, 7);
      const year = helperFunctions.slice(nums, 0, 4);

      return `${month}/${day}/${year}`;
    },
    //takes split string, slices the necessary numbers, then joins them into string
    slice: (varName, num1, num2) => {
      return varName.slice(num1, num2).join("");
    },

    appendSearchFeature: () => {
      const searchContainer = document.querySelector(".search-container");
      searchContainer.innerHTML = `
      <form action="#" method="get">
      <input type="search" id="search-input" class="search-input" placeholder="Search...">
      <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
  </form>
      `;
    }
  };

  //click handlers
  const handlers = {
    searchFunctionHandlers: () => {
      const button = document.querySelector(".search-submit");
      const search = document.querySelector(".search-input");

      search.addEventListener("keyup", () => {
        mainFunctions.searchFunction(search);
      });

      button.addEventListener("click", e => {
        e.preventDefault();
        mainFunctions.searchFunction(search);
      });
    },

    modalButtonHandlers: modal => {
      const next = document.querySelector(".modal-next");
      const prev = document.querySelector(".modal-prev");
      let currentModal = modalArray.indexOf(modal);

      next.addEventListener("click", () => {
        console.log("next");
        currentModal += 1;
        if (currentModal >= 0 && currentModal <= 11) {
          modal.remove();
          body.append(modalArray[currentModal]);
          handlers.modalButtonHandlers(modalArray[currentModal]);

          let exitButton = modalArray[currentModal].querySelector(
            ".modal-close-btn"
          );
          exitButton.addEventListener("click", () => {
            modalArray[currentModal].classList = "modal-container fade-out";

            setTimeout(() => {
              modalArray[currentModal].remove();
            }, 1900);
          });
        } else {
          currentModal = 10;
        }
      });

      prev.addEventListener("click", () => {
        console.log("prev");

        if (currentModal > 0 && currentModal < 12) {
          currentModal -= 1;
          console.log(currentModal);
          modal.remove();
          body.append(modalArray[currentModal]);
          handlers.modalButtonHandlers(modalArray[currentModal]);

          let exitButton = modalArray[currentModal].querySelector(
            ".modal-close-btn"
          );
          exitButton.addEventListener("click", () => {
            modalArray[currentModal].classList = "modal-container fade-out";

            setTimeout(() => {
              modalArray[currentModal].remove();
            }, 1900);
          });
        } else {
          currentModal = 0;
        }
      });
    }
  };

  //call functions
  callFunctions();
});
