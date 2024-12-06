import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import "./page.module.css";


export const metadata = {
  title: "ADM Digital",
  description:
    "We are so confident in our service that we are ready to offer a full refund within 30 days of purchase if you do not achieve initial results and can demonstrate you have followed the plan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
