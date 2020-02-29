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
  let modalArray = [];

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
        mainFunctions.generateModalHTML(user);
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
    },
    generateModalHTML: person => {
      //dynamically insert card info
      const date = person.dob.date;

      const modal = document.createElement("div");
      const modalButtons = document.createElement("div");

      modal.style.display = "none";
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

      body.appendChild(modal);

      modalArray.push(modal);

      //modal Buttons related

      const next = modal.querySelector(".modal-next");
      const prev = modal.querySelector(".modal-prev");
      //exit button listener
      helperFunctions.exitButton(modal);
      //adds click handlers to buttons
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

        modalArray = [];
        const modals = [...document.querySelectorAll(".modal-container")];
        newList.map(listItem => {
          listItem.style.display = "";
          const cardName = listItem.childNodes[3].childNodes[1].textContent;
          modals.map(modal => {
            const modalName =
              modal.childNodes[1].childNodes[3].childNodes[3].textContent;
            if (modalName === cardName) {
              modalArray.push(modal);
            }
          });
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
        helperFunctions.modalIncrements(modalArray, modal, "next", 0);
      });

      prev.addEventListener("click", () => {
        helperFunctions.modalIncrements(
          modalArray,
          modal,
          "prev",
          modalArray.length
        );
      });
    }
  };

  //call functions
  callFunctions();
});
