import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const url = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Keeping this nullable lets /api/health work before the developer has entered
// credentials, while all data endpoints still fail safely with a clear message.
export const supabase = url && serviceRoleKey
  ? createClient(url, serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } })
  : null;

export const isSupabaseConfigured = Boolean(supabase);
