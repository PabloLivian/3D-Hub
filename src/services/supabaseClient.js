
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase credentials missing! Check .env (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)')
}

// Helper to create a safe mock function
const mockAsync = () => Promise.resolve({ error: { message: 'Supabase credentials missing' } });

// Create client only if keys exist to avoid immediate crash, otherwise create a mock
export const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : {
        auth: {
            getSession: () => Promise.resolve({ data: { session: null } }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
            signUp: mockAsync,
            signInWithPassword: mockAsync,
            signOut: mockAsync,
            signInWithOAuth: mockAsync
        }
    }
