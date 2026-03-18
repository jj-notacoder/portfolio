import type { Metadata } from 'next';
import { Space_Grotesk, Sora } from 'next/font/google';
import './globals.css';
import ProgressBar from '@/components/ProgressBar';
import Loader from '@/components/Loader';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });
const sora = Sora({ subsets: ['latin'], variable: '--font-sora' });

export const metadata: Metadata = {
  title: 'Jesher Jebson | Creative Developer',
  description: 'Portfolio of a Creative Developer specializing in high-performance digital experiences.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${spaceGrotesk.variable} ${sora.variable} font-body bg-[#050508] text-[#F0EDE6] antialiased selection:bg-[#4ECDC4]/30 overflow-x-hidden`}>
        <Loader />
        <ProgressBar />
        {children}
      </body>
    </html>
  );
}
