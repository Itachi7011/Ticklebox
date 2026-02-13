// js/ticklebox-main.js - FIXED VERSION

// Game Data - UPDATED WITH CORRECT PATHS
const TICKLEBOX_GAMES = [ 
  {
    id: "interactive-quiz", 
    title: "Interactive Quiz",
    icon: "❓",
    category: "Quiz",
    description: "Test your knowledge with fun quizzes and animated feedback",
    rating: 4.8,
    players: "1M+",
    url: "games/quiz.html",
  },
  {
    id: "personality-match",
    title: "Personality Match Test",
    icon: "💑",
    category: "Personality",
    description:
      "Discover relationship compatibility based on names and birthdays",
    rating: 4.9,
    players: "500K+",
    url: "games/personality-test.html",
  },
  {
    id: "pixel-art",
    title: "Pixel Art / Drawing Pad",
    icon: "🎨",
    category: "Creative",
    description: "Create and share collaborative doodles with friends",
    rating: 4.7,
    players: "2M+",
    url: "games/pixel-art.html",
  },
  {
    id: "scratch-off",
    title: "Scratch-Off Reveal Cards",
    icon: "🎴",
    category: "Fun",
    description: "Scratch to reveal hidden messages or surprise images",
    rating: 4.6,
    players: "800K+",
    url: "games/scratch-off.html",
  },
  {
    id: "spin-wheel",
    title: "Spin the Wheel",
    icon: "🎡",
    category: "Fun",
    description: "Spin for fun dares, gifts, or random messages",
    rating: 4.8,
    players: "1.5M+",
    url: "games/spin-wheel.html",
  },
  {
    id: "animated-story",
    title: "Animated Story Scroll",
    icon: "📜",
    category: "Story",
    description:
      "Scroll through interactive love stories with beautiful effects",
    rating: 4.9,
    players: "300K+",
    url: "games/animated-story.html",
  },
  {
    id: "mood-color",
    title: "Mood Color Shader",
    icon: "🌈",
    category: "Relaxation",
    description: "Change colors and ambiance with relaxing sounds",
    rating: 4.5,
    players: "400K+",
    url: "games/mood-color.html",
  },
  {
    id: "memory-game",
    title: "Memory Game",
    icon: "🧠",
    category: "Puzzle",
    description: "Flip cards to match photos and messages",
    rating: 4.7,
    players: "1.2M+",
    url: "games/memory-game.html",
  },
  {
    id: "countdown-timer",
    title: "Countdown Timer",
    icon: "⏰",
    category: "Utility",
    description: "Countdown to special events and anniversaries",
    rating: 4.8,
    players: "900K+",
    url: "games/countdown-timer.html",
  },
  {
    id: "voice-recorder",
    title: "Voice Message Recorder",
    icon: "🎤",
    category: "Audio",
    description: "Record and playback audio with fun filters",
    rating: 4.6,
    players: "600K+",
    url: "games/voice-recorder.html",
  },
  {
    id: "sticker-creator",
    title: "Custom Sticker Creator",
    icon: "🩷",
    category: "Creative",
    description: "Mix emojis and text to create cute stickers",
    rating: 4.7,
    players: "700K+",
    url: "games/sticker-creator.html",
  },
  {
    id: "fortune-cookies",
    title: "Mini Fortune Cookies",
    icon: "🥠",
    category: "Fun",
    description: "Click for sweet or funny daily fortunes",
    rating: 4.4,
    players: "500K+",
    url: "games/fortune-cookies.html",
  },
  {
    id: "love-map",
    title: "Love Map",
    icon: "🗺️",
    category: "Memory",
    description: "Mark and remember special visited locations",
    rating: 4.9,
    players: "350K+",
    url: "games/love-map.html",
  },
  {
    id: "countdown-snapshots",
    title: "Interactive Countdown Snapshots",
    icon: "📸",
    category: "Memory",
    description: "Click to reveal memories and photos",
    rating: 4.8,
    players: "450K+",
    url: "games/countdown-snapshots.html",
  },
  {
    id: "daily-affirmations",
    title: "Daily Affirmations Popup",
    icon: "💝",
    category: "Inspiration",
    description: "Get random love quotes and affirmations daily",
    rating: 4.7,
    players: "550K+",
    url: "games/daily-affirmations.html",
  },
];

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("TickleBox Main JS Loaded");

  // Initialize all components
  initTheme();
  initSearch();
  initDropdowns();
  initMobileMenu();
  initBackToTop();
  initModals();
  initFooter();

  // Load games into dropdown
  loadGamesDropdown();

  // Set current year in footer
  const currentYear = document.getElementById("tickleboxCurrentYear");
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Initialize game cards on homepage
  if (document.getElementById("tickleboxGameGrid")) {
    loadGamesGrid();
  }
});

