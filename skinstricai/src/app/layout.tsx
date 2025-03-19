import Navbar from "./components/Navbar";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="custom__font">
        <Navbar />
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}

