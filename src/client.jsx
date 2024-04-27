import { createClient } from '@supabase/supabase-js'

const URL = 'https://rulxffpcpvjkapoigpgg.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1bHhmZnBjcHZqa2Fwb2lncGdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4NjU2MTksImV4cCI6MjAyODQ0MTYxOX0.0yJhPVy85e0gCZQmkBJwX0a1wzYCNVaFFTNNSdXUmdk'
export const supabase = createClient(URL,API_KEY)