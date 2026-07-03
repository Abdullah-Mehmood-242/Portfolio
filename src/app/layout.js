/**
 * Root Layout — Abdullah Mehmood Portfolio
 * Provides global fonts, metadata, and HTML structure for the entire app.
 */
import './globals.css';

/* ── SEO & Open Graph Metadata ── */
export const metadata = {
  title: 'A.M. | Abdullah Mehmood — Data Science & Machine Learning',
  description:
    'Portfolio of Abdullah Mehmood — Data Science practitioner specializing in Machine Learning, Deep Learning (LSTM, CNN), Computer Vision, and Operations Research. BSCS graduate from University of Lahore.',
  keywords: [
    'Abdullah Mehmood',
    'Data Science',
    'Machine Learning',
    'Deep Learning',
    'LSTM',
    'CNN',
    'Computer Vision',
    'Portfolio',
    'Python',
  ],
  authors: [{ name: 'Abdullah Mehmood' }],
  openGraph: {
    title: 'A.M. | Abdullah Mehmood — Data Science & Machine Learning',
    description:
      'Data Science practitioner focused on ML workflows, mathematical modeling, and operations research.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A.M. | Abdullah Mehmood',
    description: 'Data Science & Machine Learning Portfolio',
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * RootLayout wraps every page in the app.
 * Applies Inter as the primary sans-serif font via CSS @import in globals.css.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect for Google Fonts performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
