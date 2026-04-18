import "./globals.css";

export const metadata = {
  title: "Gas Detector Integrated System Portal",
  description: "Enterprise shell for gas detector integrated services"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
