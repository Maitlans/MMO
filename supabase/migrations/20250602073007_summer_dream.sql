/*
  # Fix user registration RLS policy

  1. Changes
    - Add RLS policy to allow public user registration
    - Keep existing policies for user data access

  2. Security
    - Enable RLS on users table (if not already enabled)
    - Add policy for public registration
    - Maintain existing policies for data access
*/

-- Enable RLS on users table (idempotent)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy for public user registration
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'users' 
        AND policyname = 'Allow public user registration'
    ) THEN
        CREATE POLICY "Allow public user registration" 
        ON users 
        FOR INSERT 
        TO public 
        WITH CHECK (true);
    END IF;
END $$;