import React, { useEffect, useState } from 'react';
import { Server } from '@/api/server/getServer';
import getServers from '@/api/getServers';
import ServerRow from '@/components/dashboard/ServerRow';
import Spinner from '@/components/elements/Spinner';
import PageContentBlock from '@/components/elements/PageContentBlock';
import useFlash from '@/plugins/useFlash';
import { useStoreState } from 'easy-peasy';
import { usePersistedState } from '@/plugins/usePersistedState';
import Switch from '@/components/elements/Switch';
import useSWR from 'swr';
import { PaginatedResult } from '@/api/http';
import Pagination from '@/components/elements/Pagination';
import { useLocation } from 'react-router-dom';
 
export default () => {
    const { search } = useLocation();
    const defaultPage = Number(new URLSearchParams(search).get('page') || '1');
 
    const [page, setPage] = useState(!isNaN(defaultPage) && defaultPage > 0 ? defaultPage : 1);
    const { clearFlashes, clearAndAddHttpError } = useFlash();
    const uuid = useStoreState((state) => state.user.data!.uuid);
    const rootAdmin = useStoreState((state) => state.user.data!.rootAdmin);
    const [showOnlyAdmin, setShowOnlyAdmin] = usePersistedState(`${uuid}:show_all_servers`, false);
 
    const { data: servers, error } = useSWR<PaginatedResult<Server>>(
        ['/api/client/servers', showOnlyAdmin && rootAdmin, page],
        () => getServers({ page, type: showOnlyAdmin && rootAdmin ? 'admin' : undefined })
    );
 
    useEffect(() => {
        if (!servers) return;
        if (servers.pagination.currentPage > 1 && !servers.data.length) {
            setPage(1);
        }
    }, [servers?.pagination.currentPage]);
 
    useEffect(() => {
        // noinspection JSIgnoredPromiseFromCall
        clearFlashes('dashboard');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
 
    useEffect(() => {
        if (!error) return;
        clearAndAddHttpError({ key: 'dashboard', error });
    }, [error]);
 
    return (
        <PageContentBlock title={'Dashboard'} showFlashKey={'dashboard'}>
            <div style={{
                maxWidth: '900px',
                margin: '0 auto',
                padding: '32px 20px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>
 
                {/* ── HEADER ──────────────────────────────────────── */}
                <div style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    marginBottom: '28px',
                    flexWrap: 'wrap',
                    gap: '16px',
                }}>
                    <div>
                        <h1 style={{
                            color: '#e8e8f8',
                            fontSize: '1.625rem',
                            fontWeight: 800,
                            letterSpacing: '-0.03em',
                            margin: 0,
                            lineHeight: 1.2,
                        }}>
                            Your Servers
                        </h1>
                        <p style={{
                            color: '#6e6e90',
                            fontSize: '0.875rem',
                            marginTop: '6px',
                            margin: '6px 0 0 0',
                        }}>
                            {servers
                                ? `${servers.pagination.total} server${servers.pagination.total !== 1 ? 's' : ''} available`
                                : 'Loading your servers...'}
                        </p>
                    </div>
 
                    {/* Admin toggle */}
                    {rootAdmin && (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            background: 'rgba(37,37,64,0.6)',
                            border: '1px solid rgba(255,255,255,0.07)',
                            borderRadius: '12px',
                            padding: '8px 14px',
                        }}>
                            <span style={{ color: '#9494b0', fontSize: '0.8125rem', fontWeight: 500 }}>
                                Show all servers
                            </span>
                            <Switch
                                name={'show_all_servers'}
                                defaultChecked={showOnlyAdmin}
                                onChange={() => setShowOnlyAdmin((s) => !s)}
                            />
                        </div>
                    )}
                </div>
 
                {/* ── SERVER LIST ──────────────────────────────────── */}
                {!servers ? (
                    /* Loading skeleton */
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {[...Array(3)].map((_, i) => (
                            <div key={i} style={{
                                background: 'rgba(37,37,64,0.4)',
                                border: '1px solid rgba(255,255,255,0.05)',
                                borderRadius: '14px',
                                height: '110px',
                                animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
                            }} />
                        ))}
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                            <Spinner size={'large'} />
                        </div>
                    </div>
                ) : (
                    <>
                        {servers.data.length === 0 ? (
                            /* Empty state */
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '64px 32px',
                                background: 'rgba(37,37,64,0.4)',
                                border: '1px solid rgba(255,255,255,0.06)',
                                borderRadius: '16px',
                                textAlign: 'center',
                            }}>
                                <div style={{
                                    width: '56px', height: '56px', borderRadius: '16px',
                                    background: 'rgba(124,110,247,0.1)', border: '1px solid rgba(124,110,247,0.2)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    marginBottom: '16px', fontSize: '22px',
                                }}>
                                    🖥️
                                </div>
                                <h3 style={{ color: '#e8e8f8', fontWeight: 700, fontSize: '1.125rem', margin: '0 0 8px 0' }}>
                                    No Servers Found
                                </h3>
                                <p style={{ color: '#6e6e90', fontSize: '0.875rem', maxWidth: '320px', margin: 0, lineHeight: 1.6 }}>
                                    {showOnlyAdmin
                                        ? "No servers are visible in admin view."
                                        : "You don't have any servers assigned to your account yet."}
                                </p>
                            </div>
                        ) : (
                            /* Server cards */
                            <Pagination data={servers} onPageSelect={setPage}>
                                {({ items }) => (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                                        {items.map((server) => (
                                            <ServerRow key={server.uuid} server={server} />
                                        ))}
                                    </div>
                                )}
                            </Pagination>
                        )}
                    </>
                )}
 
                {/* ── PAGINATION INFO ──────────────────────────────── */}
                {servers && servers.pagination.totalPages > 1 && (
                    <div style={{
                        marginTop: '16px',
                        display: 'flex',
                        justifyContent: 'center',
                        color: '#6e6e90',
                        fontSize: '0.8125rem',
                    }}>
                        Page {servers.pagination.currentPage} of {servers.pagination.totalPages}
                    </div>
                )}
            </div>
        </PageContentBlock>
    );
};
