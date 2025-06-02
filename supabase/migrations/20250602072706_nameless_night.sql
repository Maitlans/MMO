/*
  # Fix users table RLS policy for registration

  1. Changes
    - Add RLS policy to allow public user registration
    - Keep existing policies for user data access

  2. Security
    - Enable RLS on users table (if not already enabled)
    - Add policy for public user registration
    - Maintain existing policies for data access
*/

-- Enable RLS on users table (idempotent)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Add policy for public user registration
CREATE POLICY "Allow public user registration" ON users
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Note: Existing policies for SELECT and UPDATE are preserved