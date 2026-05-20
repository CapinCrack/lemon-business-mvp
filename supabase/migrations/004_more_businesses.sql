-- Update Claudie with photos
UPDATE businesses SET
  photo_urls = ARRAY[
    'https://images.squarespace-cdn.com/content/v1/653820f067951356ec09c800/c5957fd3-5b19-41ea-8cc2-bb74b1a9cdc0/claudie-restaurant-entrance.jpeg?format=1500w',
    'https://images.squarespace-cdn.com/content/v1/653820f067951356ec09c800/72bc3046-ee58-4327-b45b-e161ce6201f8/claudie-restaurant-booths.jpg?format=1500w',
    'https://images.squarespace-cdn.com/content/v1/653820f067951356ec09c800/54f4d489-843b-498f-92ea-bd5cf5ac7b5c/claudie-restaurant-interior.jpg?format=1500w'
  ]::TEXT[]
WHERE name = 'Claudie' AND category = 'Food & Drinks';

-- Update Anatomy with improved details
UPDATE businesses SET
  subcategory   = 'Luxury Gym & Longevity Center',
  about_us      = 'Anatomy is Miami''s premier luxury fitness destination, seamlessly blending a high-performance training floor with elite wellness, recovery, and medical longevity infrastructure. Designed around the philosophy of helping members sweat, enhance, and recover, the facility pairs state-of-the-art strength and conditioning equipment with an extensive sanctuary dedicated to systemic recovery.',
  good_to_know  = ARRAY['World-class recovery suite', 'Hot & cold plunges', 'Infrared & cold saunas', 'Eucalyptus steam room', 'Vitamin IV therapy on-site', 'Physical therapy & chiropractic care']::TEXT[]
WHERE name = 'Anatomy' AND category = 'Fitness & Wellness';

-- Update Febal Casa Miami with improved details
UPDATE businesses SET
  neighborhood  = 'Upper East Side (Biscayne Corridor)',
  about_us      = 'Febal Casa Miami serves as a comprehensive design and remodeling partner for homeowners looking to elevate their living spaces using high-end, contemporary Italian aesthetics. Their capabilities span major kitchen transformations, luxury bathroom structural remodels, premium custom walk-in wardrobes, and total spatial interior planning for modern Miami condos and waterfront single-family estates.',
  good_to_know  = ARRAY['Custom modular carpentry specialists', 'Full remodel lifecycle management', 'In-house installation team', 'Layout design to white-glove install']::TEXT[]
WHERE name = 'Febal Casa Miami' AND category = 'Home Improvement';

-- Update ON 2 NOW with improved details
UPDATE businesses SET
  subcategory   = 'Personal Concierge & Lifestyle Management Errand Service',
  neighborhood  = 'Downtown Miami / Brickell',
  address       = 'Miami, FL (Mobile dispatch across greater Miami metro)',
  about_us      = 'ON 2 NOW is a professional 24/7 personal assistant and corporate errand service designed to buy back time for busy professionals, executives, and families. They manage a massive array of daily logistical needs—including routine grocery shopping runs, courier pick-ups, vehicle registration processing, document drop-offs, and standing in line for home repair/utility appointments on behalf of the client.',
  good_to_know  = ARRAY['Electric vehicle deliveries', 'Wait services available', 'Emergency dispatch', 'Absolute discretion guaranteed']::TEXT[]
WHERE name = 'ON 2 NOW' AND category = 'Time Savers';

-- Update Equipaws Pet Services with improved details
UPDATE businesses SET
  subcategory   = 'Professional Dog Walking & In-Home Pet Sitting',
  neighborhood  = 'South Miami / Coral Gables / Brickell',
  address       = 'Inquire for Address, Miami, FL 33143',
  price_range   = 'Mid-Range',
  hours         = '{"Mon":"Office 9am–6pm, Field 7am–10pm","Tue":"Office 9am–6pm, Field 7am–10pm","Wed":"Office 9am–6pm, Field 7am–10pm","Thu":"Office 9am–6pm, Field 7am–10pm","Fri":"Office 9am–6pm, Field 7am–10pm","Sat":"Office 9am–3pm, Field 7am–10pm","Sun":"Field 7am–10pm"}',
  about_us      = 'Equipaws Pet Services delivers highly reliable, personalized, and structured pet care across Miami''s core neighborhoods. Founded to ensure rigorous safety and companionship standards, their mobile team provides regular dog walking, comprehensive vacation cat sitting, overnight home stays, and medical care for a wide array of domestic pets, including exotic birds, small mammals, and reptiles.',
  good_to_know  = ARRAY['All sitters background-checked & bonded', 'Pet CPR & First Aid certified', 'GPS-tracked client app', 'Post-visit photos & route maps']::TEXT[]
