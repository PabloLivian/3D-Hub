-- FIX: Modify the handle_new_user function to handle missing metadata (Google Auth)
-- It will default to 'artist' if no role is provided.

create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, role, email, full_name, avatar_url)
  values (
    new.id,
    -- Si no viene el rol (Google Auth), por defecto ponemos 'artist'
    COALESCE(new.raw_user_meta_data->>'role', 'artist'),
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;
