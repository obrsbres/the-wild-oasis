import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://xxsoosyisoxoxumafovm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4c29vc3lpc294b3h1bWFmb3ZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzNDM4ODAsImV4cCI6MjA3NDkxOTg4MH0.y4DWoq8Sc5er6S46zjaOAk0hCBm9CHB9F3kz7lWC58w";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
//https://xxsoosyisoxoxumafovm.supabase.co