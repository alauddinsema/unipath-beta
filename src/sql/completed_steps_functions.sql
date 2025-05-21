
-- Function to get completed steps for a user
CREATE OR REPLACE FUNCTION public.get_completed_steps_for_user(user_uuid UUID)
RETURNS TEXT[] AS $$
DECLARE
  steps TEXT[];
BEGIN
  SELECT array_agg(step_id) INTO steps
  FROM public.completed_steps
  WHERE user_id = user_uuid;
  
  RETURN COALESCE(steps, ARRAY[]::TEXT[]);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to mark a step as completed
CREATE OR REPLACE FUNCTION public.mark_step_completed(user_uuid UUID, step_id TEXT)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.completed_steps (user_id, step_id)
  VALUES (user_uuid, step_id)
  ON CONFLICT (user_id, step_id) DO NOTHING;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
