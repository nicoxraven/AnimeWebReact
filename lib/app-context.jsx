'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState } from

'react';
import { toast } from 'sonner';
import { users as seedUsers } from './mock-data';
import { supabase } from './supabase-client';





























const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [users, setUsers] = useState(seedUsers);
  const [currentUser, setCurrentUser] = useState(null);
  const [authModal, setAuthModal] = useState(null);
  const [kpayOpen, setKPayOpen] = useState(false);
  const [votes, setVotes] = useState({});

  const openAuth = useCallback((mode) => {
    setAuthModal(mode);
  }, []);
  const closeAuth = useCallback(() => setAuthModal(null), []);

  const login = useCallback(
    async (email) => {
      if (email) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('email', email)
          .maybeSingle();
        if (data) {
          setCurrentUser(data);
          setAuthModal(null);
          toast.success(`Welcome back, ${data.name.split(' ')[0]}!`);
          return;
        }
      }
      const found = users[2];
      setCurrentUser(found);
      setAuthModal(null);
      toast.success(`Welcome back, ${found.name.split(' ')[0]}!`);
    },
    [users]
  );

  const signup = useCallback(async (name, email) => {
    const handle = (name || 'new_otaku').toLowerCase().replace(/\s+/g, '_');
    const { data } = await supabase
      .from('profiles')
      .insert({
        name: name || 'New Otaku',
        handle,
        email: email || 'new@kamistream.io',
        phone: '—',
        avatar: '/anime/cover-mecha.png',
        role: 'free',
        subscription: 'inactive',
        joined: 'Just now',
      })
      .select()
      .single();
    const newUser = data || {
      id: `u${Date.now()}`,
      name: name || 'New Otaku',
      handle,
      email,
      phone: '—',
      avatar: '/anime/cover-mecha.png',
      role: 'free',
      subscription: 'inactive',
      joined: 'Just now',
    };
    setUsers((prev) => [newUser, ...prev]);
    setCurrentUser(newUser);
    setAuthModal(null);
    toast.success('Account created. Welcome to KamiStream!');
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    toast('Signed out');
  }, []);

  const openKPay = useCallback(() => setKPayOpen(true), []);
  const closeKPay = useCallback(() => setKPayOpen(false), []);

  const activateSubscription = useCallback((plan, phone) => {
    setCurrentUser((prev) => {
      if (!prev) return prev;
      const upgraded = {
        ...prev,
        phone: phone || prev.phone,
        role: prev.role === 'free' ? 'premium' : prev.role,
        subscription: 'active'
      };
      setUsers((list) =>
      list.map((u) => u.id === upgraded.id ? upgraded : u)
      );
      return upgraded;
    });
    setKPayOpen(false);
    toast.success(
      `${plan === 'yearly' ? 'Yearly' : 'Monthly'} premium unlocked!`
    );
  }, []);

  const isPremium = useMemo(
    () =>
    !!currentUser && (
    currentUser.role === 'premium' ||
    currentUser.role === 'creator' ||
    currentUser.role === 'admin'),
    [currentUser]
  );

  const canAccessPremium = isPremium;

  const requirePremium = useCallback(
    (label) => {
      if (!currentUser) {
        setAuthModal('signin');
        toast('Sign in to continue', {
          description: label ? `${label} requires an account.` : undefined
        });
        return false;
      }
      if (!canAccessPremium) {
        setKPayOpen(true);
        return false;
      }
      return true;
    },
    [currentUser, canAccessPremium]
  );

  const updateUserRole = useCallback(
    (id, role) => {
      setUsers((prev) => prev.map((u) => u.id === id ? { ...u, role } : u));
      setCurrentUser((prev) => prev && prev.id === id ? { ...prev, role } : prev);
      toast.success(`Role updated to ${role}`);
    },
    []
  );

  const updateUserSubscription = useCallback(
    (id, status) => {
      setUsers((prev) =>
      prev.map((u) => u.id === id ? { ...u, subscription: status } : u)
      );
    },
    []
  );

  const deleteUser = useCallback((id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    toast('User removed');
  }, []);

  const vote = useCallback((id, dir) => {
    setVotes((prev) => {
      const current = prev[id] ?? 0;
      // toggle behavior: clicking same direction cancels
      const next = current === dir ? 0 : dir;
      return { ...prev, [id]: next };
    });
  }, []);

  const value = {
    currentUser,
    users,
    authModal,
    kpayOpen,
    openAuth,
    closeAuth,
    login,
    signup,
    logout,
    openKPay,
    closeKPay,
    activateSubscription,
    isPremium,
    canAccessPremium,
    requirePremium,
    updateUserRole,
    updateUserSubscription,
    deleteUser,
    votes,
    vote
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}