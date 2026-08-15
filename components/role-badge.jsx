import { Crown, Lock, Shield, Sparkles, User } from 'lucide-react';
import { cn } from '@/lib/utils';


const ROLE_STYLES =


{
  free: {
    label: 'Free',
    className: 'bg-muted text-muted-foreground border-border',
    Icon: User
  },
  premium: {
    label: 'Premium',
    className:
    'bg-primary/15 text-primary border-primary/30',
    Icon: Sparkles
  },
  creator: {
    label: 'Creator',
    className: 'bg-accent/15 text-accent border-accent/30',
    Icon: Crown
  },
  admin: {
    label: 'Admin',
    className:
    'bg-chart-4/15 text-chart-4 border-chart-4/30',
    Icon: Shield
  }
};

export function RoleBadge({
  role,
  className



}) {
  const { label, className: rc, Icon } = ROLE_STYLES[role];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium',
        rc,
        className
      )}>
      
      <Icon className="size-3" />
      {label}
    </span>);

}

export function PremiumTag({ className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md bg-primary px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground shadow-lg shadow-primary/30',
        className
      )}>
      
      <Lock className="size-2.5" />
      Premium
    </span>);

}

export function FreeTag({ className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border border-accent/40 bg-accent/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent',
        className
      )}>
      
      Free
    </span>);

}