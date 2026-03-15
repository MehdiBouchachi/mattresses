import { createClient } from "@supabase/supabase-js";

/* export const supabase1 = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
); */


export const supabase = createClient(
  "https://initwjuydablyalgmeqt.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImluaXR3anV5ZGFibHlhbGdtZXF0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzA0MzQyNSwiZXhwIjoyMDg4NjE5NDI1fQ.jQejUBiflmP-HiZWVudGITRFLuv1HhzZ7LUKx4RHqfM"
);