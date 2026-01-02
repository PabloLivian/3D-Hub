-- Create a table for public profiles (linked to auth.users)
create table profiles (
  id uuid references auth.users not null primary key,
  role text check (role in ('company', 'artist')) not null,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table profiles enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Create a function to handle new user signing up
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, role, email, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'role',
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Bookmark/Saved Items table
create table bookmarks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) not null,
  target_id text not null, -- ID of the job or artist
  type text check (type in ('job', 'artist')) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table bookmarks enable row level security;

create policy "Users can see their own bookmarks." on bookmarks
  for select using (auth.uid() = user_id);

create policy "Users can insert their own bookmarks." on bookmarks
  for insert with check (auth.uid() = user_id);

create policy "Users can delete their own bookmarks." on bookmarks
  for delete using (auth.uid() = user_id);
