SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.6
-- Dumped by pg_dump version 15.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', '5f03cd59-b064-4d39-8446-303bb12fda65', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"aukai.tirrell@gmail.com","user_id":"07812d0d-2387-4174-b790-80f5b3ac5ad7","user_phone":""}}', '2024-12-02 13:56:11.482471+00', ''),
	('00000000-0000-0000-0000-000000000000', '3bd9276a-2fc9-4ede-9059-5d94f0479e5b', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"arthurleedev@gmail.com","user_id":"e30ebc83-8409-472f-b6cd-7830e2ec4fcd","user_phone":""}}', '2024-12-02 13:56:40.419083+00', ''),
	('00000000-0000-0000-0000-000000000000', '307bfcf6-6ae2-46d6-bcf6-b08b711d7907', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"takahashi808@gmail.com","user_id":"bd7e79a0-b8b6-4941-be0b-36eadd9110c5","user_phone":""}}', '2024-12-02 13:56:52.7092+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd313849a-ab66-4a34-b891-4e6b701ef192', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"aukaitirrell@webmocha.com","user_id":"6df7608d-bedc-4315-afde-81e64977d16b","user_phone":""}}', '2024-12-02 16:54:25.482822+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', '07812d0d-2387-4174-b790-80f5b3ac5ad7', 'authenticated', 'authenticated', 'aukai.tirrell@gmail.com', '$2a$10$MOHWZxy2X1ANIfCrrElfD.XepY9ZRxu1CtuP1OWfB6XH34YpOfruS', '2024-12-02 13:56:11.484775+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2024-12-02 13:56:11.474227+00', '2024-12-02 13:56:11.484916+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'e30ebc83-8409-472f-b6cd-7830e2ec4fcd', 'authenticated', 'authenticated', 'arthurleedev@gmail.com', '$2a$10$4NatNLA2WCFxccxctEExGOiK8n.Gw81GfiAHxlSHon.PkdqIdz3CS', '2024-12-02 13:56:40.419552+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2024-12-02 13:56:40.417105+00', '2024-12-02 13:56:40.419663+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'bd7e79a0-b8b6-4941-be0b-36eadd9110c5', 'authenticated', 'authenticated', 'takahashi808@gmail.com', '$2a$10$titAQ.OcdhJ4diYAfDNg3.BvbM416slAQ6f/5tbVsxA659jRZ.Hha', '2024-12-02 13:56:52.710088+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2024-12-02 13:56:52.706486+00', '2024-12-02 13:56:52.710223+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('07812d0d-2387-4174-b790-80f5b3ac5ad7', '07812d0d-2387-4174-b790-80f5b3ac5ad7', '{"sub": "07812d0d-2387-4174-b790-80f5b3ac5ad7", "email": "aukai.tirrell@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2024-12-02 13:56:11.481842+00', '2024-12-02 13:56:11.481886+00', '2024-12-02 13:56:11.481886+00', '6472c092-bc1c-40d6-af25-6a07a934c449'),
	('e30ebc83-8409-472f-b6cd-7830e2ec4fcd', 'e30ebc83-8409-472f-b6cd-7830e2ec4fcd', '{"sub": "e30ebc83-8409-472f-b6cd-7830e2ec4fcd", "email": "arthurleedev@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2024-12-02 13:56:40.418809+00', '2024-12-02 13:56:40.418835+00', '2024-12-02 13:56:40.418835+00', '5e14c73b-5427-4b89-be80-714296bf1119'),
	('bd7e79a0-b8b6-4941-be0b-36eadd9110c5', 'bd7e79a0-b8b6-4941-be0b-36eadd9110c5', '{"sub": "bd7e79a0-b8b6-4941-be0b-36eadd9110c5", "email": "takahashi808@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2024-12-02 13:56:52.708881+00', '2024-12-02 13:56:52.708905+00', '2024-12-02 13:56:52.708905+00', 'e85689fe-db55-4fb1-a373-8beb90258174');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: summoner_profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: user_profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."user_profiles" ("user_id", "first_name", "last_name") VALUES
	('07812d0d-2387-4174-b790-80f5b3ac5ad7', 'Aukai', 'Tirrell'),
	('bd7e79a0-b8b6-4941-be0b-36eadd9110c5', 'Reyn', 'Takahashi'),
	('e30ebc83-8409-472f-b6cd-7830e2ec4fcd', 'Arthur', 'Lee');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, false);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
