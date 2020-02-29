/**********************************************************
PUBLIC API REQUESTS PROJECT
TEAM TREEHOUSE FULLSTACK TECH DEGREE UNIT 5
BY: JAMIE GOBEILLE
DATE: 2/22/2019
***********************************************************/

//waits for HTML to fully load
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

      const next = modal.querySelector(".modal-next");
      const prev = modal.querySelector(".modal-prev");

      modal.style.display = "none";
      body.appendChild(modal);

      modalArray.push(modal);
      //exit button listener
      let exitButton = modal.querySelector(".modal-close-btn");
      exitButton.addEventListener("click", () => {
        modal.classList = "modal-container fade-out";
        setTimeout(() => {
          modal.classList = "modal-container";
          modal.style.display = "none";
        }, 2000);
      });
      handlers.modalButtonHandlers(modal, next, prev);
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
              modal.style.display = "";
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

        newList.length > 0
          ? (p.style.display = "none")
          : input.value == 0
          ? (p.style.display = "none")
          : (p.style.display = "");

        newList.map(listItem => {
          listItem.style.display = "";
        });
      }
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

    modalButtonHandlers: (modal, next, prev) => {
      next.addEventListener("click", () => {
        let currentModal = modalArray.indexOf(modal);
        modalArray[currentModal].style.display = "none";
        if (currentModal >= 0 && currentModal < 11) {
          currentModal += 1;
          modalArray[currentModal].style.display = "";
        } else {
          currentModal = 0;
          modalArray[currentModal].style.display = "";
        }
      });

      prev.addEventListener("click", () => {
        let currentModal = modalArray.indexOf(modal);
        modalArray[currentModal].style.display = "none";
        currentModal -= 1;
        if (currentModal >= 0 && currentModal < 11) {
          modalArray[currentModal].style.display = "";
        } else {
          currentModal = 11;
          modalArray[currentModal].style.display = "";
        }
      });
    }
  };

  //call functions
  callFunctions();
});
