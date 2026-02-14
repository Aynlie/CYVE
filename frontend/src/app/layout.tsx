import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { RoadmapProvider } from '@/context/RoadmapContext';
import { CalendarProvider } from '@/context/CalendarContext';
import { ProfileProvider } from '@/context/ProfileContext';

const inter = Inter({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800'],
    variable: '--font-inter',
});

export const metadata: Metadata = {
    title: 'CYVE - Paths for Cybersecurity',
    description: 'Your roadmap to a successful career in cybersecurity. Learn, track your progress, and connect with opportunities in offensive and defensive security.',
    keywords: 'cybersecurity, red team, blue team, purple team, security career, learning roadmap',
};

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
                                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                                    <Header />
                                    <main style={{ flex: 1 }}>
                                        {children}
                                    </main>
                                    <Footer />
                                </div>
                            </ProfileProvider>
                        </CalendarProvider>
                    </RoadmapProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
