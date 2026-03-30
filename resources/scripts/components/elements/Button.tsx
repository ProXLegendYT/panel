import React from 'react';
import Spinner from '@/components/elements/Spinner';
 
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    size?: 'xsmall' | 'small' | 'large' | 'xlarge';
    color?: 'green' | 'red' | 'primary' | 'grey';
    isSecondary?: boolean;
}
 
const getButtonStyles = (
    color?: string,
    size?: string,
    isSecondary?: boolean,
    disabled?: boolean
): React.CSSProperties => {
    // ── SIZE ────────────────────────────────────────────────────────
    const sizeStyles: React.CSSProperties = (() => {
        switch (size) {
            case 'xsmall':
                return { padding: '4px 10px', fontSize: '0.75rem', borderRadius: '8px' };
            case 'small':
                return { padding: '6px 14px', fontSize: '0.8125rem', borderRadius: '9px' };
            case 'large':
                return { padding: '10px 22px', fontSize: '0.9375rem', borderRadius: '12px' };
            case 'xlarge':
                return { padding: '13px 28px', fontSize: '1rem', borderRadius: '13px' };
            default:
                return { padding: '8px 18px', fontSize: '0.875rem', borderRadius: '10px' };
        }
    })();
 
    // ── BASE ────────────────────────────────────────────────────────
    const base: React.CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 600,
        letterSpacing: '0.01em',
        border: '1px solid transparent',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.18s ease',
        outline: 'none',
        position: 'relative',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        ...sizeStyles,
    };
 
    // ── SECONDARY / GHOST ────────────────────────────────────────────
    if (isSecondary) {
        return {
            ...base,
            background: 'rgba(255,255,255,0.05)',
            color: '#c8c8de',
            borderColor: 'rgba(255,255,255,0.08)',
        };
    }
 
    // ── COLOR VARIANTS ───────────────────────────────────────────────
    switch (color) {
        case 'green':
            return {
                ...base,
                background: 'rgba(16,185,129,0.12)',
                color: '#10b981',
                borderColor: 'rgba(16,185,129,0.25)',
            };
        case 'red':
            return {
                ...base,
                background: 'rgba(239,68,68,0.12)',
                color: '#ef4444',
                borderColor: 'rgba(239,68,68,0.25)',
            };
        case 'grey':
            return {
                ...base,
                background: 'rgba(255,255,255,0.05)',
                color: '#9494b0',
                borderColor: 'rgba(255,255,255,0.08)',
            };
        case 'primary':
        default:
            return {
                ...base,
                background: 'linear-gradient(135deg, #7c6ef7, #6b4ef0)',
                color: '#ffffff',
                borderColor: 'transparent',
                boxShadow: '0 0 12px rgba(124,110,247,0.25)',
            };
    }
};
 
const getHoverStyles = (color?: string, isSecondary?: boolean): React.CSSProperties => {
    if (isSecondary) {
        return {
            background: 'rgba(255,255,255,0.09)',
            color: '#e8e8f8',
            borderColor: 'rgba(255,255,255,0.14)',
        };
    }
    switch (color) {
        case 'green':
            return {
                background: 'rgba(16,185,129,0.2)',
                color: '#34d399',
                borderColor: 'rgba(16,185,129,0.4)',
                transform: 'translateY(-1px)',
            };
        case 'red':
            return {
                background: 'rgba(239,68,68,0.2)',
                color: '#f87171',
                borderColor: 'rgba(239,68,68,0.4)',
                transform: 'translateY(-1px)',
            };
        case 'grey':
            return {
                background: 'rgba(255,255,255,0.09)',
                color: '#c8c8de',
                borderColor: 'rgba(255,255,255,0.14)',
            };
        case 'primary':
        default:
            return {
                background: 'linear-gradient(135deg, #8b80fb, #7c6ef7)',
                boxShadow: '0 4px 20px rgba(124,110,247,0.45)',
                transform: 'translateY(-1px)',
            };
    }
};
 
const Button = ({
    isLoading,
    size,
    color,
    isSecondary,
    children,
    disabled,
    style,
    ...rest
}: Props) => {
    const [hovered, setHovered] = React.useState(false);
    const [pressed, setPressed] = React.useState(false);
 
    const baseStyles = getButtonStyles(color, size, isSecondary, disabled || isLoading);
    const hoverStyles = hovered && !disabled && !isLoading ? getHoverStyles(color, isSecondary) : {};
    const pressStyles = pressed && !disabled && !isLoading ? { transform: 'translateY(0)', opacity: 0.9 } : {};
 
    const combinedStyles: React.CSSProperties = {
        ...baseStyles,
        ...hoverStyles,
        ...pressStyles,
        ...style,
    };
 
    return (
        <button
            {...rest}
            disabled={disabled || isLoading}
            style={combinedStyles}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => { setHovered(false); setPressed(false); }}
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
        >
            {isLoading && (
                <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <Spinner size={'small'} />
                </span>
            )}
            {children}
        </button>
    );
};
 
export default Button;