// Theme Management
function initTheme() {
  const themeToggle = document.getElementById("tickleboxThemeToggle");
  const footerThemeToggle = document.getElementById(
    "tickleboxFooterThemeToggle",
  );

  // Get saved theme or default to light
  const savedTheme = localStorage.getItem("ticklebox-theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("ticklebox-theme", newTheme);

    // Dispatch custom event for theme change
    document.dispatchEvent(
      new CustomEvent("ticklebox-theme-change", {
        detail: { theme: newTheme },
      }),
    );
  };

  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
    console.log("Theme toggle initialized");
  }

  if (footerThemeToggle) {
    footerThemeToggle.addEventListener("click", toggleTheme);
  }
}

// Search Functionality - FIXED
function initSearch() {
  const searchInput = document.getElementById("tickleboxSearchInput");
  const searchResults = document.getElementById("tickleboxSearchResults");

  if (!searchInput || !searchResults) {
    console.log("Search elements not found");
    return;
  }

  console.log("Initializing search functionality");

  searchInput.addEventListener("input", function (e) {
    const query = e.target.value.toLowerCase().trim();

    // Clear results if query is empty
    if (!query) {
      searchResults.innerHTML = "";
      searchResults.style.display = "none";
      return;
    }

    // Filter games based on query
    const filteredGames = TICKLEBOX_GAMES.filter(
      (game) =>
        game.title.toLowerCase().includes(query) ||
        game.description.toLowerCase().includes(query) ||
        game.category.toLowerCase().includes(query),
    );

    // Display results
    if (filteredGames.length > 0) {
      searchResults.innerHTML = filteredGames
        .map(
          (game) => `
                <a href="${game.url}" class="ticklebox-search-result-item">
                    <span class="ticklebox-search-result-icon">${game.icon}</span>
                    <div class="ticklebox-search-result-info">
                        <div class="ticklebox-search-result-title">${game.title}</div>
                        <div class="ticklebox-search-result-category">${game.category}</div>
                    </div>
                </a>
            `,
        )
        .join("");
      searchResults.style.display = "block";

      // Add click event listeners to search results
      setTimeout(() => {
        document
          .querySelectorAll(".ticklebox-search-result-item")
          .forEach((link) => {
            link.addEventListener("click", (e) => {
              e.preventDefault();
              const href = link.getAttribute("href");
              console.log("Navigating to:", href);
              window.location.href = href;
            });
          });
      }, 0);
    } else {
      searchResults.innerHTML = `
                <div class="ticklebox-search-result-item">
                    <div class="ticklebox-search-result-info">
                        <div class="ticklebox-search-result-title">No games found</div>
                        <div class="ticklebox-search-result-category">Try different keywords</div>
                    </div>
                </div>
            `;
      searchResults.style.display = "block";
    }
  });

  // Hide results when clicking outside
  document.addEventListener("click", function (e) {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.style.display = "none";
    }
  });

  // Show search on mobile
  const searchButton = document.getElementById("tickleboxSearchButton");
  if (searchButton && window.innerWidth < 640) {
    searchButton.addEventListener("click", function () {
      const searchContainer = document.querySelector(
        ".ticklebox-search-container",
      );
      searchContainer.classList.toggle("show");
      if (searchContainer.classList.contains("show")) {
        searchInput.focus();
      }
    });
  }
}

// Dropdown Management - FIXED
function initDropdowns() {
  console.log("Initializing dropdowns");

  // Games dropdown
  const gamesDropdownBtn = document.getElementById("tickleboxGamesDropdown");
  const gamesDropdownContent = document.getElementById(
    "tickleboxGamesDropdownContent",
  );

  if (gamesDropdownBtn && gamesDropdownContent) {
    gamesDropdownBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      gamesDropdownContent.classList.toggle("show");
      console.log("Games dropdown toggled");
    });
  }

  // User dropdown
  const userBtn = document.getElementById("tickleboxUserBtn");
  const userDropdown = document.querySelector(".ticklebox-user-dropdown");

  if (userBtn && userDropdown) {
    userBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      userDropdown.classList.toggle("show");
    });
  }

  // Language dropdown
  const langBtn = document.getElementById("tickleboxLangBtn");
  const langDropdown = document.getElementById("tickleboxLangDropdown");

  if (langBtn && langDropdown) {
    langBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      langDropdown.classList.toggle("show");
    });

    // Language selection
    const langOptions = langDropdown.querySelectorAll(".ticklebox-lang-option");
    langOptions.forEach((option) => {
      option.addEventListener("click", function () {
        const lang = this.getAttribute("data-lang");
        // Here you would typically update the language
        console.log(`Language changed to: ${lang}`);
        langDropdown.classList.remove("show");
      });
    });
  }

  // Close dropdowns when clicking outside
  document.addEventListener("click", function () {
    document
      .querySelectorAll(".ticklebox-dropdown-content.show")
      .forEach((dropdown) => {
        dropdown.classList.remove("show");
      });
  });
}

