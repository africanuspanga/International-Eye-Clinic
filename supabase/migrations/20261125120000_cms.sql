-- ============================================================
-- International Eye Hospital — CMS schema (v2)
-- * Recreates the never-used content tables (blog_posts, doctors,
--   services, testimonials, gallery_images) with columns matching
--   the website's real content. Refuses to drop a table with rows.
-- * Keeps eye_conditions and site_settings (and their data).
-- * Adds hero_slides, submissions (form inbox) and the media bucket.
-- * Replaces the old "any signed-in user can write" policies with
--   admin-only policies (auth app_metadata.role = 'admin').
-- ============================================================

create extension if not exists pgcrypto;

-- ---------- helpers ----------
create or replace function public.is_admin() returns boolean
language sql stable
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false)
$$;

create or replace function public.set_updated_at() returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end
$$;

-- ---------- drop old-shape tables (only if empty) ----------
do $$
declare t text; n bigint;
begin
  foreach t in array array['blog_posts','doctors','services','testimonials','gallery_images']
  loop
    if to_regclass('public.' || t) is not null
       and coalesce(obj_description(('public.' || t)::regclass, 'pg_class'), '') <> 'cms-v2' then
      execute format('select count(*) from public.%I', t) into n;
      if n > 0 then
        raise exception 'Table % has % rows — refusing to drop it', t, n;
      end if;
      execute format('drop table public.%I cascade', t);
    end if;
  end loop;
end $$;

-- ---------- content tables ----------
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null default '',
  content text not null default '',
  category text not null default 'Eye Health Tips',
  image_url text not null default '',
  read_time text not null default '',
  published_date date not null default current_date,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
comment on table public.blog_posts is 'cms-v2';

