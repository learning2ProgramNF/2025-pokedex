---

# 2025 Pokedex

A web-based Pokedex that allows users to view a list of Pokémon, click on a Pokémon to view detailed information such as images, types, abilities, and height in a modal window. The project fetches Pokémon data from the PokeAPI and displays it dynamically.

## Features
- List of Pokémon (first 150) displayed in a grid.
- Click a Pokémon to open a modal displaying detailed information.
- Responsive design, looks great on both mobile and desktop devices.
- Data is fetched from the [PokeAPI](https://pokeapi.co/).

## Technologies Used
- **HTML5**: Basic structure of the webpage.
- **CSS**: Custom styling for the page.
- **JavaScript**: Handles fetching data from the PokeAPI, displaying Pokémon information, and managing interactions with the modal.
- **Bootstrap 5**: Used for responsive grid layout and modal functionality.
- **PokeAPI**: Public API to fetch Pokémon data.

## File Structure

```
/2025-Pokedex
├── css
│   └── style.css          # Custom styles for the page
├── js
│   └── script.js          # JavaScript logic for fetching data and showing details
├── index.html             # HTML file that sets up the layout
└── README.md              # Documentation for the project
```

## How to Run the Project

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/2025-pokedex.git
   ```

2. **Navigate to the project folder**:
   ```bash
   cd 2025-pokedex
   ```

3. **Open the `index.html` file in your browser**:
   - You can open the file directly in your browser or use any web server to serve the HTML file.

   - If you want to serve the file locally using `Live Server` in VS Code:
     - Open the project folder in VS Code.
     - Right-click on `index.html` and select **Open with Live Server**.

## How It Works

### HTML (`index.html`)
- The HTML file sets up the structure of the webpage. It includes:
  - A navigation bar at the top with the title "2025 Pokedex".
  - A container where Pokémon names will be listed dynamically.
  - A modal window for displaying Pokémon details when clicked.

### JavaScript (`js/script.js`)
- The JavaScript file is responsible for:
  - Fetching the list of Pokémon (first 150) from the [PokeAPI](https://pokeapi.co/api/v2/pokemon/?limit=150).
  - Creating buttons for each Pokémon, displaying their names.
  - Showing a modal with detailed information when a Pokémon is clicked. This includes their image, height, types, and abilities.

### CSS (`css/style.css`)
- Custom styles are added to improve the user interface and the modal appearance.
- Pokémon items are displayed in a grid layout using Bootstrap’s grid system, making it responsive across devices.

## API Used

This project uses the [PokeAPI](https://pokeapi.co/), a free public API that provides detailed data on Pokémon. The data includes their names, types, abilities, and images.

## Demo

You can view a live demo of the project by opening the `index.html` file in your browser.

## Future Improvements
- Pagination or infinite scroll for fetching more Pokémon (beyond the first 150).
- Search functionality to allow users to search for a specific Pokémon.
- Add additional Pokémon details, such as stats and evolutions.
- Improve error handling when the API is unavailable or returns an error.

## License
This project is open-source and available under the [MIT License](LICENSE).

---

This `README.md` provides an overview of the project, how to run it, and a breakdown of how the files are structured. You can customize it further based on your preferences or specific needs.
