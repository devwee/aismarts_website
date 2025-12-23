# Aismarts Marketing Website

A modern, minimalist marketing website for Aismarts - an Australian AI startup building intelligent decision-making tools.

## Project Structure

```
aismarts_website/
├── index.html              # Home page
├── solutions.html          # Solutions overview page
├── plateworth.html         # PlateWorth product page
├── about.html              # About & Founders page
├── contact.html            # Contact page
├── assets/
│   ├── css/
│   │   └── styles.css      # Main stylesheet
│   ├── js/
│   │   └── script.js       # JavaScript for mobile nav & animations
│   └── images/             # Image assets folder (add your images here)
└── README.md               # This file
```

## Features

- **Fully Responsive**: Mobile-first design that works on all devices
- **Modern UI**: Clean, minimalist design with rounded containers and soft shadows
- **Brand Colors**:
  - Dark Navy: `#0f172a`
  - Deep Blue: `#27267e`
  - Green: `#10b981`
- **Interactive Elements**: Smooth hover effects and transitions
- **Mobile Navigation**: Hamburger menu for mobile devices
- **Scroll Animations**: Fade-in effects as you scroll
- **No Dependencies**: Pure HTML, CSS, and JavaScript (no frameworks)

## Pages

1. **Home** - Hero section, company overview, PlateWorth preview, vision, and future products
2. **Solutions** - Product cards and methodology overview
3. **PlateWorth** - Detailed product page with how it works, benefits, and examples
4. **About** - Company story, mission/vision, founders, and AI approach
5. **Contact** - Contact information and reasons to get in touch

## How to Use

### Option 1: Open Directly in Browser
Simply double-click on `index.html` to open the website in your default browser.

### Option 2: Local Development Server (Recommended)
Using Python:
```bash
cd aismarts_website
python -m http.server 8000
```
Then open: `http://localhost:8000`

Using Node.js (with npx):
```bash
npx http-server -p 8000
```

## Adding Images

Place your image files in the `assets/images/` folder and reference them in your HTML like this:

```html
<img src="assets/images/your-image.png" alt="Description">
```

### Recommended Images to Add:
- `logo.png` or `logo.svg` - Company logo for header
- `hero-image.png` - Hero section visual
- `plateworth-demo.png` - Screenshot or mockup of PlateWorth
- `founder-1.jpg`, `founder-2.jpg`, `founder-3.jpg` - Founder photos

## Customization

### Updating Colors
Edit the CSS custom properties in `assets/css/styles.css`:
```css
:root {
    --color-dark-navy: #0f172a;
    --color-deep-blue: #27267e;
    --color-green: #10b981;
    /* etc... */
}
```

### Modifying Content
All content is in the HTML files. Simply edit the text within the HTML tags.

### Adding Pages
1. Create a new HTML file in the root directory
2. Copy the header and footer from an existing page
3. Link to `assets/css/styles.css` and `assets/js/script.js`
4. Add navigation links in all pages

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Technologies

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript (ES6+)
- IntersectionObserver API for scroll animations

## Contact

Email: info@aismarts.com.au
Location: Clayton, VIC 3168, Australia
Company: MKB Solutions Pty Ltd (ABN 48 688 115 200)

## License

© 2025 Aismarts. All rights reserved.
