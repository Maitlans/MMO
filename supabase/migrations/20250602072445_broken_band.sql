-- Create users table
create table if not exists public.users (
  id uuid default gen_random_uuid() primary key,
  username text unique not null,
  email text unique not null,
  password text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.users enable row level security;

-- Create policies
create policy "Users can view their own data" on public.users
  for select using (auth.uid() = id);

create policy "Users can update their own data" on public.users
  for update using (auth.uid() = id);

-- Create indexes for performance
create index if not exists users_username_idx on public.users (username);
create index if not exists users_email_idx on public.users (email);