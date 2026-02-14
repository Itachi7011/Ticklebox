// create-missing-games.js
const fs = require("fs");
const path = require("path");

const missingGames = [
  "animated-story",
  "mood-color",
  "countdown-timer",
  "voice-recorder",
  "sticker-creator",
  "fortune-cookies",
  "love-map",
  "countdown-snapshots",
  "daily-affirmations",
];

missingGames.forEach((game) => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${game.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())} - TickleBox</title>
    <link rel="stylesheet" href="../css/ticklebox-styles.css">
    <link rel="stylesheet" href="../css/ticklebox-animations.css">
    <style>
        .ticklebox-game-placeholder {
            text-align: center;
            padding: var(--ticklebox-space-xl);
            max-width: 600px;
            margin: 0 auto;
        }
        
        .ticklebox-game-placeholder-icon {
            font-size: 4rem;
            margin-bottom: var(--ticklebox-space);
            animation: ticklebox-float 3s infinite ease-in-out;
        }
        
        .ticklebox-game-placeholder-title {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: var(--ticklebox-space);
            color: var(--ticklebox-primary);
        }
        
        .ticklebox-game-placeholder-message {
            font-size: 1.1rem;
            color: var(--ticklebox-text-secondary);
            margin-bottom: var(--ticklebox-space-lg);
            line-height: 1.6;
        }
        
        .ticklebox-game-placeholder-coming {
            background: var(--ticklebox-bg-secondary);
            border-radius: var(--ticklebox-radius-lg);
            padding: var(--ticklebox-space);
            margin: var(--ticklebox-space) 0;
            border-left: 4px solid var(--ticklebox-primary);
        }
    </style>
</head>
<body>
    <!-- components/navbar.html - FIXED VERSION -->