WHERE name = 'Equipaws Pet Services' AND category = 'Pets';

-- Update The Sacred Space Miami with improved details
UPDATE businesses SET
  subcategory   = 'Luxury Private Event Venue & Cultural Sanctuary',
  neighborhood  = 'Wynwood / Edgewater',
  hours         = '{"Mon":"9am–5pm","Tue":"9am–5pm","Wed":"9am–5pm","Thu":"9am–5pm","Fri":"9am–5pm","Sat":"9am–5pm","Sun":"9am–5pm"}',
  about_us      = 'The Sacred Space Miami is a spectacular, architecturally striking commercial event venue designed to serve as a blank canvas for high-end corporate conferences, brand activations, private weddings, art galas, and global wellness summits. Spanning a modern 36,000-square-foot campus, it seamlessly marries high-ceiling indoor gallery architecture with lush, meticulously landscaped tropical outdoor gardens.',
  good_to_know  = ARRAY['Modular indoor & outdoor spaces', 'Guava Grove botanical courtyard', 'Up to 950 guests', 'High-spec architectural lighting', 'Plant-based culinary focus', 'External caterers welcome']::TEXT[]
WHERE name = 'The Sacred Space Miami' AND category = 'Events';

-- Update The Barn Miami with improved details
UPDATE businesses SET
  about_us      = 'The Barn Miami is an elite, boutique collector car dealership and online vehicle lounge focusing on the discovery, evaluation, consignment, and distribution of unique automotive history. Operated by a highly knowledgeable father-son duo, the showroom bypasses high-volume commercial tactics to act as a pure automotive concierge, preserving car culture through global e-commerce and a highly select physical gallery.',
  good_to_know  = ARRAY['Climate-controlled showroom', 'Numbers-matching vintage inventory', 'Air-cooled Porsche 911s', 'Ferrari Dinos & European roadsters', 'Appointment only']::TEXT[]
WHERE name = 'The Barn Miami' AND category = 'Auto';

-- Update Thriller Miami Speedboat Adventures with improved details
UPDATE businesses SET
  subcategory   = 'Offshore Sightseeing Speedboat Tour',
  address       = '401 Biscayne Blvd, Miami, FL 33132',
  price_range   = 'Mid-Range',
  hours         = '{"Mon":"10am–Sunset (hourly departures)","Tue":"10am–Sunset (hourly departures)","Wed":"10am–Sunset (hourly departures)","Thu":"10am–Sunset (hourly departures)","Fri":"10am–Sunset (hourly departures)","Sat":"10am–Sunset (every 30 min)","Sun":"10am–Sunset (every 30 min)"}',
  about_us      = 'Thriller Miami Speedboat Adventures provides an intense, high-speed, open-ocean sightseeing experience packed into a 45-minute marine tour. Utilizing massive 55-foot commercial power catamarans, the route launches passengers from the marina straight into Biscayne Bay, flying past PortMiami, the mega-mansions of Star Island and Fisher Island, and accelerating out into the open Atlantic waves parallel to South Beach.',
  good_to_know  = ARRAY['Live narrated tour', 'Speeds up to 40 mph', 'Expect ocean spray & wind', 'Restrictions for pregnant guests & spinal injuries', 'Walk-up tickets available at Bayside']::TEXT[]
WHERE name = 'Thriller Miami Speedboat Adventures' AND category = 'Activities & Experiences';

-- Add more real Miami businesses
INSERT INTO businesses (name, category, subcategory, neighborhood, address, phone_number, price_range, hours, about_us, good_to_know, booking_option, photo_urls, is_verified)
VALUES

