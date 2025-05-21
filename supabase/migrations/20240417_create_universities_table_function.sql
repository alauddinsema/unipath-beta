
-- Function to create universities table
CREATE OR REPLACE FUNCTION public.create_universities_table()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if the table already exists
  IF NOT EXISTS (
    SELECT FROM pg_tables
    WHERE schemaname = 'public' AND tablename = 'universities'
  ) THEN
    -- Create the universities table
    CREATE TABLE public.universities (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      country TEXT,
      state_province TEXT,
      city TEXT,
      website TEXT,
      founded_year INTEGER,
      alpha_two_code TEXT,
      domains TEXT[],
      web_pages TEXT[],
      latitude DECIMAL,
      longitude DECIMAL,
      logo_url TEXT,
      region TEXT,
      scholarships_available BOOLEAN DEFAULT false,
      acceptance_rate DECIMAL,
      student_faculty_ratio TEXT,
      min_gpa DECIMAL,
      min_sat_score INTEGER,
      min_ielts_score DECIMAL,
      min_duolingo_score INTEGER,
      degree_type TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
    
    -- Add an index on the name for faster searches
    CREATE INDEX idx_universities_name ON public.universities(name);
    
    -- Add RLS policies
    ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;
    
    -- Allow anyone to read universities
    CREATE POLICY "Universities are viewable by everyone" 
    ON public.universities FOR SELECT 
    USING (true);
    
    -- Only allow admins to insert/update/delete
    CREATE POLICY "Admins can insert universities" 
    ON public.universities FOR INSERT 
    WITH CHECK (EXISTS (
      SELECT 1
      FROM public.admin_users
      WHERE user_id = auth.uid()
    ));
    
    CREATE POLICY "Admins can update universities" 
    ON public.universities FOR UPDATE 
    USING (EXISTS (
      SELECT 1
      FROM public.admin_users
      WHERE user_id = auth.uid()
    ));
    
    CREATE POLICY "Admins can delete universities" 
    ON public.universities FOR DELETE 
    USING (EXISTS (
      SELECT 1
      FROM public.admin_users
      WHERE user_id = auth.uid()
    ));
  END IF;
  
  -- Check if admin_users table exists
  IF NOT EXISTS (
    SELECT FROM pg_tables
    WHERE schemaname = 'public' AND tablename = 'admin_users'
  ) THEN
    -- Create the admin_users table
    CREATE TABLE public.admin_users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
      email TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(user_id),
      UNIQUE(email)
    );
    
    -- Add RLS policies
    ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
    
    -- Only admins can see the admin_users table
    CREATE POLICY "Admins can view admin_users" 
    ON public.admin_users FOR SELECT 
    USING (EXISTS (
      SELECT 1
      FROM public.admin_users
      WHERE user_id = auth.uid()
    ));
    
    -- Only super admins can modify the admin_users table
    -- For now, we'll use the first admin as the super admin
    CREATE POLICY "First admin can insert other admins" 
    ON public.admin_users FOR INSERT 
    WITH CHECK (
      (SELECT COUNT(*) FROM public.admin_users) = 0 
      OR 
      EXISTS (
        SELECT 1
        FROM public.admin_users
        WHERE user_id = auth.uid()
      )
    );
    
    -- Insert the current user as the first admin
    INSERT INTO public.admin_users (user_id, email)
    VALUES ('0b307ffd-7f6b-4802-9d21-fa229ebcde68', 'slidessemastudent@gmail.com');
  END IF;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.create_universities_table() TO authenticated;

-- Function to check if a user is an admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE admin_users.user_id = $1
  );
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.is_admin(UUID) TO authenticated;
