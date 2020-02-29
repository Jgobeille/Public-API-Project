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

  modalButtonHandlers: (currentModal, next, prev) => {
    next.addEventListener("click", () => {
      console.log("next");
      console.log(currentModal);
      // currentModal += 1;
      // if (currentModal >= 0 && currentModal <= 11) {
      //   modal.remove();
      //   body.append(modalArray[currentModal]);
      //   handlers.modalButtonHandlers(modalArray[currentModal]);

      //   let exitButton = modalArray[currentModal].querySelector(
      //     ".modal-close-btn"
      //   );
      //   exitButton.addEventListener("click", () => {
      //     modalArray[currentModal].classList = "modal-container fade-out";

      //     setTimeout(() => {
      //       modalArray[currentModal].remove();
      //     }, 2000);
      //   });
      // } else {
      //   currentModal = 10;
      // }
    });

    prev.addEventListener("click", () => {
      console.log("prev");
      console.log(currentModal);

      //     if (currentModal > 0 && currentModal < 12) {
      //       currentModal -= 1;
      //       console.log(currentModal);
      //       console.log(modal);

      //       body.append(modalArray[currentModal]);
      //       handlers.modalButtonHandlers(modalArray[currentModal]);

      //       let exitButton = modalArray[currentModal].querySelector(
      //         ".modal-close-btn"
      //       );
      //       exitButton.addEventListener("click", () => {
      //         modalArray[currentModal].classList = "modal-container fade-out";

      //         setTimeout(() => {
      //           modalArray[currentModal].remove();
      //         }, 2000);
      //       });
      //     } else {
      //       currentModal = 0;
      //     }
    });
  }
};
