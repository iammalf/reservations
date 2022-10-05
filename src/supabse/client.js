import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://nyaixyznljhfeymzizkc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55YWl4eXpubGpoZmV5bXppemtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjIxNDE1NjgsImV4cCI6MTk3NzcxNzU2OH0.jARveIJNg9Ztdy3BYtqq_sdlifsb_9kALaFdqDqdUEs"
);
