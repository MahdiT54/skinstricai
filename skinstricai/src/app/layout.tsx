import Navbar from "./components/Navbar";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="custom__font">
        <Navbar />
        <main className="m-auto  h-screen px-8 pb-8 flex flex-auto flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}

