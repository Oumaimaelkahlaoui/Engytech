import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://creycxfwplvmglmvchdb.supabase.co' 
const supabaseKey = 'sb_publishable_NXH0q61EB560zGcE_rn7Uw_8j9u1WOk' 

export const supabase = createClient(supabaseUrl, supabaseKey)