<nav class="ticklebox-navbar" id="tickleboxNavbar">
  <div class="ticklebox-navbar-container">
    <!-- Logo -->
    <div class="ticklebox-navbar-logo">
      <a href="index.html" class="ticklebox-logo-link">
        <span class="ticklebox-logo-icon">🎮</span>
        <span class="ticklebox-logo-text">TickleBox</span>
      </a>
    </div>

    <!-- Search Bar -->
    <div class="ticklebox-search-container">
      <div class="ticklebox-search-wrapper">
        <input
          type="text"
          class="ticklebox-search-input"
          id="tickleboxSearchInput"
          placeholder="Search games..."
          aria-label="Search games"
        />
        <button class="ticklebox-search-button" id="tickleboxSearchButton">
          <svg
            class="ticklebox-search-icon"
            viewBox="0 0 24 24"
            width="20"
            height="20"
          >
            <path
              fill="currentColor"
              d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
            />
          </svg>
        </button>
        <!-- Search Results Dropdown -->
        <div class="ticklebox-search-results" id="tickleboxSearchResults"></div>
      </div>
    </div>

    <!-- Navigation Links -->
    <div class="ticklebox-nav-links">
      <div class="ticklebox-nav-dropdown">
        <button class="ticklebox-dropdown-btn" id="tickleboxGamesDropdown">
          <span>Games</span>
          <svg
            class="ticklebox-dropdown-arrow"
            viewBox="0 0 24 24"
            width="16"
            height="16"
          >
            <path fill="currentColor" d="M7 10l5 5 5-5z" />
          </svg>
        </button>
        <div
          class="ticklebox-dropdown-content"
          id="tickleboxGamesDropdownContent"
        >
          <!-- Will be populated by JavaScript -->
        </div>
      </div>

      <a href="index.html" class="ticklebox-nav-link">Home</a>
      <a
        href="#featured"
        class="ticklebox-nav-link"
        onclick="
          event.preventDefault();
          document
            .getElementById('tickleboxGames')
            ?.scrollIntoView({ behavior: 'smooth' });
        "
        >Featured</a
      >
      <a
        href="#trending"
        class="ticklebox-nav-link"
        onclick="
          event.preventDefault();
          document
            .getElementById('tickleboxGames')
            ?.scrollIntoView({ behavior: 'smooth' });
        "
        >Trending</a
      >

      <!-- Dark/Light Mode Toggle -->
      <button
        class="ticklebox-theme-toggle"
        id="tickleboxThemeToggle"
        aria-label="Toggle dark mode"
      >
        <span class="ticklebox-theme-icon ticklebox-theme-sun">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path
              fill="currentColor"
              d="M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5 S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1 s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0 c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95 c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41 L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41 s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06 c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"
            />
          </svg>
        </span>
        <span class="ticklebox-theme-icon ticklebox-theme-moon">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path
              fill="currentColor"
              d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"
            />
          </svg>
        </span>
      </button>

      <!-- User Menu -->
      <div class="ticklebox-nav-dropdown">
        <button class="ticklebox-user-btn" id="tickleboxUserBtn">
          <span class="ticklebox-user-avatar">👤</span>
        </button>
        <div class="ticklebox-dropdown-content ticklebox-user-dropdown">
          <a
            href="#"
            class="ticklebox-dropdown-item"
            onclick="event.preventDefault()"
          >
            <svg
              class="ticklebox-dropdown-icon"
              viewBox="0 0 24 24"
              width="16"
              height="16"
            >
              <path
                fill="currentColor"
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
              />
            </svg>
            My Profile
          </a>
          <a
            href="#"
            class="ticklebox-dropdown-item"
            onclick="event.preventDefault()"
          >
            <svg
              class="ticklebox-dropdown-icon"
              viewBox="0 0 24 24"
              width="16"
              height="16"
            >
              <path
                fill="currentColor"
                d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"
              />
            </svg>
            My Games
          </a>
          <div class="ticklebox-dropdown-divider"></div>
          <a
            href="#"
            class="ticklebox-dropdown-item"
            onclick="event.preventDefault()"
          >
            <svg
              class="ticklebox-dropdown-icon"
              viewBox="0 0 24 24"
              width="16"
              height="16"
            >
              <path
                fill="currentColor"
                d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"
              />
            </svg>
            Settings
          </a>
          <a
            href="#"
            class="ticklebox-dropdown-item"
            onclick="event.preventDefault()"
          >
            <svg
              class="ticklebox-dropdown-icon"
              viewBox="0 0 24 24"
              width="16"
              height="16"
            >
              <path
                fill="currentColor"
                d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"
              />
            </svg>
            Logout
          </a>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Button -->
    <button
      class="ticklebox-mobile-menu-btn"
      id="tickleboxMobileMenuBtn"
      aria-label="Toggle mobile menu"
    >
      <span class="ticklebox-menu-bar"></span>
      <span class="ticklebox-menu-bar"></span>
      <span class="ticklebox-menu-bar"></span>
    </button>
  </div>

  <!-- Mobile Menu -->
  <div class="ticklebox-mobile-menu" id="tickleboxMobileMenu">
    <!-- Mobile content will be populated by JavaScript -->
  </div>
</nav>

    <div id="tickleboxNavbarContainer"></div>

    <main class="ticklebox-container">
        <div class="ticklebox-game-header">
            <div class="ticklebox-game-header-icon">🎮</div>
            <div class="ticklebox-game-header-info">
                <h1 class="ticklebox-game-title">${game.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}</h1>
                <p class="ticklebox-game-subtitle">Game coming soon!</p>
                <div class="ticklebox-game-meta">
                    <span class="ticklebox-game-rating">⭐ Coming Soon</span>
                    <span class="ticklebox-game-category">🎮 TickleBox</span>
                    <span class="ticklebox-game-time">⏱️ Soon</span>
                </div>
            </div>
            <button class="ticklebox-game-share" id="tickleboxGameShare">
                <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                </svg>
                Share
            </button>
        </div>

        <div class="ticklebox-game-content">
            <div class="ticklebox-game-placeholder">
                <div class="ticklebox-game-placeholder-icon">🚧</div>
                <h2 class="ticklebox-game-placeholder-title">Under Construction</h2>
                <p class="ticklebox-game-placeholder-message">
                    This amazing game is currently being developed! Check back soon for an 
                    incredible interactive experience that will be worth the wait.
                </p>
                <div class="ticklebox-game-placeholder-coming">
                    <p><strong>Coming Features:</strong></p>
                    <ul style="text-align: left; margin: var(--ticklebox-space-sm) 0;">
                        <li>Interactive gameplay</li>
                        <li>Beautiful animations</li>
                        <li>Share functionality</li>
                        <li>Dark/light mode support</li>
                        <li>Mobile responsive design</li>
                    </ul>
                </div>
                <a href="index.html" class="ticklebox-btn-primary">
                    ← Back to Homepage
                </a>
            </div>
        </div>
    </main>

   <!-- components/footer.html - FIXED VERSION -->
