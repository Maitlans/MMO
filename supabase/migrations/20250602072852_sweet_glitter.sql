/*
  # Fix users table RLS policies

  1. Changes
    - Add RLS policy to allow public user registration
    - Keep existing policies for authenticated users

  2. Security
    - Enable RLS on users table (if not already enabled)
    - Add policy for public registration
    - Maintain existing policies for user data access
*/

-- Enable RLS on users table (idempotent)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy for public user registration
CREATE POLICY "Allow public user registration"
ON users
FOR INSERT
TO public
WITH CHECK (true);

-- Note: Existing policies for authenticated users remain unchanged:
-- - "Users can update their own data"
-- - "Users can view their own data"