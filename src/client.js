import { createClient } from '@supabase/supabase-js';

const URL = 'https://puazverfbdkiustwupio.supabase.co';  // ← 替换为你的项目 URL
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1YXp2ZXJmYmRraXVzdHd1cGlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzNzgyOTcsImV4cCI6MjA2NTk1NDI5N30.zmXhJiyrCDwnoSVSvHBluya1g7b8QxK34X2Q80nMJoM';     // ← 替换为你的匿名 API Key

export const supabase = createClient(URL, API_KEY);
