import { ReactNode, ButtonHTMLAttributes } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: ReactNode;
    primary?: boolean;
    tooltip?: string;
}

export function IconButton({ icon, primary, tooltip, className, ...props }: IconButtonProps) {
    const baseStyles = "p-2.5 rounded-full transition-all duration-200 flex items-center justify-center relative group";

    const variantStyles = primary
        ? "bg-[#1e1f20] hover:bg-[#333537] text-[#4285f4]"
        : "text-[#c4c7c5] hover:bg-[#333537] hover:text-[#e3e3e3]";

    return (
        <button
            className={`${baseStyles} ${variantStyles} ${className}`}
            {...props}
        >
            <span className="w-5 h-5 flex items-center justify-center">
                {icon}
            </span>

            {tooltip && (
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#333537] text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
                    {tooltip}
                </span>
            )}
        </button>
    );
}