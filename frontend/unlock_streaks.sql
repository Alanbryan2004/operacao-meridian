-- Copie e cole este código no SQL Editor do Supabase e clique em RUN
DROP POLICY IF EXISTS "Todos podem ver os streaks" ON daily_streaks;

CREATE POLICY "Todos podem ver os streaks" 
ON daily_streaks 
FOR SELECT 
USING (true);
