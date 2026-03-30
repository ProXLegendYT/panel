import React, { memo, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEthernet, faHdd, faMemory, faMicrochip, faServer } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Server } from '@/api/server/getServer';
import getServerResourceUsage, { ServerPowerState, ServerStats } from '@/api/server/getServerResourceUsage';
import { bytesToString, ip, mbToBytes } from '@/lib/formatters';
import isEqual from 'react-fast-compare';
import Spinner from '@/components/elements/Spinner';
 
// Determines if the current value is in an alarm threshold
const isAlarmState = (current: number, limit: number): boolean => limit > 0 && current / (limit * 1024 * 1024) >= 0.9;
 
type Props = { server: Server; className?: string };
 
const statusColor = (status: ServerPowerState | undefined) => {
    switch (status) {
        case 'running': return { dot: '#10b981', bg: 'rgba(16,185,129,0.12)', text: '#10b981', border: 'rgba(16,185,129,0.3)', label: 'Online' };
        case 'starting': return { dot: '#f59e0b', bg: 'rgba(245,158,11,0.12)', text: '#f59e0b', border: 'rgba(245,158,11,0.3)', label: 'Starting' };
        case 'stopping': return { dot: '#f97316', bg: 'rgba(249,115,22,0.12)', text: '#f97316', border: 'rgba(249,115,22,0.3)', label: 'Stopping' };
        case 'offline':
        default:
            return { dot: '#ef4444', bg: 'rgba(239,68,68,0.12)', text: '#ef4444', border: 'rgba(239,68,68,0.3)', label: 'Offline' };
    }
};
 
const ResourceBar = ({ value, max, alarm }: { value: number; max: number; alarm?: boolean }) => {
    const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
    const color = alarm ? '#ef4444' : pct > 75 ? '#f59e0b' : '#7c6ef7';
    return (
        <div style={{ height: '3px', borderRadius: '9999px', background: 'rgba(255,255,255,0.07)', overflow: 'hidden', marginTop: '4px' }}>
            <div style={{ height: '100%', width: `${pct}%`, borderRadius: '9999px', background: color, transition: 'width 0.5s ease' }} />
        </div>
    );
};
 
