import type { Metadata } from 'next';
import { Archivo, Archivo_Black } from 'next/font/google';
import './globals.css';

const archivo = Archivo({ variable: '--font-body', subsets: ['latin'] });
const archivoBlack = Archivo_Black({ variable: '--font-display', weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PUENTE — Tu regreso, tu decisión',
  description: 'Navegador de reinserción laboral que protege tu base de efectivo antes de comparar rutas.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es-MX"><body className={`${archivo.variable} ${archivoBlack.variable}`}>{children}</body></html>;
}
