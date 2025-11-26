# Overview

This is a personal portfolio website for M Hilmi (MHFADEV), showcasing professional skills in web development and IT support. The portfolio features a modern, responsive design with dark/light theme support and includes dedicated gallery sections for coding projects and IT support activities. The application presents a comprehensive view of the developer's capabilities through interactive animations, 3D visual effects, and detailed project documentation.

## Recent Changes (November 22, 2025)
- **700 New Mascot Expressions**: Added 700 entertaining Indonesian dialog variations across 10 mood categories (70 per mood: happy, excited, curious, playful, sleepy, sad, scared, sassy, spooky, coding)
- **Cyber Jelly Personality**: Enhanced mascot personality with Gen Z slang, tsundere/manja/jail characteristics, featuring lucu (funny), gemas (cute), and ngeselin (endearing) expressions
- **Cyan-Blue Jelly Design**: Transformed mascot from ball shape to jelly blob with cyan-blue gradient (#06b6d4, #22d3ee, #67e8f9, #a5f3fc) matching portfolio theme
- **Vercel Deployment Setup**: Complete production-ready Vercel configuration (vercel.json, api/index.py, .vercelignore, requirements.txt)
- **Gallery Page Redesign**: Complete elegant redesign of the album/gallery section with professional typography, gradient overlays, enhanced shadows, and smooth hover animations
- **Professional Typography**: Implemented Inter font for body text and Playfair Display for headings, creating a sophisticated and clean visual hierarchy
- **Fixed Mascot Duplication**: Resolved duplicate mascot issue by removing manual initialization from gallery.html
- **Enhanced Visual Effects**: Added custom scrollbar styling, elegant lightbox with blur backdrop, icon rotation effects, and gradient animations

## Previous Changes (November 19, 2025)
- **AI-Powered Mascot System**: Upgraded Tech Buddy mascot with advanced AI personality system featuring 8 mood states (happy, excited, curious, playful, sleepy, sad, scared, sassy, spooky)
- **200+ Dialog Variations**: Implemented mood-based dialog system with lucu (funny), imut (cute), and serem (spooky) variations
- **Truly Random Behavior**: Autonomous decision-making system with unpredictable movement patterns, personality evolution, and mood transitions
- **EmailJS Integration**: Contact form configured to use EmailJS for client-side email functionality (credentials: service_e7rkx8l, template_09qycw9)

# User Preferences

Preferred communication style: Simple, everyday language (Bahasa Indonesia preferred)

**Important Notes:**
- User prefers EmailJS over SendGrid for email functionality
- Mascot should have autonomous AI personality with random, unpredictable behavior
- Dialog should vary between funny, cute, and occasionally spooky

# System Architecture

## Frontend Architecture
The application uses a modern frontend stack with:
- **HTML5 with Jinja2 templating** for server-side rendering
- **Tailwind CSS** for utility-first styling with custom configuration
- **Three.js** for 3D background animations and visual effects
- **GSAP** for advanced animations and transitions
- **Font Awesome** for iconography

The frontend follows a responsive design pattern with mobile-first approach, featuring:
- Dark/light theme toggle with localStorage persistence
- Interactive floating elements and particle systems
- Smooth scrolling and parallax effects
- Mobile-responsive navigation with hamburger menu

## Backend Architecture
Built on **Flask** web framework with:
- **Route-based architecture** separating main portfolio and gallery views
- **Template rendering** using Jinja2 for dynamic content generation
- **Static file serving** for CSS, JavaScript, and asset management
- **Environment-based configuration** for session management

Key architectural decisions:
- Simple MVC pattern with Flask handling routing and templating
- Gallery data stored as in-memory dictionaries for quick access
- Modular JavaScript organization with separate files for animations and 3D scenes

## Data Management
The application uses:
- **In-memory data storage** for gallery content (images, titles, descriptions)
- **localStorage** for theme preference persistence
- **Static assets** hosted via external CDNs (Unsplash for images)

## Styling and Animation System
- **Tailwind CSS** with custom extensions for animations and color schemes
- **Custom CSS** for complex animations like yin-yang loader and floating elements
- **GSAP animation library** for smooth transitions and interactive effects
- **Three.js scene management** for 3D background elements

# External Dependencies

## CDN Services
- **Tailwind CSS** - Utility-first CSS framework
- **Font Awesome 6.4.0** - Icon library
- **Three.js r128** - 3D graphics library
- **GSAP 3.12.2** - Animation library

## Image Hosting
- **Unsplash API** - External image hosting for gallery content

## Font Services
- **Google Fonts** - Professional typography system:
  - **Inter** - Clean, modern sans-serif for body text (weights 300-900)
  - **Playfair Display** - Elegant serif for headings (weights 600-900)
  - **Poppins** - Used in main portfolio page for casual, friendly feel

## Python Dependencies
- **Flask** - Web application framework
- **Standard library modules** (os, logging) for configuration and debugging

## Browser APIs
- **localStorage** - Theme preference persistence
- **CSS Custom Properties** - Dynamic theming support
- **Intersection Observer** (implied) - Scroll-based animations
- **RequestAnimationFrame** - Smooth animation loops

The architecture prioritizes performance through CDN usage, minimal server-side processing, and client-side caching for theme preferences.