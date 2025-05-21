
-- Create a table to track completed steps in the user's path
CREATE TABLE IF NOT EXISTS public.completed_steps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    step_id TEXT NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    
    -- Make sure we don't have duplicate entries for the same user and step
    UNIQUE(user_id, step_id)
);

-- Set up row-level security
ALTER TABLE public.completed_steps ENABLE ROW LEVEL SECURITY;

-- Allow users to select their own completed steps
CREATE POLICY "Users can view their own completed steps"
    ON public.completed_steps
    FOR SELECT
    USING (auth.uid() = user_id);

-- Allow users to insert their own completed steps
CREATE POLICY "Users can insert their own completed steps"
    ON public.completed_steps
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own completed steps
CREATE POLICY "Users can update their own completed steps"
    ON public.completed_steps
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Allow users to delete their own completed steps
CREATE POLICY "Users can delete their own completed steps"
    ON public.completed_steps
    FOR DELETE
    USING (auth.uid() = user_id);
