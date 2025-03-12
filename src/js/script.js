let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("Invalid Pokemon entry");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function addListItem(pokemon) {
    let pokemonListElement = document.querySelector("#pokemon-list");
    let listItem = document.createElement("li");
    listItem.classList.add("col-12", "col-md-4", "pokemon-item");

    let button = document.createElement("button");
    button.classList.add("btn", "btn-light", "pokemon-card-btn");
    button.innerText = pokemon.name;

    listItem.appendChild(button);
    pokemonListElement.appendChild(listItem);

    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  function showModal(pokemon) {
    let modalTitle = document.querySelector(".modal-title");
    let modalBody = document.querySelector(".modal-body");

    // Clear existing content
    modalTitle.innerHTML = "";
    modalBody.innerHTML = "";

    // Create elements for modal content
    let nameElement = document.createElement("h1");
    nameElement.innerText = pokemon.name;

    let imageElementFront = document.createElement("img");
    imageElementFront.classList.add("modal-img");
    imageElementFront.style.width = "100%";
    imageElementFront.src = pokemon.imageUrl;

    let imageElementBack = document.createElement("img");
    imageElementBack.classList.add("modal-img");
    imageElementBack.style.width = "100%";
    imageElementBack.src = pokemon.backImageUrl;

    let heightElement = document.createElement("p");
    heightElement.innerText = "Height: " + pokemon.height;

    let typesElement = document.createElement("p");
    typesElement.innerText = "Types: " + pokemon.types.join(", ");

    let abilitiesElement = document.createElement("p");
    abilitiesElement.innerText = "Abilities: " + pokemon.abilities.join(", ");

    // Append elements to modal
    modalTitle.appendChild(nameElement);
    modalBody.appendChild(imageElementFront);
    modalBody.appendChild(imageElementBack);
    modalBody.appendChild(heightElement);
    modalBody.appendChild(typesElement);
    modalBody.appendChild(abilitiesElement);

    // Get the modal element
    let modalElement = document.getElementById('exampleModal');

    // Initialize the modal using Bootstrap 5's Modal API
    let modal = new bootstrap.Modal(modalElement);

    // Show the modal
    modal.show();
  }

  function loadList() {
    return fetch(apiUrl)
      .then((response) => response.json())
      .then((json) => {
        json.results.forEach((item) => {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch((error) => console.error(error));
  }

  function loadDetails(pokemon) {
    return fetch(pokemon.detailsUrl)
      .then((response) => response.json())
      .then((details) => {
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.backImageUrl = details.sprites.back_default;
        pokemon.height = details.height;
        pokemon.types = details.types.map(type => type.type.name);
        pokemon.abilities = details.abilities.map(ability => ability.ability.name);
      })
      .catch((error) => console.error(error));
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

// Loading the list of Pokémon
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
