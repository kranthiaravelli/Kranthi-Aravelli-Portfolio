import { createClient } from 
    'https://esm.sh/@supabase/supabase-js@2';

const supabaseURL = "https://wudreejdkpijybvwojnq.supabase.co";
const supabaseKey = "sb_publishable_3EAv6U6vMrUUuRJD2HWuMg_fD-ZoaeO";

export const supabase = createClient(
    supabaseURL.trim(),
    supabaseKey.trim()
);