// Configuration and Constants
const CONFIG = {
  API_KEY: "1a3dcaad",
  RESULTS_PER_PAGE: 10,
  SEARCH_DELAY: 300,
  SCROLL_THRESHOLD: 0.7,
};

// State Management
class SearchState {
  constructor() {
    this.page = 1;
    this.isLoading = false;
    this.searchTimeOut = null;
  }

  reset() {
    this.page = 1;
  }

  incrementPage() {
    this.page++;
  }
}

// API Service
class OMDbService {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async searchMovies(searchTerm, type, page) {
    const url = `http://www.omdbapi.com/?s=${encodeURIComponent(
      searchTerm
    )}&type=${type}&page=${page}&apikey=${this.apiKey}`;
    const response = await fetch(url);
    return await response.json();
  }

  async getMovieDetails(imdbID) {
    const url = `http://www.omdbapi.com/?i=${imdbID}&apikey=${this.apiKey}`;
    const response = await fetch(url);
    return await response.json();
  }
}

// UI Manager
class UIManager {
  constructor() {
    this.state = new SearchState();
    this.omdbService = new OMDbService(CONFIG.API_KEY);
    this.allLoadedMovies = [];

    this.elements = {
      searchInput: document.getElementById("searchInput"),
      typeSelect: document.getElementById("typeSelect"),
      searchResults: document.getElementById("searchResults"),
      modal: document.getElementById("modal"),
      closeModal: document.getElementById("closeModal"),
      resultCount: document.getElementById("resultCount"),
      searchForm: document.getElementById("searchForm"),
      createReportButton: document.getElementById("createReportButton"),
      reportModal: document.getElementById("reportModal"),
      closeReportModal: document.getElementById("closeReportModal"),
      reportContent: document.getElementById("reportContent"),
    };

    // Create loading SVG element
    this.loadingSpinner = this.createLoadingSpinner();
    this.initEventListeners();
  }

  createLoadingSpinner() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add("loading-spinner");
    svg.setAttribute("viewBox", "25 25 50 50");
    svg.style.position = "fixed"; // Cambié de 'absolute' a 'fixed'
    svg.style.top = "50%";
    svg.style.left = "50%";
    svg.style.transform = "translate(-50%, -50%)";
    svg.style.width = "3.25em";
    svg.style.zIndex = "1000"; // Asegura que esté sobre otros elementos
    svg.style.display = "none";
  
    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    circle.setAttribute("r", "20");
    circle.setAttribute("cy", "50");
    circle.setAttribute("cx", "50");
  
    svg.appendChild(circle);
    document.body.appendChild(svg);
  
