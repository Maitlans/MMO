-- Drop existing tables and policies
DROP TABLE IF EXISTS public.users CASCADE;

-- Create users table with auth integration
CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS users_username_idx ON public.users (username);
CREATE INDEX IF NOT EXISTS users_email_idx ON public.users (email);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public user registration" 
ON public.users
FOR INSERT 
TO public
WITH CHECK (true);

CREATE POLICY "Users can view their own data" 
ON public.users
FOR SELECT
TO public
USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" 
ON public.users
FOR UPDATE
TO public
USING (auth.uid() = id);