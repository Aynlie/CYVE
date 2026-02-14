'use client';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { RoadmapProvider } from '@/context/RoadmapContext';
import { CalendarProvider } from '@/context/CalendarContext';
import { ProfileProvider } from '@/context/ProfileContext';
import { usePathname } from 'next/navigation';

const inter = Inter({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800'],
    variable: '--font-inter',
});

function LayoutContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthPage = pathname === '/login' || pathname === '/signup';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <main style={{ flex: 1 }}>
                {children}
            </main>
            {!isAuthPage && <Footer />}
        </div>
    );
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.variable} suppressHydrationWarning>
                <AuthProvider>
                    <RoadmapProvider>
                        <CalendarProvider>
                            <ProfileProvider>
                                <LayoutContent>
                                    {children}
                                </LayoutContent>
                            </ProfileProvider>
                        </CalendarProvider>
                    </RoadmapProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
