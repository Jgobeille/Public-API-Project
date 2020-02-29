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
