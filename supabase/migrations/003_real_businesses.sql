-- Remove old placeholder seed data
DELETE FROM claim_requests
WHERE business_id IN (
  SELECT id FROM businesses
  WHERE name IN (
    'Biscayne Bay Boat Tours','South Beach Auto Care','South Beach Sol Tanning',
    'Wynwood Social Events','Brickell Gym Collective','Versailles Restaurant',
    'Magic City Plumbing','Brickell Pet Spa','Miami Express Dry Cleaning'
  )
);

DELETE FROM businesses
WHERE name IN (
  'Biscayne Bay Boat Tours','South Beach Auto Care','South Beach Sol Tanning',
  'Wynwood Social Events','Brickell Gym Collective','Versailles Restaurant',
  'Magic City Plumbing','Brickell Pet Spa','Miami Express Dry Cleaning'
);

-- Insert real Miami businesses (one per category)
INSERT INTO businesses (name, category, subcategory, neighborhood, address, phone_number, price_range, hours, about_us, good_to_know, booking_option, photo_urls, is_verified)
VALUES

-- 1. Food & Drinks
(
  'Claudie',
  'Food & Drinks',
  'French Restaurant',
  'Brickell',
  '1101 Brickell Ave S-113, Miami, FL 33131',
  '+1 305-990-1101',
  'Premium',
  '{"Mon":"12pm–3pm, 6pm–1am","Tue":"12pm–3pm, 6pm–1am","Wed":"12pm–3pm, 6pm–1am","Thu":"12pm–3pm, 6pm–1am","Fri":"12pm–3pm, 5:30pm–2am","Sat":"5:30pm–2am","Sun":"6pm–1am"}',
  'Welcome to CLAUDIE restaurant, where the spirit of "Carpe Diem" comes alive. Nestled in the heart of Miami, CLAUDIE is more than just a restaurant—it is an homage to the timeless elegance and enchanting magic of the South of France. Inspired by "la cuisine du soleil," a culinary art form pioneered by the legendary Roger Vergé, our menu brings together the vibrant flavors of the Mediterranean with the spirit of the Côte d''Azur. At CLAUDIE, we honor the South of France''s rich history as a gathering place for artists like Paul Éluard, Jean Cocteau, and Pablo Picasso, who found inspiration in its unique light, artistic flair, and intoxicating blend of sun-kissed fig trees and ocean breezes—all captured in our signature scent. Our mantra, "Carpe Diem," captures this timeless essence—an invitation to savor life with exuberance, elegance, and freedom.',
  ARRAY[]::TEXT[],
  'External',
  ARRAY[]::TEXT[],
  false
),

-- 2. Beauty
(
  'MindyKim Skincare',
  'Beauty',
  'Skin Care Clinic',
  'Edgewater',
  '3301 NE 1st Ave STE 112, Miami, FL 33137',
  '+1 786-449-0822',
  'Premium',
  '{"Mon":"10am–7pm","Tue":"10am–7pm","Wed":"10am–7pm","Thu":"10am–7pm","Fri":"10am–7pm","Sat":"10am–5pm","Sun":"10am–5pm"}',
  'Mindy''s recognized among her diverse clientele as a remarkable and personable beauty-care professional who brings her treatments, skills and skin-care guidance to the next level. You''ll find her unique approach reliable, experienced and consistent in always delivering the freshest and most appealing results. Mindy has worked as an esthetician for over 10 years, leading an upscale spa in Miami''s Design District for 7 years. Originally from South Korea, widely known as a groundbreaking place in the skincare world, Mindy blends her South Korean technique and infuses it with the latest knowledge, fundamentals and treatments. Her specialities include treatments and applications for tackling anti-aging, signs of stress and lining throughout the face and acne-prone skin types. Mindy''s use of the latest, most up-to-date equipment and technologies combined with traditional practices distinguishes her skillful touch from the many years of working with all skin types.',
  ARRAY[]::TEXT[],
  'Call',
  ARRAY[]::TEXT[],
  false
),

