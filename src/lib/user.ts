'use client';

import { createClient } from './supabase/client';

export const getCurrentUser = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw error;
  }
  return data.user;
};
