import type { Metadata } from 'next';
import { Archivo, Archivo_Black } from 'next/font/google';
import './globals.css';

const archivo = Archivo({ variable: '--font-body', subsets: ['latin'] });
const archivoBlack = Archivo_Black({ variable: '--font-display', weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://puente-reingreso-rodrigo.j6x567qt8g.chatgpt.site'),
  title: 'PUENTE — Tu regreso, tu decisión',
  description: 'Navegador de reinserción laboral que protege tu base de efectivo antes de comparar rutas.',
  openGraph: {
    title: 'PUENTE — Tu regreso, tu decisión',
    description: 'Compara rutas hacia un empleo formal sin poner en riesgo el dinero que hoy llevas a casa.',
    images: [{ url: '/og.png', width: 1664, height: 935, alt: 'PUENTE: navegador de reinserción laboral' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PUENTE — Tu regreso, tu decisión',
    description: 'Tu dinero primero. Sin score y sin rutas impuestas.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es-MX"><body className={`${archivo.variable} ${archivoBlack.variable}`}>{children}</body></html>;
}
