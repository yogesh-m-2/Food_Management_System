
-- ===================== Adding ADMIN =====================
INSERT INTO admin (id, name, password,username) VALUES (1,'Neuro', '1234','fjsd');


-- ===================== CLEAR LIQUID MENU =====================

-- NORMAL
INSERT INTO public.menu_item (id, category, name, price, role, picture, description, staff_price, patient_price, dietitian_price, is_available)
VALUES
(1, 'Clear liquid', 'Milk', 6, 'Staff', NULL, 'Warm milk for normal diet.', 6, 12, 10, TRUE),
(2, 'Clear liquid', 'Rice Feed', 8, 'Staff', NULL, 'Easy digestible rice feed.', 8, 16, 14, TRUE),
(3, 'Clear liquid', 'Vegetable/Green/Dhall Feed', 10, 'Staff', NULL, 'Healthy vegetable and green feed.', 10, 20, 18, TRUE),
(4, 'Clear liquid', 'Multigrain Feed', 12, 'Staff', NULL, 'Balanced multigrain liquid feed.', 12, 24, 20, TRUE),
(5, 'Clear liquid', 'Green Gram Feed', 7, 'Staff', NULL, 'Nutritious green gram feed.', 7, 14, 12, TRUE);

-- DM (Diabetes Mellitus)
INSERT INTO public.menu_item (id, category, name, price, role, picture, description, staff_price, patient_price, dietitian_price, is_available)
VALUES
(6, 'Clear liquid', 'Milk without sugar', 6, 'Staff', NULL, 'Milk without sugar suitable for diabetes.', 6, 12, 10, TRUE),
(7, 'Clear liquid', 'Wheat Feed', 9, 'Staff', NULL, 'Light wheat feed suitable for diabetic patients.', 9, 18, 15, TRUE),
(8, 'Clear liquid', 'Dhall Soup/Green Soup', 10, 'Staff', NULL, 'Healthy and light dhall/green soup.', 10, 20, 18, TRUE),
(9, 'Clear liquid', 'Multigrain Feed', 11, 'Staff', NULL, 'Multigrain feed recommended for diabetics.', 11, 22, 19, TRUE),
(10, 'Clear liquid', 'Ragi Feed', 8, 'Staff', NULL, 'Ragi-based light feed for easy digestion.', 8, 16, 14, TRUE);

-- ACITROM (Blood Thinner Diet)
INSERT INTO public.menu_item (id, category, name, price, role, picture, description, staff_price, patient_price, dietitian_price, is_available)
VALUES
(11, 'Clear liquid', 'Milk', 6, 'Staff', NULL, 'Plain milk suitable for blood-thinner patients.', 6, 12, 10, TRUE),
(12, 'Clear liquid', 'Rice Feed', 8, 'Staff', NULL, 'Soft rice feed for easy digestion.', 8, 16, 14, TRUE),
(13, 'Clear liquid', 'Oats Feed', 10, 'Staff', NULL, 'Oats-based feed suitable for ACITROM patients.', 10, 20, 17, TRUE),
(14, 'Clear liquid', 'Multigrain Feed', 12, 'Staff', NULL, 'Healthy multigrain feed.', 12, 24, 20, TRUE),
(15, 'Clear liquid', 'Rava Feed', 9, 'Staff', NULL, 'Rava-based light feed for easy digestion.', 9, 18, 15, TRUE);

-- CKD (Chronic Kidney Disease)
INSERT INTO public.menu_item (id, category, name, price, role, picture, description, staff_price, patient_price, dietitian_price, is_available)
VALUES
(16, 'Clear liquid', 'D.Milk/Sago Feed', 7, 'Staff', NULL, 'Diluted milk or sago feed for CKD patients.', 7, 14, 12, TRUE),
(17, 'Clear liquid', 'Rice Feed', 8, 'Staff', NULL, 'Rice feed with low sodium for CKD.', 8, 16, 14, TRUE),
(18, 'Clear liquid', 'Orange Juice/Dhall Water', 10, 'Staff', NULL, 'Light juice or dhall water for CKD.', 10, 20, 17, TRUE),
(19, 'Clear liquid', 'Rava Feed', 9, 'Staff', NULL, 'Rava feed for light digestion.', 9, 18, 15, TRUE),
(20, 'Clear liquid', 'Barley Feed', 10, 'Staff', NULL, 'Cooling barley feed for CKD patients.', 10, 20, 17, TRUE);

-- CKD WITH DM (Chronic Kidney Disease with Diabetes)
INSERT INTO public.menu_item (id, category, name, price, role, picture, description, staff_price, patient_price, dietitian_price, is_available)
VALUES
(21, 'Clear liquid', 'Barley Feed', 10, 'Staff', NULL, 'Barley feed for CKD with diabetes.', 10, 20, 17, TRUE),
(22, 'Clear liquid', 'Sago Feed', 8, 'Staff', NULL, 'Sago-based feed for easy digestion.', 8, 16, 14, TRUE),
(23, 'Clear liquid', 'Orange Juice/Dhall Water', 10, 'Staff', NULL, 'Dhall water suitable for CKD with DM.', 10, 20, 17, TRUE),
(24, 'Clear liquid', 'Rava Feed', 9, 'Staff', NULL, 'Rava-based feed for CKD with DM.', 9, 18, 15, TRUE),
(25, 'Clear liquid', 'Barley Feed', 10, 'Staff', NULL, 'Cooling barley feed for CKD with diabetes.', 10, 20, 17, TRUE);
