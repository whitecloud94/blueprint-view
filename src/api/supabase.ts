import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// 싱글톤 객체 생성
export const supabase = createClient(supabaseUrl, supabaseAnonKey)