-- Food & Drinks
(
  'Panther Coffee',
  'Food & Drinks',
  'Specialty Coffee Roaster & Cafe',
  'Wynwood',
  '2390 NW 2nd Ave, Miami, FL 33127',
  '+1 305-677-3952',
  'Affordable',
  '{"Mon":"7am–9pm","Tue":"7am–9pm","Wed":"7am–9pm","Thu":"7am–9pm","Fri":"7am–11pm","Sat":"7am–11pm","Sun":"7am–9pm"}',
  'Panther Coffee is a Miami-born specialty coffee company, roaster, wholesaler, and retailer. They specialize in the small-batch roasting of elite, single-origin coffee beans sourced directly from small farm holders globally. The Wynwood location acts as a vibrant community hub, boasting an open-air patio under a giant banyan tree where locals and travelers connect over meticulous coffee preparation.',
  ARRAY['Roasts beans on-site', 'Plant-based milk alternatives', 'Outdoor seating', 'Vegan options']::TEXT[],
  'External',
  ARRAY[]::TEXT[],
  false
),

-- Food & Drinks
(
  'Vice City Bean',
  'Food & Drinks',
  'Specialty Coffeehouse & Cafe',
  'Wynwood / Arts & Entertainment District',
  '1657 N Miami Ave, Miami, FL 33136',
  NULL,
  'Affordable',
  '{"Mon":"7am–4pm","Tue":"7am–4pm","Wed":"7am–4pm","Thu":"7am–4pm","Fri":"7am–4pm","Sat":"7am–4pm","Sun":"7am–4pm"}',
  'Vice City Bean is a bright, industrial-chic specialty coffee shop serving Miami''s creative class. Committed to the art of coffee, they feature meticulously sourced beans from top-tier third-wave roasters, pulling precision espresso shots and pouring complex single-origin filter coffees. It serves as an essential daily neighborhood fuel station and community meeting point.',
  ARRAY['Oat milk latte specialists', 'Locally baked pastries', 'Vegan & gluten-free options', 'Mobile order-ahead available', 'Concrete espresso bar']::TEXT[],
  'External',
  ARRAY[]::TEXT[],
  false
),

-- Beauty
(
  'Vanity Projects Miami',
  'Beauty',
  'Luxury Atelier & High-Concept Nail Salon',
  'Little River / Design District',
  '7338 NW Miami Ct, Miami, FL 33150',
  '+1 786-292-3442',
  'Premium',
  '{"Mon":"10am–7pm","Tue":"10am–7pm","Wed":"10am–7pm","Thu":"10am–7pm","Fri":"10am–7pm","Sat":"10am–7pm","Sun":"10am–7pm"}',
  'Vanity Projects bridges the gap between a high-end contemporary art gallery and a luxury nail salon. Specializing in incredibly intricate, hand-painted cosmetic nail art, the atelier curates its staff from elite international manicurists. The studio redefines nail care by treating individual appointments as a premium, wearable art canvas.',
  ARRAY['International artist residency program', 'Hand-painted gel nail art', 'In-studio video art curation', 'Artists from Tokyo, London & NYC']::TEXT[],
  'External',
  ARRAY[]::TEXT[],
  false
),

-- Beauty
(
  'Junior & Hatter',
  'Beauty',
  'Artisanal Hair Salon & Barber Shop',
  'Wynwood',
  '2750 NW 3rd Ave #23, Miami, FL 33127',
  '+1 305-571-8177',
  'Mid-Range',
  '{"Mon":"Closed","Tue":"10am–8pm","Wed":"10am–8pm","Thu":"10am–8pm","Fri":"10am–8pm","Sat":"9am–6pm","Sun":"Closed"}',
  'Junior & Hatter is an independent, high-concept hair studio that completely rejects the clinical, sterile atmosphere of traditional beauty salons. Set inside a sprawling, vintage-industrial layout in the heart of the arts district, they focus on creative self-expression through hair design, offering precision men''s barbering, advanced custom women''s coloring, and bespoke styling in an artistic, retro living room environment.',
  ARRAY['Free-hand balayage specialists', 'Antique arcade games in-store', 'Retro industrial decor']::TEXT[],
  'External',
  ARRAY[]::TEXT[],
  false
),

-- Home Improvement
(
  'Shell Lumber & Hardware',
  'Home Improvement',
  'Historic Hardware Store & Lumber Yard',
  'Coconut Grove',
  '2733 SW 27th Ave, Miami, FL 33133',
  '+1 305-856-6401',
  'Affordable',
  '{"Mon":"7am–6pm","Tue":"7am–6pm","Wed":"7am–6pm","Thu":"7am–6pm","Fri":"7am–6pm","Sat":"7am–5pm","Sun":"Closed"}',
  'Serving South Florida since 1928, Shell Lumber & Hardware is an iconic, sprawling home improvement complex catering to local homeowners, interior contractors, and master builders. Far beyond a standard retail chain box store, it provides full-service hardware, premium building materials, custom millwork processing, and deep expert knowledge to support everything from simple home repairs to major real estate renovations.',
  ARRAY['One of the largest exotic hardwood inventories in the US', 'Dedicated Doors & Windows showroom', 'Hurricane-impact retrofitting', 'Custom millwork processing', 'Serving South Florida since 1928']::TEXT[],
  'External',
  ARRAY[]::TEXT[],
  false
),

