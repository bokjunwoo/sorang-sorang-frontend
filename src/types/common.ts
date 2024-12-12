import React, {ReactNode} from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'disabled' | 'master';
    children: React.ReactNode;
    className?: string;
}

export interface ChipProps {
    children: ReactNode;
    size?: 'small' | 'large';
    icon?: ReactNode;
    className?: string;
}