<footer class="ticklebox-footer" id="tickleboxFooter">
    <div class="ticklebox-footer-container">
        <!-- Footer Top Section -->
        <div class="ticklebox-footer-top">
            <div class="ticklebox-footer-brand">
                <a href="index.html" class="ticklebox-footer-logo">
                    <span class="ticklebox-logo-icon">🎮</span>
                    <span class="ticklebox-logo-text">TickleBox</span>
                </a>
                <p class="ticklebox-footer-tagline">Where fun meets creativity - endless interactive games for everyone!</p>
                <div class="ticklebox-footer-social">
                    <a href="https://facebook.com" class="ticklebox-social-link" aria-label="Facebook" target="_blank">
                        <svg class="ticklebox-social-icon" viewBox="0 0 24 24" width="20" height="20">
                            <path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                        </svg>
                    </a>
                    <a href="https://twitter.com" class="ticklebox-social-link" aria-label="Twitter" target="_blank">
                        <svg class="ticklebox-social-icon" viewBox="0 0 24 24" width="20" height="20">
                            <path fill="currentColor" d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                        </svg>
                    </a>
                    <a href="https://instagram.com" class="ticklebox-social-link" aria-label="Instagram" target="_blank">
                        <svg class="ticklebox-social-icon" viewBox="0 0 24 24" width="20" height="20">
                            <path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                    </a>
                    <a href="https://youtube.com" class="ticklebox-social-link" aria-label="YouTube" target="_blank">
                        <svg class="ticklebox-social-icon" viewBox="0 0 24 24" width="20" height="20">
                            <path fill="currentColor" d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15l5-3-5-3v6z"/>
                        </svg>
                    </a>
                </div>
            </div>

            <div class="ticklebox-footer-links">
                <div class="ticklebox-footer-column">
                    <h3 class="ticklebox-footer-heading">Games</h3>
                    <ul class="ticklebox-footer-list">
                        <li><a href="games/quiz.html" class="ticklebox-footer-link">Interactive Quiz</a></li>
                        <li><a href="games/personality-test.html" class="ticklebox-footer-link">Personality Match</a></li>
                        <li><a href="games/pixel-art.html" class="ticklebox-footer-link">Pixel Art Pad</a></li>
                        <li><a href="games/scratch-off.html" class="ticklebox-footer-link">Scratch-Off Cards</a></li>
                        <li><a href="games/spin-wheel.html" class="ticklebox-footer-link">Spin the Wheel</a></li>
                    </ul>
                </div>

                <div class="ticklebox-footer-column">
                    <h3 class="ticklebox-footer-heading">Company</h3>
                    <ul class="ticklebox-footer-list">
                        <li><a href="#" class="ticklebox-footer-link" onclick="event.preventDefault()">About Us</a></li>
                        <li><a href="#" class="ticklebox-footer-link" onclick="event.preventDefault()">Careers</a></li>
                        <li><a href="#" class="ticklebox-footer-link" onclick="event.preventDefault()">Press</a></li>
                        <li><a href="#" class="ticklebox-footer-link" onclick="event.preventDefault()">Blog</a></li>
                        <li><a href="#" class="ticklebox-footer-link" onclick="event.preventDefault()">Contact</a></li>
                    </ul>
                </div>

                <div class="ticklebox-footer-column">
                    <h3 class="ticklebox-footer-heading">Support</h3>
                    <ul class="ticklebox-footer-list">
                        <li><a href="#" class="ticklebox-footer-link" onclick="event.preventDefault()">Help Center</a></li>
                        <li><a href="#" class="ticklebox-footer-link" onclick="event.preventDefault()">Community</a></li>
                        <li><a href="#" class="ticklebox-footer-link" onclick="event.preventDefault()">Safety</a></li>
                        <li><a href="#" class="ticklebox-footer-link" onclick="event.preventDefault()">Privacy Policy</a></li>
                        <li><a href="#" class="ticklebox-footer-link" onclick="event.preventDefault()">Terms of Service</a></li>
                    </ul>
                </div>

                <div class="ticklebox-footer-column">
                    <h3 class="ticklebox-footer-heading">Resources</h3>
                    <ul class="ticklebox-footer-list">
                        <li><a href="#" class="ticklebox-footer-link" onclick="event.preventDefault()">Game Guides</a></li>
                        <li><a href="#" class="ticklebox-footer-link" onclick="event.preventDefault()">API</a></li>
                        <li><a href="#" class="ticklebox-footer-link" onclick="event.preventDefault()">Partners</a></li>
                        <li><a href="#" class="ticklebox-footer-link" onclick="event.preventDefault()">Creators</a></li>
                        <li><a href="#" class="ticklebox-footer-link" onclick="event.preventDefault()">Newsletter</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Footer Bottom Section -->
        <div class="ticklebox-footer-bottom">
            <div class="ticklebox-footer-copyright">
                <p>&copy; <span id="tickleboxCurrentYear"></span> TickleBox. All rights reserved.</p>
                <p>Made with <span class="ticklebox-heart">❤️</span> for fun lovers everywhere</p>
            </div>
            
            <div class="ticklebox-footer-actions">
                <!-- Dark/Light Mode Toggle -->
                <button class="ticklebox-footer-theme-toggle" id="tickleboxFooterThemeToggle" aria-label="Toggle dark mode">
                    <svg class="ticklebox-footer-theme-icon ticklebox-footer-theme-sun" viewBox="0 0 24 24" width="16" height="16">
                        <path fill="currentColor" d="M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5 S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1 s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0 c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95 c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41 L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41 s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06 c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"/>
                    </svg>
                    <svg class="ticklebox-footer-theme-icon ticklebox-footer-theme-moon" viewBox="0 0 24 24" width="16" height="16">
                        <path fill="currentColor" d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"/>
                    </svg>
                </button>

                <div class="ticklebox-footer-lang">
                    <button class="ticklebox-lang-btn" id="tickleboxLangBtn">
                        <svg class="ticklebox-lang-icon" viewBox="0 0 24 24" width="16" height="16">
                            <path fill="currentColor" d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
                        </svg>
                        English
                        <svg class="ticklebox-lang-arrow" viewBox="0 0 24 24" width="12" height="12">
                            <path fill="currentColor" d="M7 10l5 5 5-5z"/>
                        </svg>
                    </button>
                    <div class="ticklebox-lang-dropdown" id="tickleboxLangDropdown">
                        <button class="ticklebox-lang-option" data-lang="en">English</button>
                        <button class="ticklebox-lang-option" data-lang="es">Español</button>
                        <button class="ticklebox-lang-option" data-lang="fr">Français</button>
                        <button class="ticklebox-lang-option" data-lang="de">Deutsch</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  
    <!-- Back to Top Button -->
    <button class="ticklebox-back-to-top" id="tickleboxBackToTop" aria-label="Back to top">
        <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/>
        </svg>
    </button>