-- Time Savers
(
  'Sudsies Dry Cleaners & Laundry',
  'Time Savers',
  'Eco-Friendly Concierge Dry Cleaning & Mobile Laundry',
  'Brickell / Downtown',
  '1200 Brickell Ave, Miami, FL 33131',
  '+1 305-757-7837',
  'Mid-Range',
  '{"Mon":"Boutique 7:30am–6:30pm, Valet 7am–7pm","Tue":"Boutique 7:30am–6:30pm, Valet 7am–7pm","Wed":"Boutique 7:30am–6:30pm, Valet 7am–7pm","Thu":"Boutique 7:30am–6:30pm, Valet 7am–7pm","Fri":"Boutique 7:30am–6:30pm, Valet 7am–7pm","Sat":"Boutique 8:30am–4pm, Valet 7am–7pm","Sun":"Closed"}',
  'Sudsies is an upscale, tech-forward laundry operation built around total customer convenience. They take the friction out of clothing care by providing a full suite of services, including luxury garment dry cleaning, everyday wash-and-fold, expert alterations, and designer leather restoration. They specialize in high-touch handling, returning clothes crisp and retail-ready without forcing customers to step foot outside their homes.',
  ARRAY['Free mobile pickup & delivery', 'Alert-tracked valet vans', 'Eco-friendly non-toxic solvents', 'Designer leather restoration', 'Schedule via app or web portal']::TEXT[],
  'External',
  ARRAY[]::TEXT[],
  false
),

-- Pets
(
  'D.O.G. Hotels',
  'Pets',
  'Luxury Pet Resort, Daycare & Grooming Salon',
  'Wynwood / Midtown',
  '2829 NW 5th Ave, Miami, FL 33127',
  '+1 786-360-4663',
  'Mid-Range',
  '{"Mon":"7am–7pm","Tue":"7am–7pm","Wed":"7am–7pm","Thu":"7am–7pm","Fri":"7am–7pm","Sat":"9am–5pm","Sun":"10am–4pm"}',
  'D.O.G. Hotels provides an ultra-modern, clean, and climate-controlled environment tailored to the urban pet lifestyle. Offering a fully transparent daycare and luxury overnight boarding setup, they ensure city dogs get plenty of socialization, exercise, and mental stimulation while their owners are hard at work or traveling. Their full-service spa handles precision styling and therapeutic treatments.',
  ARRAY['Live HD webcam access for owners', 'Indoor & outdoor play parks', 'Antimicrobial K9 grass', 'Luxury overnight boarding suites', 'Therapeutic grooming treatments']::TEXT[],
  'External',
  ARRAY[]::TEXT[],
  false
),

-- Events
(
  'MAPS Backlot',
  'Events',
  'Industrial Outdoor Photo Studio & Event Space',
  'Wynwood',
  '342 NW 24th St, Miami, FL 33127',
  '+1 305-532-7880',
  'Premium',
  '{"Mon":"8am–12am","Tue":"8am–12am","Wed":"8am–12am","Thu":"8am–12am","Fri":"8am–12am","Sat":"8am–12am","Sun":"8am–12am"}',
  'MAPS Backlot is a highly unique, dynamic outdoor photo studio and massive corporate event venue nestled in the center of the graffiti-laden arts district. A preferred destination for high-fashion magazine shoots, music videos, luxury car launches, and elite private weddings, the expansive space features industrial architectural textures, smooth concrete floors, and absolute privacy right in the urban core.',
  ARRAY['Drive-in cyclorama (cyc) wall', 'Automotive & fashion photography ready', 'Production dressing rooms', 'Catering prep kitchen on-site', 'Concert-level power grid']::TEXT[],
  'External',
  ARRAY[]::TEXT[],
  false
),

