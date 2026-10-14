-- Lets everyone read the pandals table (map + check-ins) while keeping
-- writes server-only: POST /api/pandals inserts with the service-role key
-- after verifying the add-pandal code, which bypasses RLS.
alter table public.pandals enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'pandals' and policyname = 'pandals are readable by everyone'
  ) then
    create policy "pandals are readable by everyone"
      on public.pandals for select using (true);
  end if;
end $$;