// Mobile Menu - FIXED
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("tickleboxMobileMenuBtn");
  const mobileMenu = document.getElementById("tickleboxMobileMenu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", function () {
      mobileMenu.classList.toggle("show");

      // Animate hamburger icon
      const bars = this.querySelectorAll(".ticklebox-menu-bar");
      if (mobileMenu.classList.contains("show")) {
        bars[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        bars[1].style.opacity = "0";
        bars[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
      } else {
        bars[0].style.transform = "none";
        bars[1].style.opacity = "1";
        bars[2].style.transform = "none";
      }
    });

    // Load mobile menu content
    loadMobileMenu();
  }
}

function loadMobileMenu() {
  const mobileMenu = document.getElementById("tickleboxMobileMenu");
  if (!mobileMenu) return;

  mobileMenu.innerHTML = `
        <div class="ticklebox-mobile-nav">
            <a href="index.html" class="ticklebox-mobile-nav-link">
                <svg class="ticklebox-mobile-nav-icon" viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
                Home
            </a>
            <a href="#" class="ticklebox-mobile-nav-link">
                <svg class="ticklebox-mobile-nav-icon" viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM3 21.5h8v-8H3v8zm2-6h4v4H5v-4z"/>
                </svg>
                Featured
            </a>
            <a href="#" class="ticklebox-mobile-nav-link">
                <svg class="ticklebox-mobile-nav-icon" viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                </svg>
                Trending
            </a>
            
            <div class="ticklebox-mobile-divider"></div>
            
            <div class="ticklebox-mobile-section">
                <h3 class="ticklebox-mobile-section-title">Popular Games</h3>
                ${TICKLEBOX_GAMES.slice(0, 5)
                  .map(
                    (game) => `
                    <a href="${game.url}" class="ticklebox-mobile-game-link">
                        <span class="ticklebox-mobile-game-icon">${game.icon}</span>
                        <span class="ticklebox-mobile-game-title">${game.title}</span>
                    </a>
                `,
                  )
                  .join("")}
            </div>
            
            <div class="ticklebox-mobile-divider"></div>
            
            <div class="ticklebox-mobile-section">
                <h3 class="ticklebox-mobile-section-title">Account</h3>
                <a href="#" class="ticklebox-mobile-nav-link">
                    <svg class="ticklebox-mobile-nav-icon" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    My Profile
                </a>
                <a href="#" class="ticklebox-mobile-nav-link">
                    <svg class="ticklebox-mobile-nav-icon" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                    </svg>
                    My Games
                </a>
                <a href="#" class="ticklebox-mobile-nav-link">
                    <svg class="ticklebox-mobile-nav-icon" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                    Logout
                </a>
            </div>
        </div>
    `;

  // Add click event listeners to mobile menu links
  setTimeout(() => {
    document
      .querySelectorAll(
        ".ticklebox-mobile-nav-link, .ticklebox-mobile-game-link",
      )
      .forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const href = link.getAttribute("href");
          if (href && href !== "#") {
            console.log("Mobile menu navigation to:", href);
            window.location.href = href;
          }
        });
      });
  }, 0);
}

