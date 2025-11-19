export const categories = [
    { name: 'Fruits', icon: 'AppleIcon' },
    { name: 'Vegetables', icon: 'VegetablesIcon' },
    { name: 'Groceries', icon: 'GroceriesIcon' },
    { name: 'Non-Veg', icon: 'MeatIcon' },
    { name: 'Household', icon: 'HouseholdIcon' },
    { name: 'Cosmetics', icon: 'CosmeticIcon' },
    { name: 'Live Plants', icon: 'PlantIcon' },
    { name: 'Kids Products', icon: 'BabyIcon' },
    { name: 'Appliances', icon: 'AppliancesIcon' },
];

export const products = [
  { id: 1, name: 'Organic Apples', category: 'Fruits', price: 120, originalPrice: 150, image: 'https://picsum.photos/id/1080/400/400', brand: 'FarmFresh', rating: 4.8, reviews: 150, tags: ['organic', 'bestseller'], description: 'Crisp, juicy, and 100% organic apples sourced from the finest orchards. Perfect for a healthy snack, salads, or baking.', stock: 50 },
  { id: 2, name: 'Fresh Tomatoes', category: 'Vegetables', price: 40, image: 'https://picsum.photos/id/1079/400/400', brand: 'Local Farms', rating: 4.5, reviews: 210, tags: ['desi', 'patna-special'], description: 'Ripe, red, and full of flavor. These locally sourced desi tomatoes are ideal for curries, salads, and sauces.', stock: 80 },
  { id: 3, name: 'Basmati Rice (1kg)', category: 'Groceries', price: 250, image: 'https://picsum.photos/id/292/400/400', brand: 'India Gate', rating: 4.9, reviews: 500, tags: ['bestseller'], description: 'Premium quality long-grain Basmati rice, known for its delightful aroma and fluffy texture. Perfect for biryani, pulao, or steamed rice.', stock: 120 },
  { id: 4, name: 'Chicken Curry Cut', category: 'Non-Veg', price: 180, image: 'https://picsum.photos/id/1077/400/400', brand: 'DG Farms', rating: 4.7, reviews: 95, tags: ['desi'], description: 'Fresh, tender chicken pieces, expertly cut for curries. Sourced from healthy, farm-raised poultry. Hygienically packed.', stock: 30 },
  { id: 5, name: 'Liquid Detergent', category: 'Household', price: 220, originalPrice: 250, brand: 'Surf Excel', rating: 4.6, reviews: 120, tags: [], description: 'Powerful liquid detergent that removes tough stains while being gentle on your clothes. Suitable for both top-load and front-load washing machines.', stock: 65 },
  { id: 6, name: 'Herbal Shampoo', category: 'Cosmetics', price: 350, image: 'https://picsum.photos/id/1075/400/400', brand: 'Patanjali', rating: 4.4, reviews: 80, tags: ['organic'], description: 'A natural, herbal shampoo enriched with amla, reetha, and shikakai. Strengthens hair from the roots and reduces hair fall.', stock: 40 },
  { id: 7, name: 'Money Plant', category: 'Live Plants', price: 299, image: 'https://picsum.photos/id/1068/400/400', brand: 'Nursery Direct', rating: 4.8, reviews: 60, tags: [], description: 'An easy-to-care-for indoor plant, believed to bring good luck and prosperity. Comes in a decorative pot, perfect for homes and offices.', stock: 25 },
  { id: 8, name: 'Baby Diapers (M)', category: 'Kids Products', price: 499, brand: 'Pampers', rating: 4.9, reviews: 300, tags: ['bestseller'], description: 'Soft, comfortable, and highly absorbent diapers to keep your baby dry and happy. Features a wetness indicator and a snug fit.', stock: 90 },
  { id: 9, name: 'Electric Kettle', category: 'Appliances', price: 1200, originalPrice: 1500, brand: 'Prestige', rating: 4.7, reviews: 110, tags: [], description: 'A 1.5-liter electric kettle with a stainless steel body, auto shut-off feature, and a concealed heating element for quick boiling.', stock: 15 },
  { id: 10, name: 'Desi Eggs (Dozen)', category: 'Non-Veg', price: 90, image: 'https://picsum.photos/id/431/400/400', brand: 'Local Farms', rating: 4.9, reviews: 250, tags: ['desi', 'patna-special'], description: 'Farm-fresh desi eggs, known for their superior taste and nutritional value. Sourced from free-range hens in local Patna farms.', stock: 150 },
  { id: 11, name: 'Mutton Curry Cut', category: 'Non-Veg', price: 750, image: 'https://picsum.photos/id/60/400/400', brand: 'DG Farms', rating: 4.8, reviews: 120, tags: ['desi'], description: 'Premium quality, tender mutton pieces, perfect for rich and flavorful curries. Processed and packed with the highest hygiene standards.', stock: 8 },
  { id: 12, name: 'Organic Spinach', category: 'Vegetables', price: 30, brand: 'FarmFresh', rating: 4.6, reviews: 90, tags: ['organic'], description: 'Fresh, tender, and nutrient-rich organic spinach (palak). Free from harmful pesticides, perfect for a healthy diet.', stock: 45 },
  { id: 13, name: 'Mango (Langda)', category: 'Fruits', price: 80, image: 'https://picsum.photos/id/1025/400/400', brand: 'Patna Orchards', rating: 5.0, reviews: 350, tags: ['patna-special', 'bestseller', 'desi'], description: 'Sweet, juicy, and aromatic Langda mangoes, a specialty of the region. Sourced directly from the famous orchards around Patna.', stock: 200 },
  { id: 14, name: 'Moisturizing Cream', category: 'Cosmetics', price: 275, brand: 'Nivea', rating: 4.5, reviews: 140, tags: [], description: 'A light, non-greasy moisturizing cream for all skin types. Provides long-lasting hydration, leaving your skin soft and supple.', stock: 70 },
  { id: 15, name: 'Tulsi Plant', category: 'Live Plants', price: 150, image: 'https://picsum.photos/id/145/400/400', brand: 'Nursery Direct', rating: 4.9, reviews: 100, tags: ['organic'], description: 'A sacred and medicinal Tulsi (Holy Basil) plant. Known for its health benefits and for purifying the air. Comes in a sturdy pot.', stock: 35 },
  { id: 16, name: 'Baby Food Cereal', category: 'Kids Products', price: 210, brand: 'Cerelac', rating: 4.7, reviews: 180, tags: [], description: 'Nutritious and easy-to-digest wheat-apple-cherry cereal for babies aged 6 months and above. Fortified with essential vitamins and minerals.', stock: 55 },
];

