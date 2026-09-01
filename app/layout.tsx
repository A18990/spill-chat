import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = { title: 'Spill Chat — Say it here', description: 'A simple, link-based realtime chat room without accounts.', generator: 'v0.app' }
export const viewport: Viewport = { colorScheme: 'light', themeColor: '#f8f7f4' }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" className="bg-background"><body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html> }
