
CREATE DATABASE pet_adoption;

USE pet_adoption;

SELECT DATABASE();

SELECT id, name, email, role, phone, address
FROM USERS;

UPDATE USERS
SET role = 'ADMIN'
WHERE email = 'atharva@gmail.com';

DESCRIBE pet;

INSERT INTO pet
(adoption_fee, age, breed, description, gender, image_url, location, name, status, type)
VALUES
(5000, 2, 'Labrador Retriever',
 'Friendly and energetic Labrador who loves playing and going for walks.',
 'Male',
 'https://images.unsplash.com/photo-1552053831-71594a27632d',
 'Pune',
 'Bruno',
 'AVAILABLE',
 'Dog'),

(4500, 3, 'Golden Retriever',
 'Gentle and loving Golden Retriever who is perfect for a family.',
 'Female',
 'https://images.unsplash.com/photo-1558788353-f76d92427f16',
 'Mumbai',
 'Bella',
 'AVAILABLE',
 'Dog'),

(6000, 4, 'German Shepherd',
 'Loyal and intelligent German Shepherd looking for a caring home.',
 'Male',
 'https://images.unsplash.com/photo-1568572933382-74d440642117',
 'Pune',
 'Rocky',
 'AVAILABLE',
 'Dog'),

(4000, 1, 'Beagle',
 'Playful young Beagle with a cheerful and friendly personality.',
 'Female',
 'https://images.unsplash.com/photo-1507146426996-ef05306b995a',
 'Nashik',
 'Daisy',
 'AVAILABLE',
 'Dog'),

(3500, 2, 'Indie',
 'Smart and affectionate Indian dog who loves people and outdoor activities.',
 'Male',
 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee',
 'Pune',
 'Sheru',
 'AVAILABLE',
 'Dog');

 INSERT INTO pet
(adoption_fee, age, breed, description, gender, image_url, location, name, status, type)
VALUES
(3000, 2, 'Persian',
 'Calm and affectionate Persian cat who enjoys attention and cuddles.',
 'Female',
 'https://images.unsplash.com/photo-1574158622682-e40e69881006',
 'Pune',
 'Luna',
 'AVAILABLE',
 'Cat'),

(3500, 3, 'British Shorthair',
 'Friendly and relaxed cat who loves being around people.',
 'Male',
 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
 'Mumbai',
 'Oliver',
 'AVAILABLE',
 'Cat'),

(4000, 4, 'Maine Coon',
 'Gentle and playful Maine Coon with a loving personality.',
 'Male',
 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce',
 'Pune',
 'Milo',
 'AVAILABLE',
 'Cat'),

(3000, 1, 'Siamese',
 'Active and playful Siamese cat looking for a loving family.',
 'Female',
 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4',
 'Nashik',
 'Coco',
 'AVAILABLE',
 'Cat'),

(2500, 2, 'Indian Shorthair',
 'Sweet and friendly cat who enjoys playing and relaxing indoors.',
 'Female',
 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d',
 'Pune',
 'Misty',
 'AVAILABLE',
 'Cat');

 INSERT INTO pet
(adoption_fee, age, breed, description, gender, image_url, location, name, status, type)
VALUES
(2500, 3, 'Macaw',
 'Colorful and intelligent bird that enjoys interaction with people.',
 'Male',
 'https://images.unsplash.com/photo-1552728089-57bdde30beb3',
 'Pune',
 'Rio',
 'AVAILABLE',
 'Bird'),

(1800, 2, 'Cockatiel',
 'Cheerful and friendly cockatiel with a playful personality.',
 'Female',
 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890',
 'Mumbai',
 'Sunny',
 'AVAILABLE',
 'Bird'),

(1200, 1, 'Budgerigar',
 'Small and active budgie with beautiful colors.',
 'Male',
 'https://images.unsplash.com/photo-1444464666168-49d633b86797',
 'Pune',
 'Kiwi',
 'AVAILABLE',
 'Bird'),

(2000, 2, 'Lovebird',
 'Sweet and social lovebird looking for a caring home.',
 'Female',
 'https://images.unsplash.com/photo-1555169062-013468b47731',
 'Nashik',
 'Mango',
 'AVAILABLE',
 'Bird'),

