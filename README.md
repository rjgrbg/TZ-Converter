# 🌎 US Time Zone Comparator

A modern, responsive web application that allows users to compare time between different US time zones with real-time updates and a beautiful user interface.

## ✨ Features

- **Time Zone Comparison**: Compare times between any two US time zones (Hawaii, Alaska, Pacific, Central, Eastern)
- **Real-Time Conversion**: Instantly see the equivalent time in another time zone
- **Live Clocks**: Display current time for all US time zones, updated every second
- **Visual Timeline**: Interactive timeline showing all time zones side-by-side
- **Dark Mode**: Toggle between light and dark themes with persistent preference
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Copy to Clipboard**: Easily copy converted times
- **Daylight Saving Time**: Automatically handles DST transitions
- **UTC Offsets**: Display timezone abbreviations and UTC offsets

## 🚀 Quick Start

### Local Development

1. Clone or download this repository
2. Open `index.html` in your web browser
3. That's it! No build process or dependencies required.

### Deploy to Vercel

1. Install Vercel CLI (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. Deploy the project:
   ```bash
   vercel
   ```

3. Follow the prompts to complete deployment

Alternatively, you can deploy directly from GitHub:
1. Push this code to a GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

## 📁 Project Structure

```
us-timezone-comparator/
├── index.html          # Main HTML file
├── styles.css          # All styling and responsive design
├── script.js           # Application logic and time zone handling
├── vercel.json         # Vercel deployment configuration
├── package.json        # Project metadata
└── README.md           # This file
```

## 🎨 Features in Detail

### Time Zone Comparison
- Select source and target time zones from dropdown menus
- Enter any date and time to see the conversion
- See the time difference displayed clearly
- Swap button to quickly reverse the comparison

### Live Time Display
- Shows current time in all 5 US time zones
- Updates every second
- Displays timezone abbreviations (HST, AKST, PST, CST, EST)

### Visual Timeline
- Animated markers showing current time position for each zone
- Visual representation of time differences
- Updates in real-time

### Theme Support
- Light and dark mode toggle
- Persistent theme preference (saved to localStorage)
- Smooth transitions between themes

### Responsive Design
- Mobile-first approach
- Adapts seamlessly to all screen sizes
- Touch-friendly interface on mobile devices

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)**: Vanilla JavaScript, no frameworks
- **Intl API**: For accurate timezone conversions and formatting
- **LocalStorage**: For theme persistence

## 🌐 Supported Time Zones

- **Hawaii** (HST): Pacific/Honolulu
- **Alaska** (AKST/AKDT): America/Anchorage
- **Pacific** (PST/PDT): America/Los_Angeles
- **Central** (CST/CDT): America/Chicago
- **Eastern** (EST/EDT): America/New_York

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Use Cases

- Schedule meetings across time zones
- Coordinate with remote teams
- Plan travel and events
- Convert business hours
- Educational purposes

## 📄 License

MIT License - feel free to use this project for any purpose.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## 🙏 Acknowledgments

Built with modern web standards and best practices for performance and accessibility.
