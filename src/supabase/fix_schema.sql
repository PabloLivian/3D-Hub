-- Add updated_at column if it's missing to fix the schema cache error
alter table public.profiles 
add column if not exists updated_at timestamp with time zone default timezone('utc'::text, now());
