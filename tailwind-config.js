// Tailwind CDN configuration — custom colors, fonts, and letter-spacing
// used throughout this site. Must load AFTER the Tailwind CDN <script>
// tag in index.html, and BEFORE any HTML that uses these classes.
tailwind.config = {
    theme: {
      extend: {
        colors: {
          ink: '#161A1D',
          slate2: '#4A5560',
          navy: '#0B2E4F',
          sky: '#E8F1F8',
          moss: '#1E6B4E',
          mossDark: '#15523B',
          mint: '#E7F0EA',
          sand: '#F5F2EC',
          dune: '#E6E0D5',
          amber: '#E5A23C'
        },
        fontFamily: {
          sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif']
        },
        letterSpacing: { widest2: '0.18em' }
      }
    }
  }
