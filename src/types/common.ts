import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'disabled' | 'master';
    children: React.ReactNode;
    className?: string;
}