-- 3. Fitness & Wellness
(
  'Anatomy',
  'Fitness & Wellness',
  'Luxury Gym / Fitness Center',
  'Coconut Grove',
  '3363 Pan American Drive, Miami, FL 33133',
  '+1 786-575-0913',
  'Premium',
  '{"Mon":"5am–10pm","Tue":"5am–10pm","Wed":"5am–10pm","Thu":"5am–10pm","Fri":"5am–10pm","Sat":"7am–7pm","Sun":"7am–7pm"}',
  'Anatomy is Miami''s premier luxury fitness destination, blending a high-performance training floor with elite wellness and recovery infrastructure. Designed to help members sweat, enhance, and recover, the facility pairs state-of-the-art strength and conditioning equipment with an extensive sanctuary dedicated to physical longevity. Features a dedicated recovery area including hot and cold plunges, an infrared sauna, a cold sauna, and a eucalyptus steam room. On-site complex services include Vitamin IV therapy and chiropractic care.',
  ARRAY[]::TEXT[],
  'External',
  ARRAY[]::TEXT[],
  false
),

-- 4. Home Improvement
(
  'Febal Casa Miami',
  'Home Improvement',
  'Italian Interior Design & Remodeling Showroom',
  'Upper East Side',
  '5700 Biscayne Blvd Unit 106, Miami, FL 33137',
  '+1 786-646-0912',
  'Premium',
  '{"Mon":"10am–6pm","Tue":"10am–6pm","Wed":"10am–6pm","Thu":"10am–6pm","Fri":"10am–6pm","Sat":"10am–3pm","Sun":"Closed"}',
  'Febal Casa Miami serves as a design-focused partner for homeowners seeking refined interiors grounded in premium Italian aesthetics. Their work spans full kitchen remodels, high-end bathroom renovations, custom walk-in closets, and comprehensive whole-home transformations for single-family estates and luxury Miami condos. They specialize in custom, sleek Italian modular cabinetry and wardrobe systems, coordinating everything from initial architectural layout planning and material selection to final physical execution and installation through an in-house team.',
  ARRAY[]::TEXT[],
  'External',
  ARRAY[]::TEXT[],
  false
),

-- 5. Time Savers
(
  'ON 2 NOW',
  'Time Savers',
  'Luxury Lifestyle Management & Personal Errand Service',
  'Brickell',
  NULL,
  '+1 786-589-3339',
  'Premium',
  '{"Mon":"Open 24 hours","Tue":"Open 24 hours","Wed":"Open 24 hours","Thu":"Open 24 hours","Fri":"Open 24 hours","Sat":"Open 24 hours","Sun":"Open 24 hours"}',
  'ON 2 NOW is a premier 24/7 luxury concierge and personal errand service designed to give clients back their time. They handle everything from daily lifestyle management essentials—such as grocery shopping, pharmacy runs, dry cleaning pick-ups, and parcel deliveries—to high-end needs like luxury gift sourcing, property oversight, and waiting on behalf of clients for home maintenance vendors or appointments. Operating with an eye on discretion and sustainability, they utilize electric vehicles for local deliveries whenever possible. Emergency and last-minute bookings available.',
  ARRAY['Same-day service']::TEXT[],
  'External',
  ARRAY[]::TEXT[],
  false
),

-- 6. Pets
(
  'Equipaws Pet Services',
  'Pets',
  'Professional Dog Walking & Pet Sitting',
  'South Miami',
  'Miami, FL 33143',
  '+1 305-794-3733',
  'Mid-Range',
  '{"Mon":"7am–10pm","Tue":"7am–10pm","Wed":"7am–10pm","Thu":"7am–10pm","Fri":"7am–10pm","Sat":"7am–10pm","Sun":"7am–10pm"}',
  'Equipaws Pet Services provides award-winning, reliable, and personalized pet care throughout Miami. Founded with a deep commitment to animal welfare, their team offers professional dog walking, customized home pet sitting, overnight stays, and specialized care for a wide range of animals including dogs, cats, small caged pets, reptiles, and birds. All employees are background-checked, fully insured, bonded, and certified in Pet CPR and First Aid. A GPS-tracked client portal delivers real-time check-in alerts, report cards, and photos after every visit. Office hours: Mon–Fri 9am–6pm, Sat 9am–3pm.',
  ARRAY['Same-day service','Card accepted']::TEXT[],
  'External',
  ARRAY[]::TEXT[],
  false
),