-- Auto
(
  'First Class Rent a Car',
  'Auto',
  'Luxury & Exotic Car Rental Agency',
  'Brickell / Downtown',
  '1060 Brickell Ave, Miami, FL 33131',
  '+1 305-985-4512',
  'Premium',
  '{"Mon":"9am–8pm","Tue":"9am–8pm","Wed":"9am–8pm","Thu":"9am–8pm","Fri":"9am–8pm","Sat":"9am–8pm","Sun":"9am–8pm"}',
  'First Class Rent a Car caters to international executives, entertainment figures, and vacationers looking to match Miami''s high-octane aesthetic. Maintaining a pristine fleet of elite vehicles, the agency provides top-tier customer service, instant delivery to private airports or luxury hotels, and transparent transactions bypassing standard airport rental desk headaches.',
  ARRAY['Lamborghini, Rolls-Royce & Porsche fleet', 'Hotel & airport delivery', 'After-hours reservations available', 'Chauffeured executive transport', 'No airport desk hassle']::TEXT[],
  'External',
  ARRAY[]::TEXT[],
  false
),

-- Fitness & Wellness
(
  'Sol Seek Yoga',
  'Fitness & Wellness',
  'Community Yoga & Holistic Wellness Studio',
  'Wynwood',
  '2330 NE 2nd Ave, Miami, FL 33137',
  '+1 786-536-7492',
  'Affordable',
  '{"Mon":"6:30am–8:30pm","Tue":"6:30am–8:30pm","Wed":"6:30am–8:30pm","Thu":"6:30am–8:30pm","Fri":"6:30am–7pm","Sat":"8:30am–2pm","Sun":"8:30am–2pm"}',
  'Sol Seek Yoga is an inclusive, community-first studio offering diverse daily classes focused on mental clarity and physical durability. From dynamic Vinyasa flows and deep restorative Yin to guided meditation and somatic breathwork, the sanctuary welcomes everyone from beginners to seasoned practitioners trying to find balance inside Miami''s fast-moving pace.',
  ARRAY['Candlelight yin yoga sessions', 'Live crystal sound bowl healing', 'Work-Exchange community program', 'Teacher training available', 'Beginner friendly']::TEXT[],
  'External',
  ARRAY[]::TEXT[],
  false
),

-- Other
(
  'Sweat Records',
  'Other',
  'Independent Record Store & Cultural Event Space',
  'Little Haiti',
  '5505 NE 2nd Ave, Miami, FL 33137',
  '+1 786-693-9309',
  'Affordable',
  '{"Mon":"12pm–5pm","Tue":"12pm–5pm","Wed":"12pm–7pm","Thu":"12pm–7pm","Fri":"12pm–7pm","Sat":"12pm–7pm","Sun":"12pm–5pm"}',
  'Opened in 2005, Sweat Records is a local institution, operating as Miami''s premier independent brick-and-mortar record shop. Serving local audiophiles and international music tourists, they carry a massive, meticulously sorted inventory of new, used, and reissued vinyl records spanning across obscure indie rock, hip-hop, salsa, electronic, and global sounds. It functions as a crucial counter-culture anchor.',
  ARRAY['Live in-store events & record release parties', 'All-ages comedy nights & community meetups', 'Local artwork & indie zines', 'Online e-commerce shop', 'Free walk-in events']::TEXT[],
  'External',
  ARRAY[]::TEXT[],
  false
),

-- Other
(
  'The LAB Miami',
  'Other',
  'Coworking Campus & Creative Innovation Hub',
  'Wynwood',
  '400 NW 26th St, Miami, FL 33127',
  '+1 305-507-3660',
  'Affordable',
  '{"Mon":"9am–5pm (members 24/7)","Tue":"9am–5pm (members 24/7)","Wed":"9am–5pm (members 24/7)","Thu":"9am–5pm (members 24/7)","Fri":"9am–5pm (members 24/7)","Sat":"Closed","Sun":"Closed"}',
  'Converted from a historic 10,000-square-foot industrial warehouse, The LAB Miami is an original entrepreneurial campus built to serve startups, remote full-stack developers, independent creators, and digital nomads. It blends industrial architecture with modern tech workspace infrastructure, providing open hot-desks, private meeting rooms, and tech events to anchor the local digital ecosystem.',
  ARRAY['Hackathon & founder event host', 'Indoor bike storage', 'Outdoor communal tables', 'Attached cafe on-site', '24/7 keycard access for members']::TEXT[],
  'External',
  ARRAY[]::TEXT[],
  false
);
