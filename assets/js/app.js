/**
 * CA Saathi - Main Application JavaScript
 * 
 * This file handles:
 * 1. Sidebar navigation and mobile menu toggle
 * 2. Dynamic tool card rendering from tools.json
 * 3. Active navigation state management
 * 
 * No external dependencies required.
 */

(function () {
  'use strict';

  // ============================================
  // Configuration
  // ============================================

  /**
   * Path to tools.json file
   * Adjust this path based on your deployment structure
   */
  const TOOLS_JSON_PATH = getToolsJsonPath();

  /**
   * Determine the correct path to tools.json based on current page location
   * @returns {string} Path to tools.json
   */
  function getToolsJsonPath() {
    // Check if we're in a subdirectory (like /pages/)
    const path = window.location.pathname;
    if (path.includes('/pages/')) {
      return '../tools.json';
    }
    return './tools.json';
  }

  // ============================================
  // DOM Elements
  // ============================================

  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const toolsContainer = document.getElementById('toolsContainer');

  // ============================================
  // Sidebar Navigation
  // ============================================

  /**
   * Toggle sidebar visibility on mobile devices
   */
  function toggleSidebar() {
    if (sidebar && sidebarOverlay) {
      sidebar.classList.toggle('open');
      sidebarOverlay.classList.toggle('open');
      document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
    }
  }

  /**
   * Close sidebar (for mobile)
   */
  function closeSidebar() {
    if (sidebar && sidebarOverlay) {
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  /**
   * Set active navigation item based on current page
   */
  function setActiveNavItem() {
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
      item.classList.remove('active');

      const href = item.getAttribute('href');
      if (!href) return;

      // Normalize paths for comparison
      const normalizedHref = href.replace(/^\.\.\//, '').replace(/^\.\//, '');
      const normalizedPath = currentPath.replace(/^\//, '');

      // Check for exact match or index page
      if (
        currentPath.endsWith(normalizedHref) ||
        (normalizedHref === 'index.html' && (currentPath === '/' || currentPath.endsWith('/'))) ||
        normalizedPath.endsWith(normalizedHref)
      ) {
        item.classList.add('active');
      }
    });
  }

  // ============================================
  // Tool Cards Rendering
  // ============================================

  /**
   * Fetch tools data from JSON file
   * @returns {Promise<Array>} Array of tool objects
   */
  async function fetchTools() {
    try {
      const response = await fetch(TOOLS_JSON_PATH);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const tools = await response.json();
      return tools;
    } catch (error) {
      console.error('Error fetching tools:', error);
      return [];
    }
  }

  /**
   * Create HTML for a single tool card
   * @param {Object} tool - Tool data object
   * @returns {string} HTML string for the tool card
   */
  function createToolCard(tool) {
    const categoryClass = tool.category || 'compliance';

    return `
      <article class="tool-card" data-tool-id="${escapeHtml(tool.id)}">
        <header class="tool-card-header">
          <h3 class="tool-card-title">${escapeHtml(tool.name)}</h3>
          <span class="tool-card-category ${categoryClass}">${escapeHtml(tool.category)}</span>
        </header>
        <p class="tool-card-description">${escapeHtml(tool.description)}</p>
        <footer class="tool-card-footer">
          <span class="tool-card-version">Version ${escapeHtml(tool.version)}</span>
          <a href="${escapeHtml(tool.downloadUrl)}" 
             class="btn btn-primary" 
             target="_blank" 
             rel="noopener noreferrer"
             aria-label="Download ${escapeHtml(tool.name)}">
            <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            Download Tool
          </a>
        </footer>
      </article>
    `;
  }

  /**
   * Render loading state in tools container
   */
  function renderLoadingState() {
    if (!toolsContainer) return;

    toolsContainer.innerHTML = `
      <div class="tools-loading">
        <div class="loading-spinner"></div>
        <span>Loading tools...</span>
      </div>
    `;
  }

  /**
   * Render empty state when no tools are available
   */
  function renderEmptyState() {
    if (!toolsContainer) return;

    toolsContainer.innerHTML = `
      <div class="empty-state">
        <svg class="empty-state-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
        </svg>
        <h3 class="empty-state-title">No tools available</h3>
        <p class="empty-state-text">Check back soon for new toolkit additions.</p>
      </div>
    `;
  }

  /**
   * Render error state when tools fail to load
   * @param {string} message - Error message to display
   */
  function renderErrorState(message) {
    if (!toolsContainer) return;

    toolsContainer.innerHTML = `
      <div class="info-box warning">
        <svg class="info-box-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
        <span class="info-box-text">${escapeHtml(message)}</span>
      </div>
    `;
  }

  /**
   * Render all tool cards in the container
   * @param {Array} tools - Array of tool objects
   */
  function renderTools(tools) {
    if (!toolsContainer) return;

    if (!tools || tools.length === 0) {
      renderEmptyState();
      return;
    }

    const toolCardsHtml = tools.map(tool => createToolCard(tool)).join('');
    toolsContainer.innerHTML = toolCardsHtml;
  }

  /**
   * Initialize tools section - fetch and render tools
   */
  async function initializeTools() {
    if (!toolsContainer) return;

    renderLoadingState();

    try {
      const tools = await fetchTools();
      renderTools(tools);
    } catch (error) {
      console.error('Failed to initialize tools:', error);
      renderErrorState('Unable to load tools. Please refresh the page.');
    }
  }

  // ============================================
  // Utility Functions
  // ============================================

  /**
   * Escape HTML special characters to prevent XSS
   * @param {string} text - Text to escape
   * @returns {string} Escaped text
   */
  function escapeHtml(text) {
    if (typeof text !== 'string') return '';

    const escapeMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, char => escapeMap[char]);
  }

  // ============================================
  // Event Listeners
  // ============================================

  /**
   * Initialize all event listeners
   */
  function initializeEventListeners() {
    // Mobile menu toggle
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', toggleSidebar);
    }

    // Close sidebar when clicking overlay
    if (sidebarOverlay) {
      sidebarOverlay.addEventListener('click', closeSidebar);
    }

    // Close sidebar when pressing Escape key
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeSidebar();
      }
    });

    // Close sidebar when window is resized above mobile breakpoint
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        closeSidebar();
      }
    });
  }

  // ============================================
  // SPA Router - Smooth Navigation
  // ============================================

  /**
   * Cache for fetched pages to avoid re-fetching
   */
  const pageCache = new Map();

  /**
   * Check if a URL is internal (same origin, not external)
   * @param {string} href - The URL to check
   * @returns {boolean} True if internal
   */
  function isInternalLink(href) {
    if (!href) return false;
    if (href.startsWith('#')) return false;
    if (href.startsWith('http://') || href.startsWith('https://')) {
      try {
        const url = new URL(href);
        return url.origin === window.location.origin;
      } catch {
        return false;
      }
    }
    // Relative URLs are internal
    return true;
  }

  /**
   * Resolve a relative URL to absolute
   * @param {string} href - Relative or absolute URL
   * @returns {string} Absolute URL
   */
  function resolveUrl(href) {
    const a = document.createElement('a');
    a.href = href;
    return a.href;
  }

  /**
   * Fetch a page and extract the main-inner content
   * Uses XMLHttpRequest for file:// protocol compatibility
   * @param {string} url - URL to fetch
   * @returns {Promise<{content: string, title: string}>}
   */
  async function fetchPageContent(url) {
    // Check cache first
    if (pageCache.has(url)) {
      return pageCache.get(url);
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200 || xhr.status === 0) {
            // status 0 is valid for file:// protocol
            const html = xhr.responseText;
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const mainInner = doc.querySelector('.main-inner');
            const title = doc.querySelector('title')?.textContent || 'CA Saathi';

            const result = {
              content: mainInner ? mainInner.innerHTML : '',
              title: title
            };

            // Cache the result
            pageCache.set(url, result);
            resolve(result);
          } else {
            reject(new Error(`Failed to fetch ${url}: ${xhr.status}`));
          }
        }
      };

      xhr.onerror = function () {
        reject(new Error(`Network error fetching ${url}`));
      };

      xhr.send();
    });
  }

  /**
   * Navigate to a new page without full reload
   * @param {string} url - URL to navigate to
   * @param {boolean} pushState - Whether to push to history
   */
  async function navigateTo(url, pushState = true) {
    const mainInner = document.querySelector('.main-inner');
    if (!mainInner) {
      // Fallback to regular navigation
      window.location.href = url;
      return;
    }

    try {
      // Fade out current content
      mainInner.classList.add('spa-fade-out');

      // Fetch new content
      const { content, title } = await fetchPageContent(url);

      // Wait for fade out animation
      await new Promise(resolve => setTimeout(resolve, 150));

      // Swap content
      mainInner.innerHTML = content;

      // Update title
      document.title = title;

      // Update URL
      if (pushState) {
        history.pushState({ url }, title, url);
      }

      // Update active nav item
      setActiveNavItem();

      // Re-initialize tools if on home page
      if (document.getElementById('toolsContainer')) {
        initializeTools();
      }

      // Scroll to top
      window.scrollTo(0, 0);

      // Fade in new content
      mainInner.classList.remove('spa-fade-out');
      mainInner.classList.add('spa-fade-in');

      // Remove fade-in class after animation
      setTimeout(() => {
        mainInner.classList.remove('spa-fade-in');
      }, 300);

      // Close mobile sidebar if open
      closeSidebar();

    } catch (error) {
      console.error('SPA navigation failed:', error);
      // Fallback to regular navigation
      window.location.href = url;
    }
  }

  /**
   * Handle click events for SPA navigation
   * @param {Event} event - Click event
   */
  function handleLinkClick(event) {
    // Find the closest anchor tag
    const link = event.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');

    // Skip if not internal, has target, or has download attribute
    if (!isInternalLink(href)) return;
    if (link.target === '_blank') return;
    if (link.hasAttribute('download')) return;

    // Skip if modifier keys are pressed (for new tab, etc.)
    if (event.ctrlKey || event.metaKey || event.shiftKey) return;

    // Prevent default and navigate via SPA
    event.preventDefault();
    const absoluteUrl = resolveUrl(href);

    // Don't navigate if already on the same page
    if (absoluteUrl === window.location.href) return;

    navigateTo(absoluteUrl);
  }

  /**
   * Handle browser back/forward navigation
   * @param {PopStateEvent} event
   */
  function handlePopState(event) {
    if (event.state && event.state.url) {
      navigateTo(event.state.url, false);
    } else {
      // Reload current URL without pushing state
      navigateTo(window.location.href, false);
    }
  }

  /**
   * Preload a page on hover for faster navigation
   * @param {string} href - URL to preload
   */
  function preloadPage(href) {
    if (!isInternalLink(href)) return;
    const absoluteUrl = resolveUrl(href);
    if (!pageCache.has(absoluteUrl)) {
      fetchPageContent(absoluteUrl).catch(() => {
        // Silently ignore preload failures
      });
    }
  }

  /**
   * Initialize SPA router
   */
  function initializeSPARouter() {
    // Set initial state
    history.replaceState({ url: window.location.href }, document.title, window.location.href);

    // Listen for all clicks (event delegation)
    document.addEventListener('click', handleLinkClick);

    // Listen for back/forward navigation
    window.addEventListener('popstate', handlePopState);

    // Preload pages on hover
    document.addEventListener('mouseover', (event) => {
      const link = event.target.closest('a');
      if (link) {
        const href = link.getAttribute('href');
        if (href) {
          preloadPage(href);
        }
      }
    });

    console.log('SPA Router initialized');
  }

  // ============================================
  // Initialization
  // ============================================

  /**
   * Main initialization function
   * Called when DOM is fully loaded
   */
  function initialize() {
    // Set active navigation item
    setActiveNavItem();

    // Initialize event listeners
    initializeEventListeners();

    // Initialize tools if container exists (only on home page)
    initializeTools();

    // Initialize SPA router for smooth navigation
    initializeSPARouter();

    console.log('CA Saathi initialized successfully');
  }

  // Run initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }

})();
