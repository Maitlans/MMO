/*
  # Fix users table RLS policies

  1. Changes
    - Add INSERT policy to allow new user registration
    - Keep existing policies for SELECT and UPDATE

  2. Security
    - Allow unauthenticated users to create new accounts
    - Maintain existing RLS policies for data access
*/

-- Add policy to allow new user registration
CREATE POLICY "Allow public user registration"
  ON users
  FOR INSERT
  TO public
  WITH CHECK (true);