import * as React from 'react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faLayerGroup, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useStoreState } from 'easy-peasy';
import { ApplicationStore } from '@/state';
import SearchContainer from '@/components/dashboard/search/SearchContainer';
import http from '@/api/http';
import SpinnerOverlay from '@/components/elements/SpinnerOverlay';
import Tooltip from '@/components/elements/tooltip/Tooltip';
import Avatar from '@/components/Avatar';
 
const NavigationBar = () => {
    const name = useStoreState((state: ApplicationStore) => state.settings.data!.name);
    const rootAdmin = useStoreState((state: ApplicationStore) => state.user.data!.rootAdmin);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
 
    const onTriggerLogout = () => {
        setIsLoggingOut(true);
        http.post('/auth/logout').finally(() => {
            // @ts-ignore
            window.location = '/';
        });
    };
 
    return (
        <>
            <SpinnerOverlay visible={isLoggingOut} />
 
            {/* ── NAVBAR WRAPPER ─────────────────────────────────────────── */}
            <div
                style={{
                    height: '64px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 24px',
                    background: 'rgba(26, 26, 50, 0.85)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 50,
                    boxShadow: '0 1px 0 0 rgba(255,255,255,0.03)',
                }}
            >
                {/* ── LEFT: LOGO ────────────────────────────────────────── */}
                <Link
                    to={'/'}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        textDecoration: 'none',
                        flexShrink: 0,
                    }}
                >
                    {/* Logo icon circle */}
                    <div
                        style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '10px',
                            background: 'linear-gradient(135deg, #7c6ef7, #6b4ef0)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 0 16px rgba(124,110,247,0.45)',
                            flexShrink: 0,
                        }}
                    >
                        <FontAwesomeIcon icon={faLayerGroup} style={{ color: '#fff', fontSize: '14px' }} />
                    </div>
 
                    {/* Panel name */}
                    <span
                        style={{
                            color: '#ffffff',
                            fontWeight: 700,
                            fontSize: '1rem',
                            letterSpacing: '-0.02em',
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                        }}
                    >
                        {name}
                    </span>
                </Link>
 
                {/* ── CENTER: SEARCH ────────────────────────────────────── */}
                <div style={{ flex: 1, maxWidth: '320px', margin: '0 32px' }}>
                    <SearchContainer />
                </div>
 
                {/* ── RIGHT: ACTIONS ────────────────────────────────────── */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
 
                    {/* Admin panel button (only for root admins) */}
                    {rootAdmin && (
                        <Tooltip placement={'bottom'} content={'Admin Control Panel'}>
                            <NavLink
                                to={'/admin'}
                                style={({ isActive }) => ({
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '38px',
                                    height: '38px',
                                    borderRadius: '10px',
                                    color: isActive ? '#fff' : '#9494b0',
                                    background: isActive ? 'rgba(124,110,247,0.15)' : 'transparent',
                                    border: isActive ? '1px solid rgba(124,110,247,0.25)' : '1px solid transparent',
                                    textDecoration: 'none',
                                    transition: 'all 0.15s ease',
                                    cursor: 'pointer',
                                })}
                                onMouseEnter={(e) => {
                                    const el = e.currentTarget;
                                    el.style.background = 'rgba(124,110,247,0.1)';
                                    el.style.color = '#e8e8f8';
                                }}
                                onMouseLeave={(e) => {
                                    const el = e.currentTarget;
                                    // reset to NavLink's isActive state
                                    el.style.background = '';
                                    el.style.color = '';
                                }}
                            >
                                <FontAwesomeIcon icon={faCogs} style={{ fontSize: '15px' }} />
                            </NavLink>
                        </Tooltip>
                    )}
 
                    {/* Divider */}
                    <div
                        style={{
                            width: '1px',
                            height: '20px',
                            background: 'rgba(255,255,255,0.08)',
                            margin: '0 6px',
                        }}
                    />
 
                    {/* Avatar / profile */}
                    <NavLink
                        to={'/account'}
                        style={({ isActive }) => ({
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '4px 10px 4px 4px',
                            borderRadius: '10px',
                            color: isActive ? '#fff' : '#9494b0',
                            background: isActive ? 'rgba(124,110,247,0.15)' : 'transparent',
                            border: isActive ? '1px solid rgba(124,110,247,0.25)' : '1px solid transparent',
                            textDecoration: 'none',
                            transition: 'all 0.15s ease',
                            cursor: 'pointer',
                        })}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                            e.currentTarget.style.color = '#e8e8f8';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = '';
                            e.currentTarget.style.color = '';
                        }}
                    >
                        <div
                            style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                flexShrink: 0,
                                border: '1px solid rgba(124,110,247,0.3)',
                            }}
                        >
                            <Avatar.User />
                        </div>
                        <span
                            style={{
                                fontSize: '0.8125rem',
                                fontWeight: 500,
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                            }}
                        >
                            Account
                        </span>
                    </NavLink>
 
                    {/* Logout button */}
                    <Tooltip placement={'bottom'} content={'Sign Out'}>
                        <button
                            onClick={onTriggerLogout}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '38px',
                                height: '38px',
                                borderRadius: '10px',
                                color: '#9494b0',
                                background: 'transparent',
                                border: '1px solid transparent',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease',
                                marginLeft: '2px',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(239,68,68,0.1)';
                                e.currentTarget.style.color = '#ef4444';
                                e.currentTarget.style.borderColor = 'rgba(239,68,68,0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = '#9494b0';
                                e.currentTarget.style.borderColor = 'transparent';
                            }}
                        >
                            <FontAwesomeIcon icon={faSignOutAlt} style={{ fontSize: '15px' }} />
                        </button>
                    </Tooltip>
                </div>
            </div>
        </>
    );
};
 
export default NavigationBar;
