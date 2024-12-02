alter table "public"."summoner_profiles" drop constraint "summoner_profiles_pkey";

drop index if exists "public"."summoner_profiles_pkey";

CREATE UNIQUE INDEX summoner_profiles_id_key ON public.summoner_profiles USING btree (id);

CREATE UNIQUE INDEX summoner_profiles_pkey ON public.summoner_profiles USING btree (puuid);

alter table "public"."summoner_profiles" add constraint "summoner_profiles_pkey" PRIMARY KEY using index "summoner_profiles_pkey";

alter table "public"."summoner_profiles" add constraint "summoner_profiles_id_key" UNIQUE using index "summoner_profiles_id_key";


