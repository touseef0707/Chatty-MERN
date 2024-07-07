/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'iphoneSE': '375px',      // iPhone SE
      'iphoneXR': '414px',      // iPhone XR
      'iphone12Pro': '390px',   // iPhone 12 Pro
      'ipad': '768px',          // iPad
      'ipadPro': '1024px',      // iPad Pro
      'pixel7': '412px',        // Pixel 7
      'surfaceDuo': '540px',    // Surface Duo
      'galaxyFold': '280px',    // Galaxy Fold
      'galaxyS8plus': '360px',    // Galaxy Fold
      'desktop': '1280px',      // Generic Desktop
      'halfDesktop': '600px',   // Half Desktop
      'hpEnvy13': '1920px'
    },

  },
  // eslint-disable-next-line
  plugins: [
    require('daisyui'),
  ],
}