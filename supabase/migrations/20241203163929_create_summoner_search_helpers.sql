CREATE INDEX idx_summoner_game_name ON public.summoner_profiles USING btree ("gameName");

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.search_summoner_profiles_by_prefix(prefix text)
 RETURNS SETOF summoner_profiles
 LANGUAGE plpgsql
AS $function$begin
  return query
  select * from public.summoner_profiles where to_tsvector('english', "gameName") @@ to_tsquery(prefix || ':*');
end;$function$
;