const ServerRow = ({ server }: Props) => {
    const interval = useRef<ReturnType<typeof setInterval>>(null) as React.MutableRefObject<ReturnType<typeof setInterval>>;
    const [stats, setStats] = useState<ServerStats | null>(null);
    const [statsError, setStatsError] = useState(false);
    const [hovered, setHovered] = useState(false);
 
    const getStats = () =>
        getServerResourceUsage(server.uuid)
            .then((data) => {
                setStats(data);
                setStatsError(false);
            })
            .catch(() => setStatsError(true));
 
    useEffect(() => {
        getStats();
        interval.current = setInterval(() => getStats(), 30000);
        return () => clearInterval(interval.current);
    }, []);
 
    const status = statusColor(stats?.status);
    const cpuAlarm = stats ? stats.cpuAbsolute > 90 : false;
    const memAlarm = stats ? isAlarmState(stats.memoryBytes, server.limits.memory) : false;
    const diskAlarm = stats ? isAlarmState(stats.diskBytes, server.limits.disk) : false;
 
    return (
        <Link
            to={`/server/${server.id}`}
            style={{ textDecoration: 'none', display: 'block' }}
        >
            <div
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    background: hovered ? 'rgba(37,37,64,0.85)' : 'rgba(37,37,64,0.55)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: hovered ? '1px solid rgba(124,110,247,0.3)' : '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '14px',
                    padding: '18px 22px',
                    marginBottom: '10px',
                    transition: 'all 0.2s ease',
                    transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
                    boxShadow: hovered
                        ? '0 8px 32px rgba(0,0,0,0.35), 0 0 24px rgba(124,110,247,0.1)'
                        : '0 2px 12px rgba(0,0,0,0.2)',
                    cursor: 'pointer',
                    animation: 'fadeIn 0.3s ease-out',
                }}
            >
                {/* ── TOP ROW ─────────────────────────────────── */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
 
                    {/* Left: icon + name + node */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                        {/* Server icon */}
                        <div style={{
                            width: '38px', height: '38px', borderRadius: '10px', flexShrink: 0,
                            background: 'rgba(124,110,247,0.12)', border: '1px solid rgba(124,110,247,0.2)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <FontAwesomeIcon icon={faServer} style={{ color: '#7c6ef7', fontSize: '15px' }} />
                        </div>
 
                        {/* Name + description */}
                        <div style={{ minWidth: 0 }}>
                            <div style={{
                                color: '#e8e8f8', fontWeight: 700, fontSize: '0.9375rem',
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                letterSpacing: '-0.01em', whiteSpace: 'nowrap',
                                overflow: 'hidden', textOverflow: 'ellipsis',
                            }}>
                                {server.name}
                            </div>
                            <div style={{ color: '#6e6e90', fontSize: '0.75rem', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <FontAwesomeIcon icon={faEthernet} style={{ fontSize: '11px' }} />
                                <span>{ip(server.allocations.filter((a) => a.isDefault).map((a) => a.ip)[0] ?? '')}</span>
                                {server.node && (
                                    <>
                                        <span style={{ color: 'rgba(255,255,255,0.15)' }}>•</span>
                                        <span>{server.node}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
 
                    {/* Right: status pill */}
                    {statsError ? (
                        <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: '5px',
                            padding: '3px 10px', borderRadius: '9999px', fontSize: '0.7rem',
                            fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
                            background: 'rgba(255,255,255,0.05)', color: '#6e6e90',
                            border: '1px solid rgba(255,255,255,0.08)',
                        }}>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6e6e90', display: 'inline-block' }} />
                            No Data
                        </span>
                    ) : !stats ? (
                        <Spinner size={'small'} />
                    ) : (
                        <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: '5px',
                            padding: '3px 10px', borderRadius: '9999px', fontSize: '0.7rem',
                            fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
                            background: status.bg, color: status.text, border: `1px solid ${status.border}`,
                        }}>
                            <span style={{
                                width: '6px', height: '6px', borderRadius: '50%',
                                background: status.dot, display: 'inline-block',
                                boxShadow: stats.status === 'running' ? `0 0 6px ${status.dot}` : 'none',
                            }} />
                            {status.label}
                        </span>
                    )}
                </div>
 
                {/* ── RESOURCE GRID ────────────────────────────── */}
                {stats && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
 
                        {/* CPU */}
                        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '10px', padding: '10px 12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6e6e90', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    <FontAwesomeIcon icon={faMicrochip} style={{ fontSize: '10px' }} />
                                    CPU
                                </div>
                                <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: cpuAlarm ? '#ef4444' : '#e8e8f8', fontFamily: 'JetBrains Mono, monospace' }}>
                                    {stats.cpuAbsolute.toFixed(1)}%
                                </span>
                            </div>
                            <ResourceBar value={stats.cpuAbsolute} max={100} alarm={cpuAlarm} />
                        </div>
 
                        {/* RAM */}
                        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '10px', padding: '10px 12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6e6e90', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    <FontAwesomeIcon icon={faMemory} style={{ fontSize: '10px' }} />
                                    RAM
                                </div>
                                <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: memAlarm ? '#ef4444' : '#e8e8f8', fontFamily: 'JetBrains Mono, monospace' }}>
                                    {bytesToString(stats.memoryBytes)}
                                </span>
                            </div>
                            <ResourceBar value={stats.memoryBytes} max={mbToBytes(server.limits.memory)} alarm={memAlarm} />
                        </div>
 
                        {/* Disk */}
                        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '10px', padding: '10px 12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6e6e90', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    <FontAwesomeIcon icon={faHdd} style={{ fontSize: '10px' }} />
                                    Disk
                                </div>
                                <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: diskAlarm ? '#ef4444' : '#e8e8f8', fontFamily: 'JetBrains Mono, monospace' }}>
                                    {bytesToString(stats.diskBytes)}
                                </span>
                            </div>
                            <ResourceBar value={stats.diskBytes} max={mbToBytes(server.limits.disk)} alarm={diskAlarm} />
                        </div>
                    </div>
                )}
 
                {/* Loading state */}
                {!stats && !statsError && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 0', gap: '8px', color: '#6e6e90', fontSize: '0.8125rem' }}>
                        <Spinner size={'small'} />
                        <span>Loading resources...</span>
                    </div>
                )}
            </div>
        </Link>
    );
};
 
export default memo(ServerRow, isEqual);
