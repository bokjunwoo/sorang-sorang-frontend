import React, {ReactNode} from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'disabled' | 'master' | 'master_disabled';
    children: React.ReactNode;
    className?: string;
}

export interface ChipProps {
    children?: ReactNode;
    size?: 'small' | 'large';
    icon?: ReactNode;
    className?: string;
    audioUrl?: string;
    playText?: string;
    stopText?: string;
}