"use client"
import { ModeToggle } from "@/components/mode-toggle"

export default function HeaderMenu() {
    return (
        <header className="bg-background shadow-md sticky top-0 z-50 flex items-center justify-between pr-4">      
            <p className="p-4">Placeholder</p>
            <ModeToggle />
        </header>
    )
}