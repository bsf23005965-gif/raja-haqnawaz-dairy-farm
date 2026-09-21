import React, { useState } from 'react';
import { AIService } from '../../services/AIService.js';
import { 
  Stethoscope, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Loader2, 
  Activity, 
  Thermometer, 
  Milk 
} from 'lucide-react';

export default function AIHealthTab() {
  const [formData, setFormData] = useState({
    breed: 'Sahiwal Cow',
    age: '4 Years',
    symptoms: 'Loss of appetite, dull eyes, decreased rumination, nasal discharge',
    temperature: '103.2 F',
    eatingBehavior: 'Off Feed',
    activity: 'Dull / Lethargic',
    milkProduction: 'Dropped > 40%',
    vaccination: 'Up to Date (FMD + HS in spring)'
  });

  const [loading, setLoading] = useState(false);
  const [assessment, setAssessment] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await AIService.assessHealth(formData);
      setAssessment(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-amber-950/70 border border-amber-600/50 flex items-start gap-3 text-amber-200 text-xs">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold">Mandatory Veterinary Medical Disclaimer</strong>
          <p className="mt-0.5 opacity-90 leading-relaxed">
            {AIService.HEALTH_DISCLAIMER}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="lg:col-span-6 p-5 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
            <Stethoscope className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Livestock Clinical Symptoms Input
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="space-y-1">
              <label className="text-neutral-400 font-medium">Breed</label>
              <input
                type="text"
                value={formData.breed}
                onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-400 font-medium">Age</label>
              <input
                type="text"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-400 font-medium">Rectal Temperature</label>
              <input
                type="text"
                value={formData.temperature}
                onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                placeholder="e.g. 101.5 F or 103.8 F"
                className="w-full px-3 py-2 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-400 font-medium">Eating Behavior</label>
              <select
                value={formData.eatingBehavior}
                onChange={(e) => setFormData({ ...formData, eatingBehavior: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Normal / Chewing Cud">Normal / Chewing Cud</option>
                <option value="Reduced Appetite">Reduced Appetite</option>
                <option value="Off Feed">Off Feed (Completely stopped)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-neutral-400 font-medium">Activity Level</label>
              <select
                value={formData.activity}
                onChange={(e) => setFormData({ ...formData, activity: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Active / Alert">Active / Alert</option>
                <option value="Dull / Lethargic">Dull / Lethargic</option>
                <option value="Recumbent (Unable to rise)">Recumbent (Unable to rise)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-neutral-400 font-medium">Milk Production Change</label>
              <select
                value={formData.milkProduction}
                onChange={(e) => setFormData({ ...formData, milkProduction: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Normal Yield">Normal Yield</option>
                <option value="Dropped 10-20%">Dropped 10-20%</option>
                <option value="Dropped > 40%">Dropped &gt; 40%</option>
              </select>
            </div>

            <div className="col-span-1 sm:col-span-2 space-y-1">
              <label className="text-neutral-400 font-medium">Vaccination History</label>
              <input
                type="text"
                value={formData.vaccination}
                onChange={(e) => setFormData({ ...formData, vaccination: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="col-span-1 sm:col-span-2 space-y-1">
              <label className="text-neutral-400 font-medium">Observed Symptoms & Notes</label>
              <textarea
                rows={3}
                value={formData.symptoms}
                onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Evaluating Veterinary Heuristics...</span>
              </>
            ) : (
              <>
                <Activity className="w-4 h-4" />
                <span>Analyze Clinical Symptoms</span>
              </>
            )}
          </button>
        </form>

        {/* Assessment Results Card */}
        <div className="lg:col-span-6 space-y-4">
          {assessment ? (
            <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span>Clinical Assessment Report</span>
                </h3>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                    assessment.urgency?.toLowerCase().includes('immediate') || assessment.urgency?.toLowerCase().includes('high')
                      ? 'bg-rose-950 text-rose-300 border border-rose-600/50'
                      : 'bg-amber-950 text-amber-300 border border-amber-600/50'
                  }`}
                >
                  Urgency: {assessment.urgency}
                </span>
              </div>

              <div className="space-y-3 text-xs leading-relaxed">
                <div className="p-3.5 rounded-2xl bg-neutral-850 border border-neutral-800">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">1. General Observation</span>
                  <p className="text-white mt-1">{assessment.generalObservation}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-neutral-850 border border-neutral-800">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">2. Possible Concern</span>
                  <p className="text-neutral-200 mt-1">{assessment.possibleConcern}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-800/60">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">3. Suggested Next Step</span>
                  <p className="text-emerald-200 mt-1">{assessment.suggestedNextStep}</p>
                </div>
              </div>

              <div className="pt-2 text-[10px] text-neutral-500 italic">
                {assessment.disclaimer}
              </div>
            </div>
          ) : (
            <div className="p-10 rounded-3xl bg-neutral-900/60 border border-neutral-800 text-center space-y-3 flex flex-col items-center justify-center min-h-[300px]">
              <Stethoscope className="w-10 h-10 text-neutral-600" />
              <h4 className="text-xs font-bold text-neutral-300">No Assessment Yet</h4>
              <p className="text-xs text-neutral-500 max-w-xs">
                Fill in the temperature, symptoms, and milk drop metrics on the left and tap 'Analyze Clinical Symptoms' to receive veterinary guidance.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
