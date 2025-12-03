import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yabvsthnjtlqgntxdrvs.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhYnZzdGhuanRscWdudHhkcnZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2ODI1NzEsImV4cCI6MjA4MDI1ODU3MX0.txTyi_1pYroeXTrYpKW07eOlEMvz1oEUZpasfr-qNus'

export const supabase = createClient(supabaseUrl, supabaseAnonKey);