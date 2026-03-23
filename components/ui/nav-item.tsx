import Link from "next/link";
import { ReactNode } from "react";

interface NavItemProps {
    icon: ReactNode;
    label: string;
    href?: string;
    active?: boolean;
    collapsed?: boolean;
    onClick?: () => void;
}

export function NavItem({ icon, label, href = "#", active, collapsed, onClick }: NavItemProps) {
    const baseStyles = "flex items-center gap-4 px-4 py-2.5 rounded-full transition-colors duration-200 group relative";

    const activeStyles = active
        ? "bg-[#2d2f31] text-[#e3e3e3]"
        : "text-[#c4c7c5] hover:bg-[#2d2f31] hover:text-[#e3e3e3]";

    const content = (
        <>
            <div className="shrink-0 w-5 h-5 flex items-center justify-center">
                {icon}
            </div>

            {!collapsed && (
                <span className="text-sm font-medium truncate animate-in fade-in duration-300">
                    {label}
                </span>
            )}

            {collapsed && (
                <div className="absolute left-full ml-4 px-2 py-1 bg-[#333537] text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                    {label}
                </div>
            )}
        </>
    );

    if (onClick) {
        return (
            <button onClick={onClick} className={`${baseStyles} ${activeStyles} w-full`}>
                {content}
            </button>
        );
    }

    return (
        <Link href={href} className={`${baseStyles} ${activeStyles}`}>
            {content}
        </Link>
    );
}