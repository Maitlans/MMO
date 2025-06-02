-- Enable RLS on users table (idempotent)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM pg_policies 
        WHERE tablename = 'users' 
        AND policyname = 'Allow public user registration'
    ) THEN
        DROP POLICY "Allow public user registration" ON users;
    END IF;
END $$;

-- Add policy for public user registration
CREATE POLICY "Allow public user registration" ON users
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Note: Existing policies for SELECT and UPDATE are preserved