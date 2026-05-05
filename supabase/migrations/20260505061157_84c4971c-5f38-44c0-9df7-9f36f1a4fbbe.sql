
ALTER FUNCTION public.set_updated_at() SET search_path = public;

REVOKE EXECUTE ON FUNCTION public.has_role(UUID, app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user_role() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;

DROP POLICY IF EXISTS "Media is publicly readable" ON storage.objects;
CREATE POLICY "Media files are publicly readable" ON storage.objects FOR SELECT
  USING (bucket_id = 'media' AND (storage.foldername(name))[1] IS NOT NULL);
