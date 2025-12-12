# Thrive Thursdays Website

A single-page website for Thrive Thursdays / Health 4 All, built with Tailwind CSS and vanilla JavaScript.

## Project Structure

```
website/
├── index.html      # Main HTML file with all sections
├── script.js       # JavaScript for interactivity
├── assets/         # Directory for images, videos, and media files
└── README.md       # This file
```

## Setup Instructions

1. **No build step required** - This project uses Tailwind CSS via CDN, so no installation or build process is needed.

2. **Add your assets**:
   - Create an `assets/` directory in the project root
   - Add your images, videos, and other media files to the `assets/` directory
   - Update image paths in `index.html` to match your file names

3. **Open the website**:
   - Simply open `index.html` in a web browser
   - Or use a local development server (recommended):
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (if you have http-server installed)
     npx http-server
     ```
   - Then navigate to `http://localhost:8000` in your browser

## Content Customization

### Images to Add

Place the following images in the `assets/` directory:

- **Organizers**:
  - `organizer-1.jpg` - Photo of Doria Robinson
  - `organizer-2.jpg` - Photo of John Gioia

- **Events**:
  - `event-1.jpg`, `event-2.jpg`, `event-3.jpg` - Event photos

- **Media**:
  - `media-thumb-1.jpg`, `media-thumb-2.jpg` - Media thumbnails
  - `image-1.jpg` - Additional images
  - Video files: `video-1.mp4`, `video-2.mp4` (or update to YouTube/Vimeo URLs)

- **Partners**:
  - `partner-1.png`, `partner-2.png`, `partner-3.png`, `partner-4.png` - Partner logos

### Text Content

Update the following placeholder content in `index.html`:

1. **Organizers Section**: Replace `[Bio placeholder - add organizer bio here]` with actual bios
2. **Events Section**: Update event titles, dates, locations, and descriptions
3. **Media Section**: Update video/image titles
4. **Footer**: Add contact email and update social media links

### Video Integration

For YouTube videos:
- Update the `data-src` attribute in media items to your YouTube URL
- Example: `data-src="https://www.youtube.com/watch?v=VIDEO_ID"`

For Vimeo videos:
- Update the `data-src` attribute to your Vimeo URL
- Example: `data-src="https://vimeo.com/VIDEO_ID"`

## Features

- **Responsive Design**: Fully responsive across all device sizes
- **Smooth Scrolling**: Navigation links smoothly scroll to sections
- **Media Modals**: Click media items to view in full-screen modal
- **Mobile Menu**: Hamburger menu for mobile navigation
- **Newsletter Form**: Email subscription form with validation
- **Scroll Animations**: Sections fade in as you scroll

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Technologies Used

- **HTML5**: Semantic markup
- **Tailwind CSS**: Utility-first CSS framework (via CDN)
- **Vanilla JavaScript**: No frameworks or dependencies

## Notes

- All images have fallback placeholders that display if images are missing
- The newsletter form currently shows a success message but doesn't actually submit to a server (you'll need to add backend integration)
- Social media links in the footer are placeholders - update with actual URLs

## License

This project is created for Thrive Thursdays / Health 4 All.

