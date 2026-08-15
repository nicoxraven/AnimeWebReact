'use client';

import { useEffect, useState } from 'react';
import { Crown, Loader as Loader2, Shield, Sparkles, Trash2, User, Users } from 'lucide-react';
import { useApp } from '@/lib/app-context';
import { supabase } from '@/lib/supabase-client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RoleBadge } from '@/components/role-badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow } from '@/components/ui/table';

const ROLES = ['free', 'premium', 'creator', 'admin'];

const ROLE_ICONS = {
  free: User,
  premium: Sparkles,
  creator: Crown,
  admin: Shield,
};

export function AdminView() {
  const { currentUser, openAuth } = useApp();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }
    loadUsers();
  }, [currentUser]);

  async function loadUsers() {
    setLoading(true);
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: true });
    setUsers(data || []);
    setLoading(false);
  }

  async function updateRole(id, role) {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role } : u))
    );
    await supabase.from('profiles').update({ role }).eq('id', id);
  }

  async function updateSubscription(id, subscription) {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, subscription } : u))
    );
    await supabase.from('profiles').update({ subscription }).eq('id', id);
  }

  async function deleteUser(id) {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    await supabase.from('profiles').delete().eq('id', id);
  }

  async function addUser() {
    if (!newName.trim() || !newEmail.trim()) return;
    setAdding(true);
    const handle = newName.toLowerCase().replace(/\s+/g, '_');
    const { data } = await supabase
      .from('profiles')
      .insert({
        name: newName.trim(),
        handle,
        email: newEmail.trim(),
        phone: newPhone.trim() || '—',
        avatar: '/placeholder.svg',
        role: 'free',
        subscription: 'inactive',
        joined: 'Just now',
      })
      .select()
      .single();
    if (data) {
      setUsers((prev) => [...prev, data]);
    }
    setNewName('');
    setNewEmail('');
    setNewPhone('');
    setAdding(false);
  }

  if (!currentUser) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <span className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-secondary">
          <Shield className="size-7 text-muted-foreground" />
        </span>
        <h1 className="font-display text-2xl font-bold">Admin Portal</h1>
        <p className="mt-2 text-muted-foreground">
          Sign in with an admin account to manage users.
        </p>
        <Button onClick={() => openAuth('signin')} className="mt-6">
          Sign in to continue
        </Button>
      </div>
    );
  }

  if (currentUser.role !== 'admin') {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <span className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-secondary">
          <Shield className="size-7 text-muted-foreground" />
        </span>
        <h1 className="font-display text-2xl font-bold">Access restricted</h1>
        <p className="mt-2 text-muted-foreground">
          You need an admin account to view this page.
        </p>
      </div>
    );
  }

  const filtered = users.filter(
    (u) =>
      !search ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.handle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">
            User &amp; Role Manager
          </h1>
          <p className="mt-1 text-muted-foreground">
            Manage registered users, phone numbers, subscriptions, and roles.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
          <Users className="size-4 text-muted-foreground" />
          <span className="text-sm font-medium">{users.length} users</span>
        </div>
      </div>

      {/* Add user form */}
      <div className="mb-6 rounded-xl border border-border bg-card p-4">
        <h2 className="mb-3 font-display font-semibold">Add new user</h2>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <Label htmlFor="new-name">Name</Label>
            <Input
              id="new-name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Full name"
              className="mt-1" />
          </div>
          <div className="flex-1">
            <Label htmlFor="new-email">Email</Label>
            <Input
              id="new-email"
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="email@example.com"
              className="mt-1" />
          </div>
          <div className="flex-1">
            <Label htmlFor="new-phone">Phone</Label>
            <Input
              id="new-phone"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              placeholder="09-XXXX-XXXX"
              className="mt-1" />
          </div>
          <Button
            onClick={addUser}
            disabled={adding || !newName.trim() || !newEmail.trim()}
            className="gap-1.5">
            {adding ? <Loader2 className="size-4 animate-spin" /> : <User className="size-4" />}
            Add user
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, or handle…"
          className="max-w-md" />
      </div>

      {/* Users table */}
      {loading ? (
        <div className="grid place-items-center py-16">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-12 text-center text-muted-foreground">
          No users found.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9">
                        <AvatarImage src={u.avatar || '/placeholder.svg'} alt={u.name} />
                        <AvatarFallback>{u.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{u.name}</span>
                        <span className="text-xs text-muted-foreground">@{u.handle}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{u.email}</TableCell>
                  <TableCell className="text-muted-foreground">{u.phone}</TableCell>
                  <TableCell>
                    <select
                      value={u.subscription}
                      onChange={(e) => updateSubscription(u.id, e.target.value)}
                      className={cn(
                        'rounded-md border px-2 py-1 text-xs font-medium capitalize outline-none transition-colors',
                        u.subscription === 'active'
                          ? 'border-chart-3/40 bg-chart-3/10 text-chart-3'
                          : u.subscription === 'pending'
                          ? 'border-chart-4/40 bg-chart-4/10 text-chart-4'
                          : 'border-border bg-secondary text-muted-foreground'
                      )}>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {ROLES.map((r) => {
                        const Icon = ROLE_ICONS[r];
                        const active = u.role === r;
                        return (
                          <button
                            key={r}
                            onClick={() => updateRole(u.id, r)}
                            className={cn(
                              'flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium capitalize transition-colors',
                              active
                                ? r === 'admin'
                                  ? 'border-chart-4/40 bg-chart-4/15 text-chart-4'
                                  : r === 'creator'
                                  ? 'border-accent/40 bg-accent/15 text-accent'
                                  : r === 'premium'
                                  ? 'border-primary/40 bg-primary/15 text-primary'
                                  : 'border-muted-foreground/40 bg-muted text-muted-foreground'
                                : 'border-border text-muted-foreground hover:text-foreground'
                            )}>
                            <Icon className="size-3" />
                            {r}
                          </button>
                        );
                      })}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => deleteUser(u.id)}
                      aria-label="Delete user">
                      <Trash2 className="size-4 text-muted-foreground" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
