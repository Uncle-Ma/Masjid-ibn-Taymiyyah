# Changelog

## February 12, 2026

- **Mission Statement Centering**: Added `text-align: center` to the `.mission-vision-section` class in `styles.css` to center the mission statement text in the index.html page.

- **Shared Components Refactor**: Refactored all HTML files to use shared navigation and footer components. Created `components/nav.html` and `components/footer.html`, and updated each page to load these dynamically using JavaScript fetch calls. This improves maintainability by centralizing common elements.

- **Footer Link Improvements**: Updated the footer component to make the phone number clickable with a `tel:` link (opens dialer) and the email address clickable with a `mailto:` link (opens email app), enhancing user interaction across all pages.