-- 7. Events
(
  'The Sacred Space Miami',
  'Events',
  'Premium Event Venue & Sanctuary',
  'Wynwood',
  '105 NE 24th St, Miami, FL 33137',
  '+1 786-621-5006',
  'Premium',
  '{"Mon":"9am–5pm","Tue":"9am–5pm","Wed":"9am–5pm","Thu":"9am–5pm","Fri":"9am–5pm","Sat":"9am–5pm","Sun":"9am–5pm"}',
  'The Sacred Space Miami is a spectacular public and private event venue designed as a sanctuary for personal, professional, and cultural gatherings. Spanning a beautifully designed 36,000-square-foot campus, it regularly hosts high-profile corporate conferences, galas, product launches, weddings, and conscious community wellness workshops. The modern indoor architecture seamlessly blends into a lush, tropical outdoor landscape featuring the outdoor "Guava Grove" garden courtyard. State-of-the-art audio/visual and lighting configurations throughout. Office hours 9am–5pm; event hosting hours extend late by booking.',
  ARRAY['Wheelchair accessible','Outdoor seating','Family friendly']::TEXT[],
  'External',
  ARRAY[]::TEXT[],
  false
),

-- 8. Auto
(
  'The Barn Miami',
  'Auto',
  'Boutique Classic, Antique & Exotic Car Dealership',
  'Doral',
  '7821 NW 52nd St, Doral, FL 33166',
  '+1 786-840-8088',
  'Premium',
  '{"Mon":"10am–3pm","Tue":"10am–3pm","Wed":"10am–3pm","Thu":"10am–3pm","Fri":"10am–3pm","Sat":"Closed","Sun":"Closed"}',
  'The Barn Miami is an upscale online auto boutique and physical showroom specializing in the sourcing, consignment, and sale of specialty vehicles ranging from rare antiques to modern exotics. Run by a passionate father-and-son team with decades of combined automotive industry experience, the dealership focuses on preserving the love for historic car culture through transparent, high-integrity dealings and a carefully curated inventory. Their rotating showroom collection frequently includes highly collectible marques such as the Ferrari Dino, classic Mercedes-Benz 300SL Roadsters, and air-cooled Porsche 911s. Showroom viewings strictly by appointment.',
  ARRAY['Appointment only']::TEXT[],
  'External',
  ARRAY[]::TEXT[],
  false
),

-- 9. Activities & Experiences
(
  'Thriller Miami Speedboat Adventures',
  'Activities & Experiences',
  'Sightseeing Speedboat Tour / Water Attraction',
  'Downtown Miami',
  '401 Biscayne Blvd, Miami, FL 33132',
  '+1 305-371-3278',
  'Mid-Range',
  '{"Mon":"10am–Sunset","Tue":"10am–Sunset","Wed":"10am–Sunset","Thu":"10am–Sunset","Fri":"10am–Sunset","Sat":"10am–Sunset","Sun":"10am–Sunset"}',
  'Thriller Miami Speedboat Adventures provides a high-speed, open-air sightseeing experience on the water in true "Miami Vice" style. Operating 55-foot power catamarans, the tour takes passengers on an adrenaline-pumping 45-minute ride through Biscayne Bay, PortMiami, and past the celebrity mansions of Star Island and Fisher Island, before heading out to the Atlantic Ocean along South Beach. Live tour guides narrate the history of Miami''s skyline throughout. Boats reach speeds up to 40 mph. Weekend tours depart every 30 minutes; weekday tours every hour.',
  ARRAY['Family friendly','Card accepted']::TEXT[],
  'External',
  ARRAY[]::TEXT[],
  false
),

-- 10. Other
(
  'The Shop at The Standard',
  'Other',
  'Eclectic Boutique & Luxury Gift Shop',
  'Belle Isle',
  '40 Island Ave, Miami Beach, FL 33139',
  '+1 305-704-3927',
  'Premium',
  '{"Mon":"10am–7pm","Tue":"10am–7pm","Wed":"10am–7pm","Thu":"10am–7pm","Fri":"10am–7pm","Sat":"9am–8pm","Sun":"9am–8pm"}',
  'Tucked away inside the iconic Standard Spa on Belle Isle, The Shop at The Standard offers a highly curated mix of surf, sun, lifestyle, and design-forward products. Moving away from standard hotel gift shops, it blends high-end resort wear, indie beauty elixirs, and premium bronzers with limited-edition art shop curiosities, custom Standard hotel brand collaborations, and essential travel sundries. Features premium independent brands like Tombolo, Vacation Inc., and local Miami designers. A sister spa boutique upstairs focuses exclusively on custom wellness oils, artisanal lotions, and holistic tonics.',
  ARRAY['Card accepted']::TEXT[],
  'External',
  ARRAY[]::TEXT[],
  false
);
