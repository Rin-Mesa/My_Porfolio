# Portfolio Website - Setup Instructions

## 🎉 Your Portfolio is Ready!

Your modern, professional portfolio website has been created with:
- ✅ Responsive HTML structure
- ✅ Premium CSS design with glassmorphism effects
- ✅ Interactive JavaScript animations
- ✅ Smooth scrolling and transitions
- ✅ Contact form with validation

## 📸 Adding Your Profile Images

You need to add two profile images to complete the portfolio:

1. **profile-hero.jpg** - For the hero section (dramatic lighting, side view)
   - Recommended size: 500x600px or similar portrait ratio
   - Should have good lighting and professional appearance

2. **profile-about.jpg** - For the about section (circular crop)
   - Recommended size: 300x300px (square)
   - Professional headshot, front-facing

### How to Add Images:

1. Place your images in the `porfolio_mesa` folder
2. Name them exactly as:
   - `profile-hero.jpg`
   - `profile-about.jpg`
3. Or update the image paths in `index.html` (lines 47 and 84)

## 🎨 Customization Guide

### Update Your Information:

1. **Name & Title** (line 43-45 in index.html):
   ```html
   <h1 class="hero-title">
       Hi, I'm [Your Name]<br>
       <span class="gradient-text">[Your Title]</span>
   </h1>
   ```

2. **Description** (line 47-51): Replace the Lorem ipsum text with your actual bio

3. **Social Links** (lines 57-59): Update the `href="#"` with your actual social media URLs

4. **About Section** (lines 93-99): Add your real description

5. **Journey Timeline**: Update education and experience entries with your actual history

6. **Skills**: Adjust skill names and percentages to match your expertise

7. **Contact Form**: The form currently shows an alert. You can integrate with:
   - EmailJS
   - Formspree
   - Your own backend API

## 🚀 Running Locally

Simply open `index.html` in your browser:
- Double-click the file, or
- Right-click → Open with → Your browser

## 🌐 Deployment Options

1. **GitHub Pages** (Free):
   - Create a GitHub repository
   - Push your files
   - Enable GitHub Pages in settings

2. **Netlify** (Free):
   - Drag and drop your folder to netlify.com

3. **Vercel** (Free):
   - Import your project from GitHub

## 🎨 Color Customization

To change the color scheme, edit the CSS variables in `style.css` (lines 1-10):

```css
--primary-cyan: hsl(185, 100%, 50%);  /* Main accent color */
--primary-blue: hsl(210, 100%, 60%);  /* Secondary accent */
--dark-bg: hsl(210, 20%, 8%);         /* Background color */
```

## 📱 Features Included

- ✨ Smooth scroll navigation
- 🎯 Active section highlighting
- 📊 Animated skill bars
- 🌟 Glassmorphism card effects
- 💫 Hover animations
- 📱 Fully responsive design
- ♿ Accessible markup
- 🔍 SEO optimized

Enjoy your new portfolio! 🎊
