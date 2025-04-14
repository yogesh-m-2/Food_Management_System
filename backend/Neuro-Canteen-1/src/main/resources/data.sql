
-- ===================== Adding ADMIN =====================

INSERT INTO admin (id, name, password, username)VALUES (1, 'Neuro', '1234', 'fjsd')ON CONFLICT (id) DO NOTHING;
