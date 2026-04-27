import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css";
import { cn } from "@/lib/utils";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
         
            {children}
          </SidebarInset>
        </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
