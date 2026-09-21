import React, { useRef } from 'react';
import { 
  Upload, 
  Camera, 
  Trash2, 
  CheckCircle2, 
  Eye, 
  Sparkles, 
  Layers,
  HelpCircle
} from 'lucide-react';
import { ANGLE_CONFIG, BREED_DEFAULT_PHOTOS } from '../constants/cattleImageAngles.js';

export default function CattlePhotoUploadSection({
  angles = {},
  onChange,
  breed = 'Sahiwal',
  gender = 'Female',
  type = 'Cow'
}) {
  const bulkInputRef = useRef(null);

  // Handle individual angle file upload
  const handleSlotUpload = (key, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      onChange({
        ...angles,
        [key]: dataUrl
      });
    };
    reader.readAsDataURL(file);
  };

  // Remove photo from a specific slot
  const handleRemoveSlot = (key) => {
    const updated = { ...angles };
    delete updated[key];
    onChange(updated);
  };

  // Bulk upload: user selects up to 5 files at once
  const handleBulkUpload = (files) => {
    if (!files || files.length === 0) return;
    const fileList = Array.from(files);
    const keys = ['body', 'face', 'udder', 'rear', 'legs'];
    const newAngles = { ...angles };

    let loadedCount = 0;
    fileList.forEach((file, index) => {
      if (index >= keys.length) return;
      const targetKey = keys[index];
      const reader = new FileReader();
      reader.onload = (e) => {
        newAngles[targetKey] = e.target.result;
        loadedCount++;
        if (loadedCount === Math.min(fileList.length, keys.length)) {
          onChange(newAngles);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Pre-fill with Raja Haqnawaz farm verified inspection images for this breed
  const handleLoadSamplePhotos = () => {
    const mainPhoto = BREED_DEFAULT_PHOTOS[breed] || BREED_DEFAULT_PHOTOS[type] || '/raja-haqnawaz-dairy-farm/assets/cattle/sahiwal_body.jpg';
    const isMale = gender === 'Male' || type === 'Bull';

    onChange({
      face: '/raja-haqnawaz-dairy-farm/assets/cattle/cow_face.jpg',
      body: mainPhoto,
      udder: isMale ? mainPhoto : '/raja-haqnawaz-dairy-farm/assets/cattle/cow_udder.jpg',
      rear: '/raja-haqnawaz-dairy-farm/assets/cattle/cow_rear.jpg',
      legs: '/raja-haqnawaz-dairy-farm/assets/cattle/cow_legs.jpg'
    });
  };

  const isMale = gender === 'Male' || type === 'Bull';
  const totalUploaded = Object.values(angles).filter(Boolean).length;

  return (
    <div className="space-y-4 p-5 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-xl">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800/40">
              <Camera className="w-4 h-4" />
            </span>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              5-Angle Livestock Photo Studio (5 زاویوں سے تصاویر)
            </h4>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Upload clear photographs of the animal's <strong>Face, Full Body, Udder/Teats (حیوانہ/تھن), Rear & Legs</strong> for buyer verification.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={bulkInputRef}
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleBulkUpload(e.target.files)}
          />

          <button
            type="button"
            onClick={() => bulkInputRef.current?.click()}
            className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-neutral-200 border border-neutral-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>Select Multiple (5)</span>
          </button>

          <button
            type="button"
            onClick={handleLoadSamplePhotos}
            className="px-3 py-1.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-700/50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Pre-fill with farm inspection reference pictures"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Fill Sample Photos</span>
          </button>
        </div>
      </div>

      {/* Progress & Guidance Banner */}
      <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-neutral-950/80 border border-neutral-800 text-xs">
        <span className="text-neutral-400">
          Upload Status: <strong className="text-emerald-400">{totalUploaded} of 5 Angles Uploaded</strong>
        </span>
        <span className="text-[11px] text-amber-400 font-medium">
          ★ Udder/Breast & Body views are highly recommended for dairy cows
        </span>
      </div>

      {/* 5-Angle Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {ANGLE_CONFIG.map((config) => {
          const currentUrl = angles[config.key];
          const isUdder = config.key === 'udder';
          const isBody = config.key === 'body';

          const slotTitle = isUdder && isMale 
            ? 'Underbelly & Scrotum' 
            : config.label;
          const slotUrdu = isUdder && isMale 
            ? 'خصیہ اور پیٹ' 
            : config.urduLabel;

          return (
            <div
              key={config.key}
              className={`relative rounded-2xl border transition-all overflow-hidden flex flex-col ${
                currentUrl
                  ? 'bg-neutral-850 border-emerald-600/50 shadow-md shadow-emerald-950/30'
                  : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700 border-dashed'
              }`}
            >
              {/* Card Header Label */}
              <div className="px-3 py-2 bg-neutral-900/90 border-b border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {currentUrl ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-neutral-600" />
                  )}
                  <span className="text-xs font-bold text-white">{slotTitle}</span>
                  {isBody && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                      Primary
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-emerald-400/90 font-medium">
                  {slotUrdu}
                </span>
              </div>

              {/* Card Body / Preview */}
              {currentUrl ? (
                <div className="relative aspect-[4/3] bg-neutral-950 group">
                  <img
                    src={currentUrl}
                    alt={slotTitle}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <label className="cursor-pointer p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold flex items-center gap-1">
                      <Camera className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Replace</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleSlotUpload(config.key, e.target.files?.[0])}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => handleRemoveSlot(config.key)}
                      className="p-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-300 text-xs font-semibold flex items-center gap-1 border border-rose-800/40"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>

                  {/* Badges on preview */}
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-lg bg-neutral-950/90 text-[10px] text-neutral-300 backdrop-blur-md">
                    {slotTitle}
                  </div>
                </div>
              ) : (
                <label className="relative aspect-[4/3] flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-neutral-900/50 transition-colors text-center group">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleSlotUpload(config.key, e.target.files?.[0])}
                  />
                  <div className="w-10 h-10 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 group-hover:text-emerald-400 group-hover:border-emerald-600/50 transition-all mb-2">
                    <Upload className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-white group-hover:text-emerald-300">
                    Upload {slotTitle}
                  </span>
                  <span className="text-[10px] text-neutral-500 mt-1 max-w-[180px] leading-tight">
                    {config.description}
                  </span>
                </label>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
