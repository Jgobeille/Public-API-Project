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
  }

  //   modalButtonHandlers: modal => {
  //     const next = document.querySelector(".modal-next");
  //     const prev = document.querySelector(".modal-prev");
  //     let currentModal = modalArray.indexOf(modal);

  //     next.addEventListener("click", () => {
  //       console.log("next");
  //       currentModal += 1;
  //       if (currentModal >= 0 && currentModal <= 11) {
  //         modal.remove();
  //         body.append(modalArray[currentModal]);
  //         handlers.modalButtonHandlers(modalArray[currentModal]);

  //         let exitButton = modalArray[currentModal].querySelector(
  //           ".modal-close-btn"
  //         );
  //         exitButton.addEventListener("click", () => {
  //           modalArray[currentModal].classList = "modal-container fade-out";

  //           setTimeout(() => {
  //             modalArray[currentModal].remove();
  //           }, 2000);
  //         });
  //       } else {
  //         currentModal = 10;
  //       }
  //     });

  //     prev.addEventListener("click", () => {
  //       console.log("prev");

  //       if (currentModal > 0 && currentModal < 12) {
  //         currentModal -= 1;
  //         console.log(currentModal);
  //         console.log(modal);
  //         modal.remove();
  //         body.append(modalArray[currentModal]);
  //         handlers.modalButtonHandlers(modalArray[currentModal]);

  //         let exitButton = modalArray[currentModal].querySelector(
  //           ".modal-close-btn"
  //         );
  //         exitButton.addEventListener("click", () => {
  //           modalArray[currentModal].classList = "modal-container fade-out";

  //           setTimeout(() => {
  //             modalArray[currentModal].remove();
  //           }, 2000);
  //         });
  //       } else {
  //         currentModal = 0;
  //       }
  //     });
  //   }
};
