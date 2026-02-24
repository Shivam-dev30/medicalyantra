import './globals.css';
import ToasterProvider from "@/components/ToasterProvider";

export const metadata = {
    title: "MedicalYantra — AI Health Report Analyzer",
    description: "Upload your medical lab reports and get instant, easy-to-read clinical insights powered by advanced AI."
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="antialiased">
                {/* Dark background base */}
                <div className="fixed inset-0 pointer-events-none z-0 bg-[#030303]">
                    <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_-20%,#064e3b,transparent)]" />
                </div>

                {/* Main content */}
                <div className="relative z-10 min-h-screen flex flex-col">
                    {children}
                </div>

                <ToasterProvider />
            </body>
        </html>
    );
}