create table if not exists public.doctors (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  title text not null default '',
  image_url text not null default '',
  image_position text not null default 'top',
  short_bio text not null default '',
  bio text not null default '',
  specialties text[] not null default '{}',
  experience text not null default '',
  education text not null default '',
  membership text not null default '',
  birth_place text not null default '',
  training text not null default '',
  specialization text not null default '',
  profession text not null default '',
  languages text not null default '',
  associations text[] not null default '{}',
  additional_info text not null default '',
  seo_title text not null default '',
  seo_description text not null default '',
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
comment on table public.doctors is 'cms-v2';

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  subtitle text not null default '',
  image_url text not null default '',
  content text not null default '',
  phone text not null default '+255 725 829 595',
  show_in_list boolean not null default true,
  card_image_url text not null default '',
  short_desc text not null default '',
  category text not null default 'General',
  link_url text not null default '',
  seo_title text not null default '',
  seo_description text not null default '',
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
comment on table public.services is 'cms-v2';

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text not null default '',
  procedure text not null default '',
  rating int not null default 5 check (rating between 1 and 5),
  text text not null,
  color text not null default '#e62d26',
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
comment on table public.testimonials is 'cms-v2';

create table if not exists public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  alt text not null default '',
  category text not null default 'Clinical',
  show_on_home boolean not null default false,
  home_span text not null default '',
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
comment on table public.gallery_images is 'cms-v2';

create table if not exists public.hero_slides (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  alt text not null default '',
  link_url text not null default '',
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  form text not null default 'appointment',
  name text,
  phone text,
  email text,
  message text,
  data jsonb not null default '{}',
  status text not null default 'new' check (status in ('new', 'contacted', 'booked', 'closed', 'spam')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists submissions_created_at_idx on public.submissions (created_at desc);

-- ---------- updated_at triggers ----------
do $$
declare t text;
begin
  foreach t in array array['blog_posts','doctors','services','testimonials','gallery_images','hero_slides','submissions']
  loop
    execute format('drop trigger if exists set_updated_at on public.%I', t);
    execute format('create trigger set_updated_at before update on public.%I for each row execute function public.set_updated_at()', t);
  end loop;
end $$;

-- ---------- row level security ----------
-- Remove every existing policy on the CMS tables first (the old ones let any
-- signed-in user write).
do $$
declare p record;
begin
  for p in
    select tablename, policyname from pg_policies
    where schemaname = 'public'
      and tablename in ('blog_posts','doctors','services','testimonials','gallery_images','hero_slides',
                        'eye_conditions','site_settings','submissions')
  loop
    execute format('drop policy %I on public.%I', p.policyname, p.tablename);
  end loop;
end $$;

do $$
declare t text;
begin
  foreach t in array array['blog_posts','doctors','services','testimonials','gallery_images','hero_slides','eye_conditions']
  loop
    execute format('alter table public.%I enable row level security', t);
    execute format('create policy "public read published" on public.%I for select using (is_published or public.is_admin())', t);
    execute format('create policy "admin insert" on public.%I for insert to authenticated with check (public.is_admin())', t);
    execute format('create policy "admin update" on public.%I for update to authenticated using (public.is_admin()) with check (public.is_admin())', t);
    execute format('create policy "admin delete" on public.%I for delete to authenticated using (public.is_admin())', t);
    execute format('revoke insert, update, delete on public.%I from anon', t);
    execute format('grant select on public.%I to anon, authenticated', t);
    execute format('grant insert, update, delete on public.%I to authenticated', t);
  end loop;
end $$;

alter table public.site_settings enable row level security;
create policy "public read settings" on public.site_settings for select using (true);
create policy "admin write settings" on public.site_settings for all to authenticated
  using (public.is_admin()) with check (public.is_admin());
revoke insert, update, delete on public.site_settings from anon;
grant select on public.site_settings to anon, authenticated;
grant insert, update, delete on public.site_settings to authenticated;

alter table public.submissions enable row level security;
create policy "public can submit" on public.submissions for insert to anon, authenticated
  with check (
    status = 'new'
    and notes is null
    and char_length(coalesce(name, '')) <= 200
    and char_length(coalesce(phone, '')) <= 50
    and char_length(coalesce(email, '')) <= 200
    and char_length(coalesce(message, '')) <= 5000
    and pg_column_size(data) <= 16384
  );
create policy "admin read submissions" on public.submissions for select to authenticated using (public.is_admin());
create policy "admin update submissions" on public.submissions for update to authenticated
  using (public.is_admin()) with check (public.is_admin());
create policy "admin delete submissions" on public.submissions for delete to authenticated using (public.is_admin());
revoke select, update, delete on public.submissions from anon;
grant insert on public.submissions to anon, authenticated;
grant select, update, delete on public.submissions to authenticated;

-- ---------- media storage ----------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 52428800, array['image/*', 'video/*', 'application/pdf'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "media admin select" on storage.objects;
drop policy if exists "media admin insert" on storage.objects;
drop policy if exists "media admin update" on storage.objects;
drop policy if exists "media admin delete" on storage.objects;
create policy "media admin select" on storage.objects for select to authenticated
  using (bucket_id = 'media' and public.is_admin());
create policy "media admin insert" on storage.objects for insert to authenticated
  with check (bucket_id = 'media' and public.is_admin());
create policy "media admin update" on storage.objects for update to authenticated
  using (bucket_id = 'media' and public.is_admin()) with check (bucket_id = 'media' and public.is_admin());
create policy "media admin delete" on storage.objects for delete to authenticated
  using (bucket_id = 'media' and public.is_admin());

-- ---------- settings: align the (previously unused) contact values with the
-- details the live website footer shows, since the footer now reads them.
update public.site_settings set value = '+255 725 829 595' where key = 'site_phone' and value = '+255 784 104 300';
update public.site_settings set value = E'Tropical Center, New Bagamoyo Road,\nP.O. Box 2083, Dar es Salaam, Tanzania'
  where key = 'site_address' and value = 'Tropical Center, New Bagamoyo Road, Dar es Salaam, Tanzania';
update public.site_settings set value = '8:30 AM – 2:00 PM' where key = 'working_hours_saturday' and value = '8:30 AM – 5:30 PM';