// Load games into dropdown - FIXED
function loadGamesDropdown() {
  const gamesDropdownContent = document.getElementById(
    "tickleboxGamesDropdownContent",
  );
  if (!gamesDropdownContent) return;

  // Group games by category
  const gamesByCategory = {};
  TICKLEBOX_GAMES.forEach((game) => {
    if (!gamesByCategory[game.category]) {
      gamesByCategory[game.category] = [];
    }
    gamesByCategory[game.category].push(game);
  });

  // Build dropdown content
  gamesDropdownContent.innerHTML = Object.entries(gamesByCategory)
    .map(
      ([category, games]) => `
        <div class="ticklebox-dropdown-category">
            <div class="ticklebox-dropdown-category-title">${category}</div>
            ${games
              .map(
                (game) => `
                <a href="${game.url}" class="ticklebox-dropdown-item">
                    <span class="ticklebox-dropdown-item-icon">${game.icon}</span>
                    ${game.title}
                </a>
            `,
              )
              .join("")}
        </div>
    `,
    )
    .join("");

  // Add click event listeners to dropdown links
  setTimeout(() => {
    document.querySelectorAll(".ticklebox-dropdown-item").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const href = link.getAttribute("href");
        console.log("Dropdown navigation to:", href);
        window.location.href = href;
      });
    });
  }, 0);
}

// Back to Top Button
function initBackToTop() {
  const backToTopBtn = document.getElementById("tickleboxBackToTop");

  if (!backToTopBtn) return;

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Modal Management
function initModals() {
  // Close modal when clicking outside
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("ticklebox-modal")) {
      e.target.classList.remove("show");
    }
  });

  // Close modal with escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      document.querySelectorAll(".ticklebox-modal.show").forEach((modal) => {
        modal.classList.remove("show");
      });
    }
  });
}

// Footer Initialization
function initFooter() {
  // Language dropdown in footer
  const langBtn = document.getElementById("tickleboxLangBtn");
  const langDropdown = document.getElementById("tickleboxLangDropdown");

  if (langBtn && langDropdown) {
    langBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      langDropdown.classList.toggle("show");
    });

    // Language selection
    const langOptions = langDropdown.querySelectorAll(".ticklebox-lang-option");
    langOptions.forEach((option) => {
      option.addEventListener("click", function () {
        const lang = this.getAttribute("data-lang");
        console.log(`Language changed to: ${lang}`);
        langDropdown.classList.remove("show");
      });
    });
  }

  // Footer links
  document.querySelectorAll(".ticklebox-footer-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      if (href && href !== "#") {
        window.location.href = href;
      }
    });
  });
}

// Share Functionality
function TickleboxShare(options) {
  const defaults = {
    title: "TickleBox - Fun Interactive Games",
    text: "Check out this amazing game on TickleBox!",
    url: window.location.href,
    image: null,
  };

  const config = { ...defaults, ...options };

  return {
    openModal: function () {
      // Create and show share modal
      const modal = document.createElement("div");
      modal.className = "ticklebox-modal";
      modal.innerHTML = `
                <div class="ticklebox-modal-content">
                    <div class="ticklebox-modal-header">
                        <div class="ticklebox-modal-title">Share</div>
                        <button class="ticklebox-modal-close">&times;</button>
                    </div>
                    <div class="ticklebox-modal-body">
                        <div class="ticklebox-share-options">
                            <a href="#" class="ticklebox-share-option" data-platform="facebook">
                                <svg class="ticklebox-share-icon" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                                </svg>
                                <span class="ticklebox-share-label">Facebook</span>
                            </a>
                            <a href="#" class="ticklebox-share-option" data-platform="twitter">
                                <svg class="ticklebox-share-icon" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                                </svg>
                                <span class="ticklebox-share-label">Twitter</span>
                            </a>
                            <a href="#" class="ticklebox-share-option" data-platform="whatsapp">
                                <svg class="ticklebox-share-icon" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M16.75 13.96c.25.13.41.2.46.3.06.11.04.61-.21 1.18-.2.56-1.24 1.1-1.7 1.12-.46.02-.47.36-2.96-.73-2.49-1.09-3.99-3.75-4.11-3.92-.12-.17-.96-1.38-.92-2.61.05-1.22.69-1.8.95-2.04.24-.26.51-.29.68-.26h.47c.15 0 .36-.06.55.45l.69 1.87c.06.13.1.28.01.44l-.27.41-.39.42c-.12.12-.26.25-.12.5.12.26.62 1.09 1.32 1.78.91.88 1.71 1.17 1.95 1.3.24.14.39.12.54-.04l.81-.94c.19-.25.35-.19.58-.11l1.67.88M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10c-1.97 0-3.8-.57-5.35-1.55L2 22l1.55-4.65A9.969 9.969 0 0 1 2 12 10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8c0 1.72.54 3.31 1.46 4.61L4.5 19.5l2.89-.96A7.95 7.95 0 0 0 12 20a8 8 0 0 0 8-8 8 8 0 0 0-8-8z"/>
                                </svg>
                                <span class="ticklebox-share-label">WhatsApp</span>
                            </a>
                            <a href="#" class="ticklebox-share-option" data-platform="copy">
                                <svg class="ticklebox-share-icon" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                                </svg>
                                <span class="ticklebox-share-label">Copy Link</span>
                            </a>
                        </div>
                        <div class="ticklebox-share-link">
                            <input type="text" class="ticklebox-share-input" value="${config.url}" readonly>
                            <button class="ticklebox-share-copy">Copy</button>
                        </div>
                    </div>
                </div>
            `;

      document.body.appendChild(modal);

      // Add event listeners
      setTimeout(() => modal.classList.add("show"), 10);

      // Close button
      modal
        .querySelector(".ticklebox-modal-close")
        .addEventListener("click", () => {
          modal.classList.remove("show");
          setTimeout(() => modal.remove(), 300);
        });

      // Share options
      modal.querySelectorAll(".ticklebox-share-option").forEach((option) => {
        option.addEventListener("click", function (e) {
          e.preventDefault();
          const platform = this.getAttribute("data-platform");
          shareToPlatform(platform, config);
        });
      });

      // Copy link
      modal
        .querySelector(".ticklebox-share-copy")
        .addEventListener("click", function () {
          const input = modal.querySelector(".ticklebox-share-input");
          input.select();
          document.execCommand("copy");

          const originalText = this.textContent;
          this.textContent = "Copied!";
          this.style.backgroundColor = "#10b981";

          setTimeout(() => {
            this.textContent = originalText;
            this.style.backgroundColor = "";
          }, 2000);
        });

      // Close modal when clicking outside
      modal.addEventListener("click", function (e) {
        if (e.target === modal) {
          modal.classList.remove("show");
          setTimeout(() => modal.remove(), 300);
        }
      });
    },

    shareToPlatform: function (platform) {
      shareToPlatform(platform, config);
    },
  };
}

