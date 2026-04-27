import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from "next/link"

export default function NavMenu() {
    return (
        <NavigationMenu className="py-2">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "px-6")}>
                        <Link href="/">Main</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}