</footer>
    <div id="tickleboxFooterContainer"></div>

    <script src="../js/ticklebox-main.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Load navbar and footer
            fetch('../components/navbar.html')
                .then(response => response.text())
                .then(html => {
                    document.getElementById('tickleboxNavbarContainer').innerHTML = html;
                    if (typeof initTheme === 'function') initTheme();
                    if (typeof initSearch === 'function') initSearch();
                    if (typeof initDropdowns === 'function') initDropdowns();
                    if (typeof initMobileMenu === 'function') initMobileMenu();
                });
            
            fetch('../components/footer.html')
                .then(response => response.text())
                .then(html => {
                    document.getElementById('tickleboxFooterContainer').innerHTML = html;
                    if (typeof initFooter === 'function') initFooter();
                });
            
            // Share button
            document.getElementById('tickleboxGameShare').addEventListener('click', () => {
                const share = new TickleboxShare({
                    title: '${game.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())} - TickleBox',
                    text: 'Check out this amazing game coming soon to TickleBox!',
                    url: window.location.href
                });
                share.openModal();
            });
        });
    </script>
</body>
</html>`;

  const filePath = path.join(__dirname, "games", `${game}.html`);
  fs.writeFileSync(filePath, html);
  console.log(`Created: ${game}.html`);
});

console.log("All placeholder game files created!");