function shareToPlatform(platform, config) {
  const shareUrl = encodeURIComponent(config.url);
  const shareText = encodeURIComponent(config.text);
  const shareTitle = encodeURIComponent(config.title);

  let url = "";

  switch (platform) {
    case "facebook":
      url = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
      break;
    case "twitter":
      url = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`;
      break;
    case "whatsapp":
      url = `https://wa.me/?text=${shareText}%20${shareUrl}`;
      break;
    case "copy":
      navigator.clipboard.writeText(config.url).then(() => {
        alert("Link copied to clipboard!");
      });
      return;
  }

  if (url) {
    window.open(url, "_blank", "width=600,height=400");
  }
}

// Load games grid for homepage - FIXED
function loadGamesGrid() {
  const grid = document.getElementById("tickleboxGameGrid");
  if (!grid) {
    console.log("Game grid not found");
    return;
  }

  console.log("Loading games grid with", TICKLEBOX_GAMES.length, "games");

  grid.innerHTML = TICKLEBOX_GAMES.map(
    (game) => `
        <div class="ticklebox-game-card" data-game-url="${game.url}">
            <div class="ticklebox-game-card-header">
                <span class="ticklebox-game-card-icon">${game.icon}</span>
                <span class="ticklebox-game-card-badge">Popular</span>
            </div>
            <div class="ticklebox-game-card-content">
                <h3 class="ticklebox-game-card-title">${game.title}</h3>
                <p class="ticklebox-game-card-description">${game.description}</p>
                <div class="ticklebox-game-card-meta">
                    <div class="ticklebox-game-card-rating">
                        ⭐ ${game.rating}
                    </div>
                    <div class="ticklebox-game-card-players">
                        👥 ${game.players}
                    </div>
                </div>
            </div>
        </div>
    `,
  ).join("");

  // Add click event listeners to game cards
  document.querySelectorAll(".ticklebox-game-card").forEach((card) => {
    card.addEventListener("click", function () {
      const url = this.getAttribute("data-game-url");
      if (url) {
        console.log("Navigating to game:", url);
        window.location.href = url;
      }
    });

    // Add hover effect
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-4px)";
      this.style.boxShadow = "var(--ticklebox-shadow-xl)";
      this.style.borderColor = "var(--ticklebox-primary)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "var(--ticklebox-shadow)";
      this.style.borderColor = "var(--ticklebox-border)";
    });
  });

  console.log("Games grid loaded successfully");
}

// Export to global scope
window.TickleboxShare = TickleboxShare;
window.TICKLEBOX_GAMES = TICKLEBOX_GAMES;
window.loadGamesGrid = loadGamesGrid;
window.loadGamesDropdown = loadGamesDropdown;
