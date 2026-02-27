import { createClient } from '@supabase/supabase-js'
const supabaseUrl = "https://vosdrvosaagvkanmecpn.supabase.co"
const supabaseKey = "sb_publishable_xR1gExp_hv54O5pLWyAm_A_QMEdrcZT"

const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase