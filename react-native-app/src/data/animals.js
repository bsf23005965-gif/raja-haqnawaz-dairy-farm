// 33 Livestock Records for React Native Expo App
export const SEED_ANIMALS = [
  {
    id: 'RH-AN-101',
    name: 'Sahiwal Queen (Surraya)',
    breed: 'Sahiwal',
    type: 'Cow',
    gender: 'Female',
    age: 3.5,
    weight: 480,
    milkProductionPerDay: 22,
    healthStatus: 'Excellent - Certified Pure Pedigree',
    vaccinationStatus: 'FMD & HS Fully Vaccinated',
    description: 'Champion pure-bred Sahiwal milch cow with deep reddish dun coat, prominent dewlap, docile temperament, and verified 22L/day sweet milk yield.',
    price: 385000,
    imageUrl: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=800&auto=format&fit=crop',
    availability: 'Available',
    location: 'Shed A - Lactation Unit, Raja Haqnawaz Farm, Jauharabad'
  },
  {
    id: 'RH-AN-102',
    name: 'Nili-Ravi Pride (Kaali)',
    breed: 'Nili Ravi',
    type: 'Buffalo',
    gender: 'Female',
    age: 4.0,
    weight: 620,
    milkProductionPerDay: 24,
    healthStatus: 'Healthy - Peak 2nd Lactation',
    vaccinationStatus: 'Fully Vaccinated & Dewormed',
    description: 'Pure Panch Kalyani Nili-Ravi buffalo featuring wall-eyes and white stockings. High butterfat (7.8%) milk yield, ideal for premium dairy production.',
    price: 490000,
    imageUrl: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=800&auto=format&fit=crop',
    availability: 'Available',
    location: 'Shed B - Buffalo Yard, Raja Haqnawaz Farm, Jauharabad'
  },
  {
    id: 'RH-AN-103',
    name: 'Cholistani Royal (Heer)',
    breed: 'Cholistani',
    type: 'Cow',
    gender: 'Female',
    age: 3.0,
    weight: 420,
    milkProductionPerDay: 16,
    healthStatus: 'Excellent - High Heat Tolerance',
    vaccinationStatus: 'Fully Vaccinated',
    description: 'Striking white coat with black and brown speckles. Exceptional resilience to summer temperatures with consistent high-protein milk production.',
    price: 295000,
    imageUrl: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?w=800&auto=format&fit=crop',
    availability: 'Available',
    location: 'Shed A - Pasture 2, Raja Haqnawaz Farm, Jauharabad'
  },
  {
    id: 'RH-AN-104',
    name: 'Jauharabad Sultan (Stud Bull)',
    breed: 'Sahiwal',
    type: 'Bull',
    gender: 'Male',
    age: 4.5,
    weight: 780,
    milkProductionPerDay: 0,
    healthStatus: 'Prime Breeding Vigour',
    vaccinationStatus: 'Fully Vaccinated & DNA Certified',
    description: 'Massive majestic Sahiwal breeding bull with symmetrical muscular hump and proven maternal lines exceeding 25L daily lactation.',
    price: 550000,
    imageUrl: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&auto=format&fit=crop',
    availability: 'Available',
    location: 'Breeding Yard 1, Raja Haqnawaz Farm, Jauharabad'
  },
  {
    id: 'RH-AN-105',
    name: 'Kundi Royal Murrah',
    breed: 'Kundi / Murrah',
    type: 'Buffalo',
    gender: 'Female',
    age: 3.8,
    weight: 590,
    milkProductionPerDay: 20,
    healthStatus: 'Excellent Lactation',
    vaccinationStatus: 'Fully Vaccinated',
    description: 'Tightly curled fish-hook horns, jet black skin, high density butterfat milk.',
    price: 420000,
    imageUrl: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=800&auto=format&fit=crop',
    availability: 'Available',
    location: 'Shed B, Raja Haqnawaz Farm'
  },
  {
    id: 'RH-AN-106',
    name: 'Red Sindhi Ruby',
    breed: 'Red Sindhi',
    type: 'Cow',
    gender: 'Female',
    age: 3.2,
    weight: 410,
    milkProductionPerDay: 18,
    healthStatus: 'Active & Very Docile',
    vaccinationStatus: 'Fully Vaccinated',
    description: 'Deep reddish mahogany coat with compact build and remarkable tick resistance.',
    price: 340000,
    imageUrl: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=800&auto=format&fit=crop',
    availability: 'Available',
    location: 'Shed A, Raja Haqnawaz Farm'
  },
  {
    id: 'RH-AN-107',
    name: 'Friesian Sahiwal Cross (Holstein Star)',
    breed: 'Crossbred',
    type: 'Cow',
    gender: 'Female',
    age: 3.6,
    weight: 530,
    milkProductionPerDay: 28,
    healthStatus: 'High Producing Milker',
    vaccinationStatus: 'Fully Vaccinated',
    description: 'F1 cross combining Friesian peak milk volume with local Sahiwal climate immunity.',
    price: 460000,
    imageUrl: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&auto=format&fit=crop',
    availability: 'Available',
    location: 'Lactation Unit 2, Raja Haqnawaz Farm'
  },
  {
    id: 'RH-AN-108',
    name: 'Khushab Noor (Royal Sahiwal Cow)',
    breed: 'Sahiwal',
    type: 'Cow',
    gender: 'Female',
    age: 3.5,
    weight: 485,
    milkProductionPerDay: 23,
    healthStatus: 'Excellent Lactation & Docile Temperament',
    vaccinationStatus: 'Fully Vaccinated',
    description: 'Championship lineage Sahiwal milch cow originating from Jauharabad Khushab. Perfectly balanced udder, 4 well-spaced functional teats, sweet creamy high-fat milk, and calm milker.',
    price: 435000,
    imageUrl: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=800&auto=format&fit=crop',
    availability: 'Available',
    location: 'Shed A - Lactation Unit, Raja Haqnawaz Farm, Jauharabad'
  }
];

// Generate total 33 animals array
export const ALL_33_ANIMALS = [
  ...SEED_ANIMALS,
  ...Array.from({ length: 25 }, (_, i) => {
    const num = i + 109;
    const isCow = i % 3 !== 0;
    const isBuffalo = i % 3 === 0;
    const breed = isBuffalo ? 'Nili Ravi' : (i % 2 === 0 ? 'Sahiwal' : 'Cholistani');
    return {
      id: `RH-AN-${num}`,
      name: `${breed} ${isBuffalo ? 'Buffalo' : 'Cow'} #${num}`,
      breed: breed,
      type: isBuffalo ? 'Buffalo' : 'Cow',
      gender: 'Female',
      age: +(2.5 + (i * 0.1)).toFixed(1),
      weight: 420 + (i * 8),
      milkProductionPerDay: 16 + (i % 10),
      healthStatus: 'Certified Healthy & Vet Inspected',
      vaccinationStatus: 'Fully Vaccinated',
      description: `Authentic Pakistani ${breed} dairy cattle bred at Raja Haqnawaz Farm, Naseem Colony Jauharabad.`,
      price: 320000 + (i * 6000),
      imageUrl: isBuffalo 
        ? 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=800&auto=format&fit=crop'
        : 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=800&auto=format&fit=crop',
      availability: 'Available',
      location: 'Raja Haqnawaz Dairy Farm, Jauharabad, Khushab'
    };
  })
];
