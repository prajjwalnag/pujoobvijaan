-- Run once in the Supabase SQL editor. No app env changes needed.
--
-- 1) Everyone can read pandals (map + check-ins).
-- 2) Adding a pandal goes through add_pandal(), which checks the code
--    inside the database and then inserts. Direct inserts stay blocked
--    by RLS, so the code is the only way in. To change the code, edit
--    the literal below and re-run the function definition.
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

create or replace function public.add_pandal(
  p_code text,
  p_name text,
  p_region text,
  p_crowd_level text,
  p_lat double precision,
  p_lng double precision
) returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  new_id text;
begin
  if p_code is distinct from '1968' then
    raise exception 'incorrect code';
  end if;
  if coalesce(trim(p_name), '') = '' or length(p_name) > 120 then
    raise exception 'invalid name';
  end if;
  if p_crowd_level not in ('high', 'medium', 'low') then
    raise exception 'invalid size';
  end if;
  if p_region not in ('North Kolkata','South Kolkata','Central Kolkata','East Kolkata','West Kolkata','North 24 Parganas','South 24 Parganas','Howrah') then
    raise exception 'invalid region';
  end if;
  if p_lat not between 21.5 and 23.5 or p_lng not between 87.5 and 89 then
    raise exception 'location outside Kolkata area';
  end if;

  new_id := 'user-' || substr(md5(random()::text || clock_timestamp()::text), 1, 10);
  insert into public.pandals (id, name, region, crowd_level, lat, lng, geocoded)
  values (new_id, trim(p_name), p_region, p_crowd_level, p_lat, p_lng, true);
  return new_id;
end;
$$;

revoke all on function public.add_pandal(text, text, text, text, double precision, double precision) from public;
grant execute on function public.add_pandal(text, text, text, text, double precision, double precision) to anon, authenticated;