    return svg;
  }

  showLoading() {
    this.loadingSpinner.style.display = "block";
    this.elements.searchResults.style.opacity = "0.5";
  }

  hideLoading() {
    this.loadingSpinner.style.display = "none";
    this.elements.searchResults.style.opacity = "1";
  }

  initEventListeners() {
    this.elements.searchForm.addEventListener(
      "submit",
      this.handleSearch.bind(this)
    );
    this.elements.searchInput.addEventListener(
      "keydown",
      this.handleEnterKey.bind(this)
    );
    this.elements.searchInput.addEventListener(
      "input",
      this.handleAutoSearch.bind(this)
    );
    this.elements.closeModal.addEventListener(
      "click",
      this.closeModalWindow.bind(this)
    );
    this.elements.modal.addEventListener(
      "click",
      this.handleModalClick.bind(this)
    );
    window.addEventListener("scroll", this.handleInfiniteScroll.bind(this));

    // Report modal event listeners
    this.elements.createReportButton.addEventListener(
      "click",
      this.generateReport.bind(this)
    );
    this.elements.closeReportModal.addEventListener(
      "click",
      this.closeReportModal.bind(this)
    );
    this.elements.reportModal.addEventListener(
      "click",
      this.handleReportModalClick.bind(this)
    );
  }

  handleSearch(event) {
    event.preventDefault();
    this.performSearch();
  }

  handleEnterKey(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      this.performSearch();
    }
  }

  handleAutoSearch() {
    const searchTerm = this.getSearchTerm();

    if (searchTerm.length >= 3) {
      clearTimeout(this.state.searchTimeOut);
      this.state.searchTimeOut = setTimeout(
        () => this.performSearch(),
        CONFIG.SEARCH_DELAY
      );
    } else {
      this.clearSearchResults();
    }
  }

  handleInfiniteScroll() {
    // Solo procede si no hay una carga en curso y se ha alcanzado el umbral de scroll
    if (this.state.isLoading || !this.hasReachedBottom()) return;
    this.loadMoreResults();
  }

  getSearchTerm() {
    return this.elements.searchInput.value.trim();
  }

  getSearchType() {
    return this.elements.typeSelect.value;
  }

  hasReachedBottom() {
    const scrollPosition =
      document.documentElement.scrollTop + window.innerHeight;
    const totalHeight = document.documentElement.scrollHeight;
    return scrollPosition / totalHeight >= CONFIG.SCROLL_THRESHOLD;
  }

  clearSearchResults() {
    this.elements.searchResults.innerHTML = "";
    this.updateResultCount(0);
  }

  updateResultCount(count) {
    this.elements.resultCount.textContent = `Resultados encontrados: ${count}`;
  }

  async performSearch() {
    const searchTerm = this.getSearchTerm();
    if (!searchTerm) return;

    const searchType = this.getSearchType();
    this.state.reset();
    this.clearSearchResults();
    this.allLoadedMovies = []; // Reiniciamos el arreglo de películas

    this.showLoading();
    this.state.isLoading = true;

    try {
      const data = await this.omdbService.searchMovies(
        searchTerm,
        searchType,
        this.state.page
      );

      console.log("Datos de búsqueda:", data); // Log para verificar los datos recibidos

      if (data.Response === "True") {
        this.updateResultCount(data.totalResults);

        const detailedItems = await Promise.all(
          data.Search.map((item) =>
            this.omdbService.getMovieDetails(item.imdbID)
          )
        );

        console.log("Elementos detallados:", detailedItems); // Log para ver los detalles de los elementos

        this.displayMovies(detailedItems);
        this.state.incrementPage();
        this.toggleCreateReportButton(true);
      } else {
        this.updateResultCount(0);
        this.toggleCreateReportButton(false);
      }
    } catch (error) {
      console.error("Error searching movies:", error);
      alert("Ocurrió un error al buscar. Inténtelo de nuevo.");
      this.toggleCreateReportButton(false);
    } finally {
      this.hideLoading();
      this.state.isLoading = false;
    }
  }

  async loadMoreResults() {
    const searchTerm = this.getSearchTerm();
    const searchType = this.getSearchType();
    if (!searchTerm) return;
  
    // Mostrar spinner de carga
    this.showLoading();
    this.state.isLoading = true;
  
    try {
      const data = await this.omdbService.searchMovies(
        searchTerm,
        searchType,
        this.state.page
      );
  
      if (data.Response === "True") {
        const detailedItems = await Promise.all(
          data.Search.map((item) =>
            this.omdbService.getMovieDetails(item.imdbID)
          )
        );
  
        this.displayMovies(detailedItems);
        this.state.incrementPage();
      }
    } catch (error) {
      console.error("Error loading more results:", error);
      alert("Ocurrió un error al cargar más resultados. Inténtelo de nuevo.");
    } finally {
      // Ocultar spinner de carga
      this.hideLoading();
      this.state.isLoading = false;
    }
  }

  // Modificamos displayMovies para acumular películas
  displayMovies(items) {
    const fragment = document.createDocumentFragment();
    items.forEach((item) => {
      if (item) {
        const movieElement = this.createMovieElement(item);
        fragment.appendChild(movieElement);

        // Asegúrate de agregar la película si no es un duplicado
        if (
          !this.allLoadedMovies.some((movie) => movie.imdbID === item.imdbID)
        ) {
          console.log(`Añadiendo película: ${item.Title} (${item.imdbID})`);
          this.allLoadedMovies.push(item);
        } else {
          console.log(`Duplicado ignorado: ${item.Title} (${item.imdbID})`);
        }
      }
    });
    this.elements.searchResults.appendChild(fragment);
  }

  createMovieElement(item) {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");
    movieElement.dataset.fullData = JSON.stringify(item);

    const titleElement = document.createElement("h2");
    titleElement.textContent = item.Title;
    movieElement.appendChild(titleElement);

    const imgElement = this.createImageElement(item.Poster);
    movieElement.appendChild(imgElement);

    movieElement.addEventListener("click", () => this.showMovieDetails(item));

    return movieElement;
  }

  createImageElement(posterUrl) {
    const imgElement = document.createElement("img");
    const posterPlaceholder =
      "https://via.placeholder.com/400x600?text=No+Poster";

    imgElement.src =
      posterUrl && posterUrl !== "N/A" ? posterUrl : posterPlaceholder;
    imgElement.alt = posterUrl && posterUrl !== "N/A" ? "Poster" : "No Poster";

    // Add error handling
    imgElement.onerror = function () {
      imgElement.src = posterPlaceholder;
      imgElement.alt = "No Poster Available";
    };

    return imgElement;
  }

  showMovieDetails(item) {
    const modalElements = {
      title: document.getElementById("modalTitle"),
      genre: document.getElementById("modalGenre"),
      rating: document.getElementById("modalRating"),
      plot: document.getElementById("modalPlot"),
      actors: document.getElementById("modalActors"),
      director: document.getElementById("modalDirector"),
      released: document.getElementById("modalReleased"),
      poster: document.getElementById("modalPoster"),
    };

    Object.entries({
      title: item.Title,
      genre: `Género: ${item.Genre || "Desconocido"}`,
      rating: `Valoración: ${item.imdbRating || "N/A"}`,
      plot: `Descripción: ${item.Plot || "No disponible"}`,
      actors: `Actores: ${item.Actors || "No disponibles"}`,
      director: `Director: ${item.Director || "No disponible"}`,
      released: `Estreno: ${item.Released || "No disponible"}`,
    }).forEach(([key, value]) => {
      modalElements[key].textContent = value;
    });

    // Manejo de la carga del póster
    const posterPlaceholder =
      "https://via.placeholder.com/400x600?text=No+Poster";

    const posterImage = new Image(); // Crear una nueva instancia de Image

    // Configurar manejador para cuando la imagen se carga
    posterImage.onload = function () {
      modalElements.poster.src = posterImage.src;
    };

    // Configurar manejador para errores de carga
    posterImage.onerror = function () {
      modalElements.poster.src = posterPlaceholder;
    };

    // Configurar un timeout para reemplazar si no carga en 5 segundos
    setTimeout(() => {
      if (!posterImage.complete) {
        modalElements.poster.src = posterPlaceholder;
      }
    }, 5000);

    // Intentar cargar el póster desde la URL original o usar el placeholder si no está disponible
    posterImage.src = item.Poster !== "N/A" ? item.Poster : posterPlaceholder;

    // Mostrar el modal y deshabilitar el scroll
    this.elements.modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  closeModalWindow() {
    this.elements.modal.style.display = "none";
    document.body.style.overflow = "";
  }

  handleModalClick(event) {
    if (event.target === this.elements.modal) {
      this.closeModalWindow();
    }
  }

  // Modificamos el método para incluir series en el conteo
  toggleCreateReportButton(show) {
    // Filtrar películas o series según el tipo de búsqueda actual
    const searchType = this.getSearchType();

    const moviesAndSeriesWithData = this.allLoadedMovies.filter((item) => {
      // Si estamos buscando películas, filtra solo películas
      if (searchType === "movie") {
        return (
          item.Type === "movie" &&
          item.imdbRating &&
          item.imdbVotes &&
          item.BoxOffice
        );
      }

      // Si estamos buscando series, filtra solo series
      if (searchType === "series") {
        return item.Type === "series" && item.imdbRating && item.imdbVotes;
      }
    });

    // Mostrar el botón si hay elementos con datos completos
    this.elements.createReportButton.style.display =
      moviesAndSeriesWithData.length > 0 ? "inline-block" : "none";
  }

  generateReport() {
    const searchType = this.getSearchType();

    // Filtrar películas y series según el tipo de búsqueda
    const itemsWithData = this.allLoadedMovies.filter((item) => {
      // Si busca películas, solo muestra películas
      if (searchType === "movie") {
        return (
          item.Type === "movie" &&
          item.imdbRating &&
          item.imdbVotes &&
          item.BoxOffice
        );
      }

      // Si busca series, solo muestra series
      if (searchType === "series") {
        return item.Type === "series" && item.imdbRating && item.imdbVotes;
      }
    });

    if (itemsWithData.length === 0) {
      this.elements.reportContent.innerHTML = `<p>No hay suficientes datos para generar el informe de ${
        searchType === "movie" ? "películas" : "series"
      }.</p>`;
      this.elements.reportModal.style.display = "block";
      return;
    }

    // Función para limpiar y convertir valores numéricos
    const cleanNumberValue = (value) => {
      if (typeof value === "string") {
        return parseFloat(value.replace(/[$,]/g, ""));
      }
      return parseFloat(value);
    };

    // Función de ordenamiento reutilizable
    const sortItems = (items, sortKey) =>
      items.sort(
        (a, b) => cleanNumberValue(b[sortKey]) - cleanNumberValue(a[sortKey])
      );

    // Configuración de rankings para reducir repetición
    const rankingConfigs =
      searchType === "movie"
        ? [
            {
              title: "Películas Mejor Valoradas",
              sortBy: "imdbRating",
              displayBy: "Rating",
              chartId: "rating-chart",
            },
            {
              title: "Películas Más Votadas",
              sortBy: "imdbVotes",
              displayBy: "Votos",
              chartId: "votes-chart",
            },
            {
              title: "Películas con Mejor Recaudación",
              sortBy: "BoxOffice",
              displayBy: "Recaudación",
              chartId: "boxoffice-chart",
            },
          ]
        : [
            {
              title: "Series Mejor Valoradas",
              sortBy: "imdbRating",
              displayBy: "Rating",
              chartId: "rating-chart",
            },
            {
              title: "Series Más Votadas",
              sortBy: "imdbVotes",
              displayBy: "Votos",
              chartId: "votes-chart",
            },
            {
              // Añadimos un gráfico para el año de inicio de las series
              title: "Series por Año de Inicio",
              sortBy: "Year",
              displayBy: "Año",
              chartId: "year-chart",
            },
          ];

    // Función para crear sección de ranking
    const createRankingSection = (config, items) => {
      const sortedItems = sortItems(items, config.sortBy).slice(0, 5);

      return `
      <div class="ranking-section">
        <h3>${config.title} (Total: ${items.length} elementos)</h3>
        <div class="ranking-content">
          <ul>
            ${sortedItems
              .map(
                (item) => `
                <li data-chart-id="${config.chartId}" data-title="${
                  item.Title
                }">
                  ${item.Title} (${item.Type}) - ${config.displayBy}: ${
                  item[config.sortBy]
                }
                </li>
              `
              )
              .join("")}
          </ul>
          <div id="${config.chartId}" class="d3-chart"></div>
        </div>
      </div>
    `;
    };

    // Generar contenido del informe
    const reportContent = rankingConfigs
      .map((config) => createRankingSection(config, itemsWithData))
      .join("");

    this.elements.reportContent.innerHTML = reportContent;
    this.elements.reportModal.style.display = "block";

    // Crear gráficos D3
    rankingConfigs.forEach((config) => {
      const sortedItems = sortItems(itemsWithData, config.sortBy).slice(0, 5);
      this.createD3BarChart(
        sortedItems,
        config.chartId,
        config.sortBy,
        config.title
      );
    });

    // Evento de interacción para resaltar elementos
    this.setupInteractiveHighlighting();
  }

  // Método separado para manejar el resaltado interactivo
  setupInteractiveHighlighting() {
    const listItems = document.querySelectorAll("li[data-chart-id]");
    listItems.forEach((item) => {
      const chartId = item.getAttribute("data-chart-id");
      const title = item.getAttribute("data-title");

      const highlightBar = (highlight) => {
        const bar = document.querySelector(
          `rect[data-chart-id="${chartId}"][data-title="${title}"]`
        );
        if (bar) {
          item.classList.toggle("hover", highlight);
          bar.setAttribute("fill", highlight ? "#ffcc00" : "#007bff");
        }
      };

      item.addEventListener("mouseover", () => highlightBar(true));
      item.addEventListener("mouseout", () => highlightBar(false));
    });
  }
  createD3BarChart(movies, chartId, valueKey, yAxisLabel) {
    // Clear previous chart
    d3.select(`#${chartId}`).html("");

    // Set up chart dimensions
    const margin = { top: 50, right: 180, bottom: 20, left: 20 };
    const width = 800 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // Create SVG
    const svg = d3
      .select(`#${chartId}`)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Prepare data con lógica mejorada para diferentes tipos de datos
    const processValue = (movie) => {
      switch (valueKey) {
        case "imdbRating":
          return parseFloat(movie[valueKey]);
        case "imdbVotes":
          return parseFloat(movie[valueKey].replace(/,/g, ""));
        case "BoxOffice":
          return movie[valueKey]
            ? parseFloat(movie[valueKey].replace(/\$/g, "").replace(/,/g, ""))
            : 0;
        case "Year":
          // Nuevo caso para manejar el año para series
          return parseInt(movie[valueKey]);
        default:
          return 0;
      }
    };

    const data = movies.map((movie) => ({
      title: movie.Title,
      value: processValue(movie),
    }));

    // Y scale
    const y = d3
      .scaleBand()
      .range([0, height])
      .padding(0.1)
      .domain(data.map((d) => d.title));

    // X scale
    const x = d3
      .scaleLinear()
      .range([0, width])
      .domain([0, d3.max(data, (d) => d.value)]);

    // Bars
    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("y", (d) => y(d.title))
      .attr("height", y.bandwidth())
      .attr("x", 0)
      .attr("width", (d) => x(d.value))
      .attr("fill", "#007bff")
      .attr("data-chart-id", chartId)
      .attr("data-title", (d) => d.title)
      .on("mouseover", function (event, d) {
        // Resaltar barra
        d3.select(this).attr("fill", "#ffcc00");

        // Resaltar <li> correspondiente
        const listItem = document.querySelector(
          `li[data-chart-id="${chartId}"][data-title="${d.title}"]`
        );
        if (listItem) listItem.classList.add("hover");
      })
      .on("mouseout", function (event, d) {
        // Quitar resaltado de la barra
        d3.select(this).attr("fill", "#007bff");

        // Quitar resaltado del <li> correspondiente
        const listItem = document.querySelector(
          `li[data-chart-id="${chartId}"][data-title="${d.title}"]`
        );
        if (listItem) listItem.classList.remove("hover");
      });

    // Value labels
    svg
      .selectAll(".value-label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "value-label")
      .attr("x", (d) => x(d.value) + 5)
      .attr("y", (d) => y(d.title) + y.bandwidth() / 2)
      .attr("alignment-baseline", "middle")
      .attr("fill", "white")
      .text((d) => {
        // Formato específico según el tipo de dato
        switch (valueKey) {
          case "imdbRating":
            return d.value.toFixed(1);
          case "imdbVotes":
            return d.value.toLocaleString();
          case "Year":
            return d.value;
          default:
            return d.value.toFixed(2);
        }
      });

    // X axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .attr("style", "color: white")
      .call(d3.axisBottom(x));

    // Y axis label
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "-1em")
      .attr("style", "color: white")
      .style("text-anchor", "middle")
      .text(yAxisLabel);
  }

  closeReportModal() {
    this.elements.reportModal.style.display = "none";
  }

  handleReportModalClick(event) {
    event.preventDefault();
    if (event.target === this.elements.reportModal) {
      this.closeReportModal();
    }
  }
}

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  new UIManager();
});
