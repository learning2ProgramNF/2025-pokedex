let pokemonRepository = (function () {
  let pokemonList = [];
  let modalContainer = document.querySelector('#modal-container');
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }


  function getAll() {
    return pokemonList;
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal( pokemon.name, 
        "Height: " + pokemon.height +
      pokemon.imageUrl);
    });
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector("#pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    pokemonList.addClass("list-group");
    listpokemon.addClass("list-group-item");
    button.addClass("btn", "btn-primary", "data-toggle=modal");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    listenForClick(button,pokemon);
  }

  function showModal(pokemon) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");

    //clear existing modal content
    modalTitle.empty();
    modalBody.empty();

    //creating element for name in modal content
    let nameElement = $("<h1>" + pokemon.name + "</h1>")
    //creating img in modal content
    letElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr("src", pokemon.imageUrlFront);
    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr("src", pokemon.imageUrlBack);
    //creating element for height in modal content
    let heightElement = $("<p>" + "Height: " + pokemon.height + "</p>");
    //Creaating element for weight 
    let weightElement = $("<p>" + "Weight: " + pokemon.weight + "</p>");
    //Creating element for types
    let typesElement = $("<p>" + "Types: " + pokemon.types + "</p>");
    //Creating element for abilities
    let abilitiesElement = $("<p>" + "Abilities: " + pokemon.abilities + "</p>");
    
    //appending elements to modal content
    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);     
    modalBody.append(weightElement);
    modalBody.append(typesElement);     
    modalBody.append(abilitiesElement);     

  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });


  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if(target  === modalContainer){
    hideModal();
  } 
  });
    
    function hideModal() {
      modalContainer.classList.remove('is-visible');
    }

   function listenForClick(button, pokemon) {
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
   }

  function loadList() {
   let loading = showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: pokemon.name,
          detailsUrl: item.url,
        };
        hideLoadingMessage(loading);
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
      hideLoadingMessage(loading); 
    })
  }

  function loadDetails(pokemon) {
    //First we show loading message
    let loading = showLoadingMessage();
    let url = pokemon.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      //Now we add details to the item
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.weight = details.weight;
      pokemon.types = details.types;
      pokemon.abilities = details.abilities;
      hideLoadingMessage(loading);
    }).catch(function (e) {
      hideLoadingMessage(loading);
      console.error(e);
    });
  }
  
  function showLoadingMessage()  {
    let loading = document.createElement("div");
    loading.classList.add("loading");
    document.body.appendChild(loading);
    return loading;
  }

  function hideLoadingMessage(loading) {
    loading.remove();
  }




  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

pokemonRepository.loadList().then(function() {
    //now the list is loaded
    pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
});