(1500, 2, 'Parakeet',
 'Active and colorful parakeet that enjoys singing and playing.',
 'Male',
 'https://images.unsplash.com/photo-1522926193341-e9ffd686c60f',
 'Pune',
 'Chirpy',
 'AVAILABLE',
 'Bird');

 INSERT INTO pet
(adoption_fee, age, breed, description, gender, image_url, location, name, status, type)
VALUES
(2000, 2, 'Holland Lop',
 'Cute and gentle rabbit who enjoys a calm and comfortable environment.',
 'Female',
 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308',
 'Pune',
 'Snowy',
 'AVAILABLE',
 'Rabbit'),

(2200, 1, 'Mini Rex',
 'Friendly and playful rabbit with soft fur.',
 'Male',
 'https://images.unsplash.com/photo-1535241749838-299277b6305f',
 'Mumbai',
 'Oreo',
 'AVAILABLE',
 'Rabbit'),

(1800, 2, 'Netherland Dwarf',
 'Small and adorable rabbit with a playful personality.',
 'Female',
 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308',
 'Pune',
 'Bunny',
 'AVAILABLE',
 'Rabbit'),

(2500, 3, 'Lionhead',
 'Gentle rabbit that loves attention and fresh vegetables.',
 'Male',
 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1',
 'Nashik',
 'Fluffy',
 'AVAILABLE',
 'Rabbit'),

(2000, 1, 'Flemish Giant',
 'Calm and friendly rabbit looking for a loving family.',
 'Female',
 'https://images.unsplash.com/photo-1591382386627-349b692688ff',
 'Pune',
 'Snowball',
 'AVAILABLE',
 'Rabbit');

INSERT INTO vets
(name, specialization, experience, clinic_name, location, fee, phone, email, available_days, available_time)
VALUES
(
'Dr. Amit Sharma',
'Veterinary Medicine',
8,
'Happy Paws Veterinary Clinic',
'Pune',
500,
'9876543210',
'amit@happypaws.com',
'Monday - Saturday',
'10:00 AM - 2:00 PM'
);

INSERT INTO vets
(name, specialization, experience, clinic_name, location, fee, phone, email, available_days, available_time)
VALUES
(
'Dr. Priya Patil',
'Pet Surgery & General Care',
10,
'PetCare Animal Hospital',
'Mumbai',
700,
'9876543211',
'priya@petcare.com',
'Monday - Friday',
'11:00 AM - 4:00 PM'
);

INSERT INTO vets
(name, specialization, experience, clinic_name, location, fee, phone, email, available_days, available_time)
VALUES
(
'Dr. Rahul Deshmukh',
'Animal Dermatology',
6,
'Healthy Tails Clinic',
'Nashik',
600,
'9876543212',
'rahul@healthytails.com',
'Tuesday - Sunday',
'9:00 AM - 1:00 PM'
);

INSERT INTO vets
(name, specialization, experience, clinic_name, location, fee, phone, email, available_days, available_time)
VALUES
(
'Dr. Sneha Kulkarni',
'Bird & Exotic Animal Specialist',
7,
'Feather & Fur Veterinary Center',
'Pune',
550,
'9876543213',
'sneha@featherfur.com',
'Monday - Saturday',
'2:00 PM - 6:00 PM'
);

SELECT * FROM vets;

SELECT * FROM vet_bookings;

DELETE FROM vets
WHERE id = 7;

ALTER TABLE vet_bookings
ADD COLUMN vet_name VARCHAR(255);

UPDATE vet_bookings vb
JOIN vets v
ON vb.vet_id = v.id
SET vb.vet_name = v.name;

SELECT
    id,
    user_id,
    vet_id,
    vet_name,
    pet_name,
    reason,
    status
FROM vet_bookings;

ALTER TABLE vet_bookings
DROP COLUMN vet_id;

SHOW CREATE TABLE vet_bookings;

ALTER TABLE vet_bookings
DROP FOREIGN KEY `FKlgo0or0jemoq0kk4hp23q9oth`;

UPDATE vet_bookings vb
JOIN vets v
ON vb.vet_id = v.id
SET vb.vet_name = v.name;

SELECT id, vet_name, pet_name, status
FROM vet_bookings;

DESCRIBE vet_bookings;

DESCRIBE notifications;

ALTER TABLE vet_bookings
ADD COLUMN vet_id BIGINT NULL AFTER user_id;