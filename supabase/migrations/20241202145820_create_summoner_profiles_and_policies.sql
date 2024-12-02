create table "public"."summoner_profiles" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "puuid" uuid not null,
    "summonerId" uuid not null,
    "accountId" uuid not null,
    "gameName" character varying not null,
    "tagLine" character varying not null,
    "profileIconId" integer not null,
    "summonerLevel" smallint not null,
    "revisionDate" bigint not null
);


alter table "public"."summoner_profiles" enable row level security;

CREATE UNIQUE INDEX "summoner_profiles_accountId_key" ON public.summoner_profiles USING btree ("accountId");

CREATE UNIQUE INDEX summoner_profiles_pkey ON public.summoner_profiles USING btree (id);

CREATE UNIQUE INDEX summoner_profiles_puuid_key ON public.summoner_profiles USING btree (puuid);

CREATE UNIQUE INDEX "summoner_profiles_summonerId_key" ON public.summoner_profiles USING btree ("summonerId");

alter table "public"."summoner_profiles" add constraint "summoner_profiles_pkey" PRIMARY KEY using index "summoner_profiles_pkey";

alter table "public"."summoner_profiles" add constraint "summoner_profiles_accountId_key" UNIQUE using index "summoner_profiles_accountId_key";

alter table "public"."summoner_profiles" add constraint "summoner_profiles_puuid_key" UNIQUE using index "summoner_profiles_puuid_key";

alter table "public"."summoner_profiles" add constraint "summoner_profiles_summonerId_key" UNIQUE using index "summoner_profiles_summonerId_key";

grant delete on table "public"."summoner_profiles" to "anon";

grant insert on table "public"."summoner_profiles" to "anon";

grant references on table "public"."summoner_profiles" to "anon";

grant select on table "public"."summoner_profiles" to "anon";

grant trigger on table "public"."summoner_profiles" to "anon";

grant truncate on table "public"."summoner_profiles" to "anon";

grant update on table "public"."summoner_profiles" to "anon";

grant delete on table "public"."summoner_profiles" to "authenticated";

grant insert on table "public"."summoner_profiles" to "authenticated";

grant references on table "public"."summoner_profiles" to "authenticated";

grant select on table "public"."summoner_profiles" to "authenticated";

grant trigger on table "public"."summoner_profiles" to "authenticated";

grant truncate on table "public"."summoner_profiles" to "authenticated";

grant update on table "public"."summoner_profiles" to "authenticated";

grant delete on table "public"."summoner_profiles" to "service_role";

grant insert on table "public"."summoner_profiles" to "service_role";

grant references on table "public"."summoner_profiles" to "service_role";

grant select on table "public"."summoner_profiles" to "service_role";

grant trigger on table "public"."summoner_profiles" to "service_role";

grant truncate on table "public"."summoner_profiles" to "service_role";

grant update on table "public"."summoner_profiles" to "service_role";

create policy "Enable insert for to summoner_profiles for anon users only"
on "public"."summoner_profiles"
as permissive
for insert
to anon
with check (true);


create policy "Enable read access for all users"
on "public"."summoner_profiles"
as permissive
for select
to public
using (true);


create policy "Enable users to view their own data only"
on "public"."user_profiles"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));



