import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xsvmhidbzxktrydzxnuj.supabase.co'
const supabaseAnonKey = 'sb_publishable__Lk3iFiBQSp7Al2TZid4XA_aJqoXjaR'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)