'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  LogOut,
  Sparkles,
  TvMinimalPlay,
  Upload } from
'lucide-react';
import { useApp } from '@/lib/app-context';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger } from
'@/components/ui/dropdown-menu';
import { RoleBadge } from '@/components/role-badge';
import { AuthModal } from '@/components/modals/auth-modal';
import { KPayModal } from '@/components/modals/kpay-modal';

const NAV = [
{ href: '/', label: 'Home', Icon: TvMinimalPlay }];

export function AppShell({ children }) {
  const pathname = usePathname();
  const { currentUser, openAuth, logout, openKPay, isPremium } = useApp();

  const isCreator =
  currentUser?.role === 'creator' || currentUser?.role === 'admin';
  const isAdmin = currentUser?.role === 'admin';

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/30">
              <Sparkles className="size-5" />
            </span>
            <span className="font-display text-lg font-bold tracking-tight">
              Kami<span className="text-primary">Stream</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map(({ href, label, Icon }) => {
              const active =
              href === '/' ? pathname === '/' : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    active ?
                    'bg-secondary text-foreground' :
                    'text-muted-foreground hover:text-foreground'
                  )}>
                  <Icon className="size-4" />
                  {label}
                </Link>);
            })}
            {isCreator &&
            <Link
              href="/studio"
              className={cn(
                'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                pathname.startsWith('/studio') ?
                'bg-secondary text-foreground' :
                'text-muted-foreground hover:text-foreground'
              )}>
              <Upload className="size-4" />
              Studio
            </Link>
            }
            {isAdmin &&
            <Link
              href="/admin"
              className={cn(
                'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                pathname.startsWith('/admin') ?
                'bg-secondary text-foreground' :
                'text-muted-foreground hover:text-foreground'
              )}>
              <LayoutDashboard className="size-4" />
              Admin
            </Link>
            }
          </nav>

          <div className="ml-auto flex items-center gap-2">
            {!isPremium &&
            <Button
              onClick={openKPay}
              size="sm"
              className="hidden gap-1.5 sm:flex">
              <Sparkles className="size-4" />
              Go Premium
            </Button>
            }

            {currentUser ?
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 rounded-full border border-border bg-card py-1 pl-1 pr-3 transition-colors hover:bg-secondary">
                    <Avatar className="size-7">
                      <AvatarImage
                      src={currentUser.avatar || '/placeholder.svg'}
                      alt={currentUser.name} />
                      <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="hidden text-sm font-medium sm:inline">
                      {currentUser.name.split(' ')[0]}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-60">
                  <DropdownMenuLabel>
                    <div className="flex flex-col gap-1.5">
                      <span className="font-medium">{currentUser.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {currentUser.email}
                      </span>
                      <RoleBadge role={currentUser.role} className="w-fit" />
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {!isPremium &&
                <DropdownMenuItem onClick={openKPay}>
                      <Sparkles className="size-4" />
                      Upgrade to Premium
                    </DropdownMenuItem>
                }
                  {isCreator &&
                <DropdownMenuItem asChild>
                      <Link href="/studio">
                        <Upload className="size-4" />
                        Creator Studio
                      </Link>
                    </DropdownMenuItem>
                }
                  {isAdmin &&
                <DropdownMenuItem asChild>
                      <Link href="/admin">
                        <LayoutDashboard className="size-4" />
                        Admin Portal
                      </Link>
                    </DropdownMenuItem>
                }
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="size-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> :

            <>
                <Button
                variant="ghost"
                size="sm"
                onClick={() => openAuth('signin')}>
                  Sign in
                </Button>
                <Button size="sm" onClick={() => openAuth('signup')}>
                  Sign up
                </Button>
              </>
            }
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border/70 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <span className="font-display font-semibold text-foreground">
              KamiStream
            </span>
            <span>— stream, read, discuss.</span>
          </div>
          <p>Prototype experience. Content is fictional demo data.</p>
        </div>
      </footer>

      <AuthModal />
      <KPayModal />
    </div>);
}
