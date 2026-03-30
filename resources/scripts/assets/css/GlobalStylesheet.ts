/* ── GOOGLE FONTS ──────────────────────────────────────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
 
/* ── TAILWIND ──────────────────────────────────────────────────────────── */
@tailwind base;
@tailwind components;
@tailwind utilities;
 
/* ── ROOT VARIABLES ────────────────────────────────────────────────────── */
:root {
    --bg-main:        #10101e;
    --bg-card:        #252540;
    --bg-sidebar:     #1a1a32;
    --accent:         #7c6ef7;
    --accent-glow:    rgba(124, 110, 247, 0.4);
    --border:         rgba(255, 255, 255, 0.07);
    --text-primary:   #e8e8f8;
    --text-secondary: #9494b0;
}
 
/* ── BASE STYLES ───────────────────────────────────────────────────────── */
*,
*::before,
*::after {
    box-sizing: border-box;
}
 
html {
    font-family: 'Plus Jakarta Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
 
body {
    background-color: var(--bg-main);
    color: var(--text-primary);
    min-height: 100vh;
}
 
/* ── CUSTOM SCROLLBAR ──────────────────────────────────────────────────── */
::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}
 
::-webkit-scrollbar-track {
    background: transparent;
}
 
::-webkit-scrollbar-thumb {
    background: rgba(124, 110, 247, 0.3);
    border-radius: 9999px;
}
 
::-webkit-scrollbar-thumb:hover {
    background: rgba(124, 110, 247, 0.6);
}
 
/* ── GLASS CARD ────────────────────────────────────────────────────────── */
.glass-card {
    background: rgba(37, 37, 64, 0.6);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid var(--border);
    border-radius: 1rem;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
 
.glass-card:hover {
    border-color: rgba(124, 110, 247, 0.3);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3), 0 0 24px rgba(124, 110, 247, 0.12);
}
 
/* ── GLOW BUTTON ───────────────────────────────────────────────────────── */
.btn-glow {
    background: linear-gradient(135deg, #7c6ef7, #6b4ef0);
    color: #ffffff;
    border-radius: 0.75rem;
    padding: 0.5rem 1.25rem;
    font-weight: 600;
    font-size: 0.875rem;
    transition: all 0.2s ease;
    border: none;
    cursor: pointer;
}
 
.btn-glow:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 20px rgba(124, 110, 247, 0.5);
}
 
.btn-glow:active {
    transform: translateY(0);
    box-shadow: 0 2px 10px rgba(124, 110, 247, 0.3);
}
 
/* ── GHOST BUTTON ──────────────────────────────────────────────────────── */
.btn-ghost {
    background: rgba(255, 255, 255, 0.06);
    color: #c8c8de;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 0.75rem;
    padding: 0.5rem 1.25rem;
    font-weight: 500;
    font-size: 0.875rem;
    transition: all 0.2s ease;
    cursor: pointer;
}
 
.btn-ghost:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.15);
}
 
/* ── INPUT ─────────────────────────────────────────────────────────────── */
.input-dark {
    background: rgba(16, 16, 30, 0.8);
    border: 1px solid var(--border);
    border-radius: 0.75rem;
    color: var(--text-primary);
    font-size: 0.875rem;
    font-family: 'Plus Jakarta Sans', sans-serif;
    padding: 0.625rem 1rem;
    transition: border-color 0.2s, box-shadow 0.2s;
    width: 100%;
}
 
.input-dark:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(124, 110, 247, 0.15);
}
 
.input-dark::placeholder {
    color: var(--text-secondary);
}
 
/* ── NAV LINK ──────────────────────────────────────────────────────────── */
.nav-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.625rem 1rem;
    border-radius: 0.75rem;
    color: var(--text-secondary);
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.15s ease;
    cursor: pointer;
    text-decoration: none;
}
 
.nav-link:hover {
    background: rgba(124, 110, 247, 0.1);
    color: var(--text-primary);
}
 
.nav-link.active {
    background: rgba(124, 110, 247, 0.15);
    color: #ffffff;
    border: 1px solid rgba(124, 110, 247, 0.25);
}
 
/* ── STATUS PILLS ──────────────────────────────────────────────────────── */
.status-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.2rem 0.625rem;
    border-radius: 9999px;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
}
 
.status-online {
    background: rgba(16, 185, 129, 0.12);
    color: #10b981;
    border: 1px solid rgba(16, 185, 129, 0.3);
}
 
.status-offline {
    background: rgba(239, 68, 68, 0.12);
    color: #ef4444;
    border: 1px solid rgba(239, 68, 68, 0.3);
}
 
.status-loading {
    background: rgba(251, 191, 36, 0.12);
    color: #f59e0b;
    border: 1px solid rgba(251, 191, 36, 0.3);
}
 
/* ── DOT INDICATOR ─────────────────────────────────────────────────────── */
.status-dot {
    width: 7px;
    height: 7px;
    border-radius: 9999px;
    display: inline-block;
    flex-shrink: 0;
}
 
.status-dot.online  { background: #10b981; box-shadow: 0 0 6px rgba(16,185,129,0.7); }
.status-dot.offline { background: #ef4444; }
.status-dot.loading { background: #f59e0b; animation: pulse 1.5s infinite; }
 
/* ── PAGE TRANSITIONS ──────────────────────────────────────────────────── */
.page-enter {
    animation: fadeIn 0.3s ease-out;
}
 
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
}
 
/* ── SECTION HEADING ───────────────────────────────────────────────────── */
.section-title {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.02em;
}
 
.section-subtitle {
    font-size: 0.8125rem;
    color: var(--text-secondary);
    margin-top: 0.2rem;
}
 
/* ── TABLE ─────────────────────────────────────────────────────────────── */
.table-dark {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
}
 
.table-dark thead tr th {
    background: rgba(255, 255, 255, 0.03);
    color: var(--text-secondary);
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--border);
    text-align: left;
}
 
.table-dark tbody tr td {
    padding: 0.875rem 1rem;
    font-size: 0.875rem;
    color: var(--text-primary);
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}
 
.table-dark tbody tr:hover td {
    background: rgba(124, 110, 247, 0.05);
}
 
/* ── RESOURCE BAR ──────────────────────────────────────────────────────── */
.resource-bar {
    height: 4px;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.08);
    overflow: hidden;
}
 
.resource-bar-fill {
    height: 100%;
    border-radius: 9999px;
    background: linear-gradient(90deg, #7c6ef7, #6b4ef0);
    transition: width 0.5s ease;
}
 
.resource-bar-fill.warn {
    background: linear-gradient(90deg, #f59e0b, #d97706);
}
 
.resource-bar-fill.danger {
    background: linear-gradient(90deg, #ef4444, #dc2626);
}