export const reviews = [
    { id: 1, productId: 13, author: 'Anjali S.', rating: 5, comment: 'The mangoes were absolutely divine! So fresh and sweet. DG_shop is my go-to for fruits in Patna. Highly recommended!', image: 'https://picsum.photos/id/211/200/200', verified: true, date: '2 days ago' },
    { id: 2, productId: 3, author: 'Rajesh K.', rating: 4, comment: 'Good quality rice and on-time delivery. The app is also very smooth.', verified: true, date: '1 week ago' },
    { id: 3, productId: 7, author: 'Priya M.', rating: 5, comment: 'I ordered a Money Plant and it arrived in perfect condition. Love the eco-friendly packaging!', image: 'https://picsum.photos/id/212/200/200', verified: true, date: '3 days ago' },
    { id: 4, productId: 10, author: 'Vikram P.', rating: 5, comment: 'Finally a reliable service for non-veg items. The Patna-special desi eggs are a must-try!', verified: true, date: '5 days ago' },
];

export const directors = [
    { name: 'Mr. Darshan Gupta', title: 'Founder & CEO', image: 'https://picsum.photos/id/219/400/400', bio: 'A visionary entrepreneur with deep roots in Patna, aiming to revolutionize the city\'s online grocery landscape.' },
    { name: 'Mrs. Gita Singh', title: 'Chief Operating Officer', image: 'https://picsum.photos/id/220/400/400', bio: 'An operations expert with 15+ years of experience in supply chain management, ensuring every order is perfect.' },
    { name: 'Mr. Alok Verma', title: 'Head of Technology', image: 'https://picsum.photos/id/221/400/400', bio: 'The tech wizard behind DG_shop\'s smooth and modern platform, dedicated to creating a world-class user experience.' },
];