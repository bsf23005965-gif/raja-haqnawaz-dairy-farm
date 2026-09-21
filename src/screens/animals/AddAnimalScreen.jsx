import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, 
  Camera, 
  Upload, 
  Trash2, 
  CheckCircle2, 
  Sparkles, 
  Plus, 
  Eye, 
  ShieldCheck, 
  Milk,
  AlertCircle,
  HelpCircle,
  Layers
} from 'lucide-react';
import { useAnimalStore } from '../../stores/animalStore.js';
import { ANGLE_CONFIG, BREED_DEFAULT_PHOTOS } from '../../constants/cattleImageAngles.js';

export default function AddAnimalScreen({ onNavigate }) {
  const { addAnimal, selectAnimal } = useAnimalStore();

  const [form, setForm] = useState({
    name: '',
    type: 'Cow',
    breed: 'Sahiwal',
    gender: 'Female',
    price: '',
    milkProductionPerDay: '',
    age: '3.5',
    teeth: '4 Teeth (چوگا)',
    lactationNumber: '2nd Lactation (دوسرا سوآ)',
    pregnancyStatus: 'Freshly Calved (تازہ سوئی ہوئی)',
    weight: '480',
    location: 'Naseem Colony near Imambargah, Jauharabad, Khushab',
    description: 'خالص نسل کی صحت مند گائے، بہترین حیوانہ اور میٹھا دودھ۔ فارم پر موقع پر معائنہ اور چوائی دستیاب ہے۔'
  });

  // 5 inspection photos state (Direct file uploads converted to base64 Data URLs)
  const [angles, setAngles] = useState({
    face: '',
    body: '',
    udder: '', // Udder / Breast
    rear: '',
    legs: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [previewAngle, setPreviewAngle] = useState('body');

  const bulkInputRef = useRef(null);
  const slotInputRefs = {
    face: useRef(null),
    body: useRef(null),
    udder: useRef(null),
    rear: useRef(null),
    legs: useRef(null)
  };

  // Process a single file to Base64
  const processFile = (key, file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (JPG, PNG, WEBP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setAngles(prev => ({
        ...prev,
        [key]: e.target.result
      }));
      setErrorMsg('');
    };
    reader.readAsDataURL(file);
  };

  // Bulk upload: user selects up to 5 photos from gallery/PC at once
  const handleBulkUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const slotKeys = ['body', 'face', 'udder', 'rear', 'legs'];
    const updated = { ...angles };
    let processed = 0;

    files.slice(0, 5).forEach((file, index) => {
      const key = slotKeys[index];
      const reader = new FileReader();
      reader.onload = (ev) => {
        updated[key] = ev.target.result;
        processed++;
        if (processed === Math.min(files.length, 5)) {
          setAngles({ ...updated });
          setErrorMsg('');
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Remove photo from slot
  const handleRemovePhoto = (key) => {
    setAngles(prev => ({
      ...prev,
      [key]: ''
    }));
  };

  // Load verified farm sample photos if user wants quick autofill
  const handleLoadSamplePhotos = () => {
    const defaultBody = BREED_DEFAULT_PHOTOS[form.breed] || '/raja-haqnawaz-dairy-farm/assets/cattle/sahiwal_body.jpg';
    setAngles({
      face: '/raja-haqnawaz-dairy-farm/assets/cattle/cow_face.jpg',
      body: defaultBody,
      udder: '/raja-haqnawaz-dairy-farm/assets/cattle/cow_udder.jpg',
      rear: '/raja-haqnawaz-dairy-farm/assets/cattle/cow_rear.jpg',
      legs: '/raja-haqnawaz-dairy-farm/assets/cattle/cow_legs.jpg'
    });
    setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setErrorMsg('Please enter an animal name or identifier.');
      return;
    }
    if (!form.price || Number(form.price) <= 0) {
      setErrorMsg('Please specify a valid official price in PKR.');
      return;
    }

    // Check if at least body or face photo is uploaded
    const mainPhoto = angles.body || angles.face || angles.udder || BREED_DEFAULT_PHOTOS[form.breed] || '/raja-haqnawaz-dairy-farm/assets/cattle/sahiwal_body.jpg';

    setIsSubmitting(true);

    const finalAngles = {
      face: angles.face || '/raja-haqnawaz-dairy-farm/assets/cattle/cow_face.jpg',
      body: angles.body || mainPhoto,
      udder: angles.udder || '/raja-haqnawaz-dairy-farm/assets/cattle/cow_udder.jpg',
      rear: angles.rear || '/raja-haqnawaz-dairy-farm/assets/cattle/cow_rear.jpg',
      legs: angles.legs || '/raja-haqnawaz-dairy-farm/assets/cattle/cow_legs.jpg'
    };

    const newAnimalData = {
      name: form.name.trim(),
      type: form.type,
      breed: form.breed,
      gender: form.gender,
      price: Number(form.price),
      milkProductionPerDay: Number(form.milkProductionPerDay) || 0,
      age: Number(form.age) || 3,
      teeth: form.teeth,
      lactationNumber: form.lactationNumber,
      pregnancyStatus: form.pregnancyStatus,
      weight: Number(form.weight) || 450,
      location: form.location,
      description: form.description,
      imageUrl: mainPhoto,
      angles: finalAngles,
      availability: 'Available',
      features: [
        `${form.breed} Champion Genetics`,
        `${form.milkProductionPerDay || 20} Liters Tested Daily`,
        'Veterinary Biosecurity Screened',
        'Direct Farm Transport Available'
      ]
    };

    try {
      const added = addAnimal(newAnimalData);
      selectAnimal(added);
      setIsSubmitting(false);
      // Navigate to animal details to see the uploaded photos immediately
      onNavigate('animal_details');
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to save animal. Please try again.');
      setIsSubmitting(false);
    }
  };

  const uploadedCount = Object.values(angles).filter(Boolean).length;

  const photoSlots = [
    {
      key: 'face',
      label: '1. Face & Head',
      urduLabel: 'چہرہ اور منہ',
      desc: 'Muzzle, eyes, horns & facial health',
      icon: '🐮'
    },
    {
      key: 'body',
      label: '2. Full Body Profile',
      urduLabel: 'مکمل سائیڈ ویو',
      desc: 'Side length, depth, coat color & frame',
      icon: '🐄'
    },
    {
      key: 'udder',
      label: '3. Breast / Udder & Teats',
      urduLabel: 'حیوانہ، تھن اور چوائی (Breast)',
      desc: 'Teat symmetry, mammary capacity & milk veins',
      icon: '🥛'
    },
    {
      key: 'rear',
      label: '4. Rear & Pelvis',
      urduLabel: 'پشت اور چوڑائی',
      desc: 'Rump width, pin bone spacing & rear height',
      icon: '📐'
    },
    {
      key: 'legs',
      label: '5. Legs & Stature',
      urduLabel: 'ٹانگیں اور کھر',
      desc: 'Hoof condition, upright legs & sturdy bone stance',
      icon: '🐾'
    }
  ];

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
        <div>
          <button
            onClick={() => onNavigate('admin')}
            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-emerald-400 mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Admin Console</span>
          </button>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800/50">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase font-['Outfit']">
                Add New Animal (نیا جانور شامل کریں)
              </h1>
              <p className="text-xs text-neutral-400">
                Directly upload 5 photos (Face, Body, Breast/Udder, Rear, Legs) from your phone or PC.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleLoadSamplePhotos}
            className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-850 text-neutral-300 hover:text-white border border-neutral-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Autofill with Raja Haqnawaz farm sample photos"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Load Farm Sample Photos</span>
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* SECTION 1: 5-PHOTO DIRECT UPLOAD STUDIO (NO URLS!) */}
        <section className="p-6 sm:p-7 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                  <Camera className="w-4 h-4" />
                </span>
                <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                  5-Angle Photo Studio (5 زاویوں کی براہ راست تصاویر)
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/60 font-semibold">
                  {uploadedCount} / 5 Uploaded
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Upload direct photos of the animal: <strong>Face, Body, Breast/Udder, Rear & Legs</strong>. No URL required!
              </p>
            </div>

            {/* Bulk Upload Button */}
            <div>
              <input
                ref={bulkInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleBulkUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => bulkInputRef.current?.click()}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-950/60 border border-emerald-400/40 transition-all"
              >
                <Upload className="w-4 h-4 text-amber-300" />
                <span>Upload All 5 Photos at Once (ایک ساتھ 5 تصاویر)</span>
              </button>
            </div>
          </div>

          {/* 5 Slots Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {photoSlots.map((slot) => {
              const photoUrl = angles[slot.key];
              return (
                <div
                  key={slot.key}
                  className={`rounded-2xl border transition-all overflow-hidden flex flex-col justify-between ${
                    photoUrl 
                      ? 'bg-neutral-850 border-emerald-600/60 ring-1 ring-emerald-500/30' 
                      : 'bg-neutral-925 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  {/* Photo Display / Upload Area */}
                  <div className="relative aspect-[4/3] bg-neutral-950 overflow-hidden flex items-center justify-center group">
                    {photoUrl ? (
                      <>
                        <img
                          src={photoUrl}
                          alt={slot.label}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute top-2 right-2 flex items-center gap-1">
                          <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] shadow font-black">
                            ✓
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(slot.key)}
                          className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-rose-950/90 text-rose-300 hover:bg-rose-900 border border-rose-800 text-xs transition-colors"
                          title="Remove Photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    ) : (
                      <div 
                        onClick={() => slotInputRefs[slot.key].current?.click()}
                        className="w-full h-full flex flex-col items-center justify-center p-3 text-center cursor-pointer hover:bg-neutral-900/80 transition-colors"
                      >
                        <span className="text-2xl mb-1">{slot.icon}</span>
                        <Camera className="w-5 h-5 text-neutral-500 group-hover:text-emerald-400 transition-colors mb-1" />
                        <span className="text-[11px] font-bold text-neutral-300 group-hover:text-emerald-400">
                          Upload Photo
                        </span>
                        <span className="text-[9px] text-neutral-500">تصویر منتخب کریں</span>
                      </div>
                    )}

                    {/* Hidden Native File Input */}
                    <input
                      ref={slotInputRefs[slot.key]}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          processFile(slot.key, e.target.files[0]);
                        }
                      }}
                      className="hidden"
                    />
                  </div>

                  {/* Slot Information & Change Button */}
                  <div className="p-3 space-y-1 bg-neutral-900 border-t border-neutral-800">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white block">
                        {slot.label}
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-semibold block">
                      {slot.urduLabel}
                    </span>
                    <p className="text-[10px] text-neutral-500 leading-tight">
                      {slot.desc}
                    </p>

                    <button
                      type="button"
                      onClick={() => slotInputRefs[slot.key].current?.click()}
                      className="w-full mt-2 py-1.5 px-2 rounded-lg bg-neutral-800 hover:bg-neutral-750 text-neutral-300 hover:text-white text-[10px] font-semibold flex items-center justify-center gap-1 border border-neutral-700 transition-colors"
                    >
                      <Upload className="w-3 h-3 text-emerald-400" />
                      <span>{photoUrl ? 'Change Photo' : 'Select File'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 2: ANIMAL COMMERCIAL & VETERINARY SPECS */}
        <section className="p-6 sm:p-7 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-5 shadow-xl">
          <div className="border-b border-neutral-800 pb-3">
            <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
              Animal Information & Pricing (تفصیلات اور قیمت)
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Enter official farm specifications and price in Pakistani Rupees (PKR).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {/* Animal Name */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-neutral-300 font-bold block">
                Animal Name / Title * (جانور کا نام یا پہچان)
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Sahiwal Champion Cow (Heer / راجہ ہیر)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none focus:border-emerald-500 text-xs sm:text-sm"
              />
            </div>

            {/* Price */}
            <div className="space-y-1">
              <label className="text-neutral-300 font-bold block">
                Official Price (PKR) * (قیمت روپے)
              </label>
              <input
                type="number"
                required
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="e.g. 450000"
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none focus:border-emerald-500 font-mono font-bold text-emerald-400"
              />
            </div>

            {/* Animal Type */}
            <div className="space-y-1">
              <label className="text-neutral-300 font-bold block">Animal Type (قسم)</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Cow">Cow (گائے)</option>
                <option value="Buffalo">Buffalo (بھینس)</option>
                <option value="Bull">Stud Bull (بیل / سانڈھ)</option>
                <option value="Calf">Calf (بچھڑا / بچھڑی)</option>
              </select>
            </div>

            {/* Breed */}
            <div className="space-y-1">
              <label className="text-neutral-300 font-bold block">Breed (نسل)</label>
              <select
                value={form.breed}
                onChange={(e) => setForm({ ...form, breed: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Sahiwal">Pure Sahiwal (ساہیوال)</option>
                <option value="Nili Ravi">Nili Ravi (نیلی راوی بھینس)</option>
                <option value="Cholistani">Cholistani (چولستانی)</option>
                <option value="Red Sindhi">Red Sindhi (لال سندھی)</option>
                <option value="Cross Breed">Cross Breed (آسٹریلین / فریزن کراس)</option>
                <option value="Holstein Friesian">Holstein Friesian</option>
                <option value="Jersey">Jersey</option>
              </select>
            </div>

            {/* Milk Production */}
            <div className="space-y-1">
              <label className="text-neutral-300 font-bold block">
                Milk Production (Liters / Day) (روزانہ دودھ کی مقدار)
              </label>
              <input
                type="number"
                step="0.5"
                value={form.milkProductionPerDay}
                onChange={(e) => setForm({ ...form, milkProductionPerDay: e.target.value })}
                placeholder="e.g. 24"
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Age */}
            <div className="space-y-1">
              <label className="text-neutral-300 font-bold block">Age (Years) (عمر سال)</label>
              <input
                type="number"
                step="0.5"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                placeholder="e.g. 3.5"
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Teeth (دندے) */}
            <div className="space-y-1">
              <label className="text-neutral-300 font-bold block">Teeth Confirmation (دانت)</label>
              <select
                value={form.teeth}
                onChange={(e) => setForm({ ...form, teeth: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="2 Teeth (دوندہ)">2 Teeth (دوندہ)</option>
                <option value="4 Teeth (چوگا)">4 Teeth (چوگا)</option>
                <option value="6 Teeth (چھگا)">6 Teeth (چھگا)</option>
                <option value="Full Mouth (پورا)">Full Mouth (پورا منہ)</option>
                <option value="Milk Teeth (کھیر)">Milk Teeth (کھیر)</option>
              </select>
            </div>

            {/* Lactation / Status */}
            <div className="space-y-1">
              <label className="text-neutral-300 font-bold block">Lactation Stage (سوآ)</label>
              <select
                value={form.lactationNumber}
                onChange={(e) => setForm({ ...form, lactationNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="1st Lactation (پہلا سوآ)">1st Lactation (پہلا سوآ)</option>
                <option value="2nd Lactation (دوسرا سوآ)">2nd Lactation (دوسرا سوآ)</option>
                <option value="3rd Lactation (تیسرا سوآ)">3rd Lactation (تیسرا سوآ)</option>
                <option value="Heifer / Pregnant (گبن وہڑی)">Heifer / Pregnant (گبن وہڑی)</option>
                <option value="Breeding Stud (بریڈنگ بیل)">Breeding Stud (بریڈنگ بیل)</option>
              </select>
            </div>

            {/* Farm Location */}
            <div className="space-y-1 sm:col-span-2 lg:col-span-3">
              <label className="text-neutral-300 font-bold block">Farm Location (فارم کا پتہ)</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none focus:border-emerald-500 text-xs"
              />
            </div>

            {/* Description */}
            <div className="space-y-1 sm:col-span-2 lg:col-span-3">
              <label className="text-neutral-300 font-bold block">Description & Health Notes (مزید تفصیل)</label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none focus:border-emerald-500 text-xs leading-relaxed"
                placeholder="Describe animal temper, milking habits, udder structure, pedigree line..."
              />
            </div>
          </div>
        </section>

        {/* SECTION 3: SUBMIT ACTION BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 flex items-center justify-center text-emerald-400 shrink-0 border border-emerald-800/40">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase">Ready to Publish</h3>
              <p className="text-[11px] text-neutral-400">
                The animal will immediately appear in the live Livestock Marketplace with full 5-angle inspection.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => onNavigate('marketplace')}
              className="w-1/2 sm:w-auto px-5 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-neutral-300 hover:text-white text-xs font-bold transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-1/2 sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 hover:from-emerald-500 hover:to-green-500 text-white text-xs sm:text-sm font-bold shadow-xl shadow-emerald-950/70 border border-emerald-400/40 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Plus className="w-4 h-4 text-amber-300" />
              <span>{isSubmitting ? 'Publishing...' : 'Publish Animal to Marketplace'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
