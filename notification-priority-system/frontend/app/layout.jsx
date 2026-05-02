import ThemeWrapper from './ThemeWrapper';
import './globals.css';

export const metadata = {
  title: 'Priority Inbox',
  description: 'Smart notification management system',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeWrapper>
          {children}
        </ThemeWrapper>
      </body>
    </html>
  );
}
