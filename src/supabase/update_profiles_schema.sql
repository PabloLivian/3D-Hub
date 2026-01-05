-- 1. Add new columns to 'profiles' table to match Join List form
alter table public.profiles 
add column if not exists job_title text,
add column if not exists country text,
add column if not exists city text,
add column if not exists availability text,
add column if not exists years_of_experience integer,
add column if not exists relocation text,
add column if not exists work_preference text,
add column if not exists linkedin_url text,
add column if not exists portfolio_url text,
add column if not exists cv_url text, -- To store the CV link if uploaded
add column if not exists industries text[], -- Array of text for tags
add column if not exists software text[];   -- Array of text for tags

-- 2. Create Storage Bucket for Avatars (if not exists)
-- Note: Running this might fail if bucket exists, usually done via Dashboard, but here is SQL attempt.
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- 3. Create Storage Policies for Avatars
-- Allow public read access
create policy "Public Access to Avatars"
on storage.objects for select
using ( bucket_id = 'avatars' );

-- Allow authenticated users to upload their own avatar
-- (Assumes the file path will be prefixed with user_id or similar, or just relying on auth)
create policy "Users can upload their own avatar"
on storage.objects for insert
with check ( bucket_id = 'avatars' and auth.role() = 'authenticated' );

-- Allow users to update their own avatar
create policy "Users can update their own avatar"
on storage.objects for update
using ( bucket_id = 'avatars' and auth.uid() = owner );

-- (Optional) Create Storage Bucket for CVs
insert into storage.buckets (id, name, public)
values ('cvs', 'cvs', true) -- Public or Private? Usually CVs might be private, but for job board public might be needed for recruiters. Keeping public implementation simple.
on conflict (id) do nothing;

create policy "Public Access to CVs"
on storage.objects for select
using ( bucket_id = 'cvs' );

create policy "Users can upload their own CV"
on storage.objects for insert
with check ( bucket_id = 'cvs' and auth.role() = 'authenticated' );
