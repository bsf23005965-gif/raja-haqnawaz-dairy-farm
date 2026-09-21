// 5-Angle Livestock Inspection Constants & Utilities
// Covers Face, Full Body Profile, Udder/Teats (Breast), Rear/Pelvis, and Legs/Stature

export const ANGLE_CONFIG = [
  {
    key: 'face',
    label: 'Face & Head (چہرہ)',
    urduLabel: 'چہرہ اور منہ (Face)',
    description: 'Frontal muzzle, eyes, ears & horn confirmation',
    required: false,
    defaultFallback: '/assets/cattle/cow_face.jpg'
  },
  {
    key: 'body',
    label: 'Full Body (مکمل جسم)',
    urduLabel: 'سائیڈ ویو - مکمل جسم (Body)',
    description: 'Full side profile showing frame, length, coat & dewlap',
    required: true,
    defaultFallback: '/assets/cattle/sahiwal_body.jpg'
  },
  {
    key: 'udder',
    label: 'Breast / Udder & Teats (حیوانہ)',
    urduLabel: 'حیوانہ، تھن اور چھاتی (Breast)',
    description: 'Mammary development, teat symmetry, spacing & milk veins',
    required: false,
    defaultFallback: '/assets/cattle/cow_udder.jpg'
  },
  {
    key: 'rear',
    label: 'Rear & Pelvis (پشت)',
    urduLabel: 'پشت اور چوڑائی (Rear)',
    description: 'Pelvic width, rump angle, and rear udder attachment',
    required: false,
    defaultFallback: '/assets/cattle/cow_rear.jpg'
  },
  {
    key: 'legs',
    label: 'Legs & Stature (ٹانگیں)',
    urduLabel: 'ٹانگیں اور کھر (Legs)',
    description: 'Sound hooves, hocks, strong bone structure & stance',
    required: false,
    defaultFallback: '/assets/cattle/cow_legs.jpg'
  }
];

export const BREED_DEFAULT_PHOTOS = {
  Sahiwal: '/assets/cattle/sahiwal_body.jpg',
  'Nili Ravi': '/assets/cattle/nili_ravi_buffalo.jpg',
  Cholistani: '/assets/cattle/cholistani_cow.jpg',
  'Red Sindhi': '/assets/cattle/red_sindhi_cow.jpg',
  'Holstein Friesian': '/assets/cattle/cross_dairy_cow.jpg',
  Jersey: '/assets/cattle/cross_dairy_cow.jpg',
  'Cross Breed': '/assets/cattle/cross_dairy_cow.jpg',
  Bull: '/assets/cattle/sahiwal_bull.jpg',
  Calf: '/assets/cattle/dairy_calf.jpg'
};

/**
 * Validates if an image URL is an invalid cycling or land or 404 placeholder
 */
export function isInvalidCattleImage(url) {
  if (!url || typeof url !== 'string') return true;
  // Cycling image
  if (url.includes('1541625602330-2277a4c46182')) return true;
  // Empty land / field image
  if (url.includes('1500595046743-cd271d694d30')) return true;
  // 404 unsplash images
  if (url.includes('1527153857715-3908f2ae5e81') || 
      url.includes('1551085254-e96b210df58a') || 
      url.includes('1508873696983-2df5293cb32b')) return true;
  return false;
}

/**
 * Returns an authentic breed-specific fallback photo for any cattle
 */
export function getSanitizedCattlePhoto(animal) {
  if (!animal) return '/assets/cattle/sahiwal_body.jpg';
  
  if (animal.imageUrl && !isInvalidCattleImage(animal.imageUrl)) {
    return animal.imageUrl;
  }

  if (animal.type === 'Bull') return BREED_DEFAULT_PHOTOS.Bull;
  if (animal.type === 'Calf') return BREED_DEFAULT_PHOTOS.Calf;
  if (animal.type === 'Buffalo' || animal.breed === 'Nili Ravi') return BREED_DEFAULT_PHOTOS['Nili Ravi'];
  if (animal.breed === 'Cholistani') return BREED_DEFAULT_PHOTOS.Cholistani;
  if (animal.breed === 'Red Sindhi') return BREED_DEFAULT_PHOTOS['Red Sindhi'];
  if (animal.breed === 'Holstein Friesian' || animal.breed === 'Cross Breed' || animal.breed === 'Jersey') {
    return BREED_DEFAULT_PHOTOS['Cross Breed'];
  }
  return BREED_DEFAULT_PHOTOS.Sahiwal;
}

/**
 * Generates or extracts 5 verified inspection angle photos for any animal
 */
export function getAnimalInspectionGallery(animal) {
  if (!animal) return [];

  const mainPhoto = getSanitizedCattlePhoto(animal);
  const isMale = animal.gender === 'Male' || animal.type === 'Bull';

  // If animal already has a custom angles object
  const customAngles = animal.angles || {};

  return [
    {
      key: 'face',
      label: 'Face & Head',
      urduLabel: 'چہرہ اور منہ',
      url: (!isInvalidCattleImage(customAngles.face) && customAngles.face) 
           || '/assets/cattle/cow_face.jpg',
      description: 'Clear facial confirmation, eyes, muzzle and breed horns'
    },
    {
      key: 'body',
      label: 'Full Body Side',
      urduLabel: 'سائیڈ ویو (سارا جسم)',
      url: (!isInvalidCattleImage(customAngles.body) && customAngles.body) 
           || mainPhoto,
      description: 'Side profile showing body depth, frame, coat and length'
    },
    {
      key: 'udder',
      label: isMale ? 'Underbelly & Scrotum' : 'Udder & Teats (Breast)',
      urduLabel: isMale ? 'خصیہ اور پیٹ' : 'حیوانہ اور تھن',
      url: (!isInvalidCattleImage(customAngles.udder) && customAngles.udder) 
           || (!isInvalidCattleImage(customAngles.breast) && customAngles.breast)
           || (isMale ? mainPhoto : '/assets/cattle/cow_udder.jpg'),
      description: isMale 
        ? 'Breeding stud underbelly, testicles & sheath development'
        : 'Capacity, square teat placement, fore and rear udder attachment'
    },
    {
      key: 'rear',
      label: 'Rear & Pelvis',
      urduLabel: 'پشت اور چوڑائی',
      url: (!isInvalidCattleImage(customAngles.rear) && customAngles.rear) 
           || '/assets/cattle/cow_rear.jpg',
      description: 'Rump width, pin bone spacing and pelvis strength'
    },
    {
      key: 'legs',
      label: 'Legs & Stature',
      urduLabel: 'ٹانگیں اور پاؤں',
      url: (!isInvalidCattleImage(customAngles.legs) && customAngles.legs) 
           || '/assets/cattle/cow_legs.jpg',
      description: 'Hoof condition, upright pasterns, and clean joints'
    }
  ];
}
