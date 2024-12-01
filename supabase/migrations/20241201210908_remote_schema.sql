create policy "Enable read access for all users"
on "public"."summoner_profiles"
as permissive
for select
to public
using (true);



