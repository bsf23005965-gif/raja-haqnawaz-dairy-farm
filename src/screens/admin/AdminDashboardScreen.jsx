import React, { useState } from 'react';
import { useAnimalStore } from '../../stores/animalStore.js';
import { useOrderStore } from '../../stores/orderStore.js';
import { useAdminStore } from '../../stores/adminStore.js';
import { useAuthStore } from '../../stores/authStore.js';
import { FARM_CONTACT } from '../../constants/farmContact.js';
import { SOCIAL_LINKS } from '../../constants/socialLinks.js';
import { BRANDING } from '../../constants/branding.js';
import CattlePhotoUploadSection from '../../components/CattlePhotoUploadSection.jsx';
import DailyMilkProductionChart from '../../components/DailyMilkProductionChart.jsx';
import MilkPriceTrendsChart from '../../components/MilkPriceTrendsChart.jsx';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  PlusCircle, 
  ClipboardList, 
  CreditCard, 
  Users, 
  BarChart3, 
  Settings, 
  PhoneCall, 
  Share2, 
  Info, 
  LogOut, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  DollarSign, 
  Image as ImageIcon,
  Save,
  RotateCcw,
  Milk,
  TrendingUp
} from 'lucide-react';

export default function AdminDashboardScreen({ onNavigate }) {
  const { animals, addAnimal, updateAnimal, deleteAnimal, updateAnimalAvailability } = useAnimalStore();
  const { orders, updateOrderStatus, updatePaymentStatus } = useOrderStore();
  const { 
    farmContact, 
    socialLinks, 
    branding, 
    aboutContent, 
    updateContactInfo, 
    updateSocialLinks, 
    updateBranding, 
    updateAboutContent,
    resetToDefaults 
  } = useAdminStore();
  const { user, setRole } = useAuthStore();

  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'animals' | 'add_animal' | 'orders' | 'payments' | 'analytics' | 'branding' | 'contact' | 'about'
  const [dashboardChartTab, setDashboardChartTab] = useState('prices'); // 'prices' | 'production' | 'both'
  const [saveSuccess, setSaveSuccess] = useState(false);

  // New Animal Form State
  const [newAnimal, setNewAnimal] = useState({
    name: '',
    type: 'Cow',
    breed: 'Sahiwal',
    gender: 'Female',
    age: 3,
    weight: 420,
    milkProductionPerDay: 20,
    healthStatus: 'Excellent, 100% sound',
    vaccinationStatus: 'Fully vaccinated (FMD, HS)',
    price: 380000,
    description: '',
    availability: 'Available',
    location: 'Raja Haqnawaz Dairy Farm, Naseem Colony, Jauharabad, Khushab',
    imageUrl: '/raja-haqnawaz-dairy-farm/assets/cattle/sahiwal_body.jpg',
    angles: {
      face: '/raja-haqnawaz-dairy-farm/assets/cattle/cow_face.jpg',
      body: '/raja-haqnawaz-dairy-farm/assets/cattle/sahiwal_body.jpg',
      udder: '/raja-haqnawaz-dairy-farm/assets/cattle/cow_udder.jpg',
      rear: '/raja-haqnawaz-dairy-farm/assets/cattle/cow_rear.jpg',
      legs: '/raja-haqnawaz-dairy-farm/assets/cattle/cow_legs.jpg'
    }
  });

  // Editing Animal State
  const [editingAnimal, setEditingAnimal] = useState(null);

  // Analytics Computations
  const totalAnimals = animals.length;
  const availableAnimals = animals.filter(a => a.availability === 'Available').length;
  const reservedAnimals = animals.filter(a => a.availability === 'Reserved').length;
  const soldAnimals = animals.filter(a => a.availability === 'Sold').length;

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => o.paymentStatus === 'Paid' ? sum + o.totalAmount : sum, 0);

  const handleAddAnimalSubmit = (e) => {
    e.preventDefault();
    if (!newAnimal.name || !newAnimal.price) {
      alert('Please enter animal name and price.');
      return;
    }
    const primaryImg = newAnimal.angles?.body || newAnimal.angles?.face || newAnimal.imageUrl || '/raja-haqnawaz-dairy-farm/assets/cattle/sahiwal_body.jpg';
    addAnimal({
      ...newAnimal,
      price: Number(newAnimal.price),
      age: Number(newAnimal.age),
      weight: Number(newAnimal.weight),
      milkProductionPerDay: Number(newAnimal.milkProductionPerDay),
      imageUrl: primaryImg,
      angles: newAnimal.angles || {}
    });
    alert('Animal with 5-angle inspection photos successfully added to Raja Haqnawaz Dairy Farm inventory!');
    setActiveTab('animals');
  };

  const handleEditAnimalSave = (e) => {
    e.preventDefault();
    updateAnimal(editingAnimal.id, editingAnimal);
    setEditingAnimal(null);
    alert('Animal updated successfully.');
  };

  const handleSaveSettings = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const tabs = [
    { id: 'dashboard', label: 'Farm Dashboard', icon: LayoutDashboard },
    { id: 'animals', label: 'Animals List', icon: ShoppingBag, count: totalAnimals },
    { id: 'add_animal', label: 'Add Livestock', icon: PlusCircle },
    { id: 'orders', label: 'Orders & Dispatches', icon: ClipboardList, count: totalOrders },
    { id: 'analytics', label: 'Analytics & KPIs', icon: BarChart3 },
    { id: 'branding', label: 'Farm Profile', icon: ImageIcon },
    { id: 'about', label: 'About Farm Story', icon: Info },
    { id: 'contact', label: 'Contact & Social', icon: PhoneCall },
  ];

  return (
    <div className="space-y-6 pb-24">
      {/* Admin Panel Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-neutral-900 border border-neutral-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <h1 className="text-lg sm:text-xl font-black text-white uppercase font-['Outfit']">
              Raja Haqnawaz Dairy Farm Admin Console
            </h1>
          </div>
          <p className="text-xs text-neutral-400">
            Authorized management for cattle inventory, client orders, branding & official contacts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setRole('Customer');
              onNavigate('home');
            }}
            className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-4 h-4 text-amber-400" />
            <span>Exit to Customer View</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-emerald-800 text-white' : 'bg-neutral-800 text-neutral-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 1. OVERVIEW & KPI TAB */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* KPI Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
              <span className="text-[10px] text-neutral-500 uppercase font-bold">Total Herd Inventory</span>
              <p className="text-2xl font-black text-white">{totalAnimals}</p>
              <span className="text-[10px] text-emerald-400 font-medium">32 verified cattle entries</span>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-900 border border-emerald-800/40 space-y-1">
              <span className="text-[10px] text-emerald-400 uppercase font-bold">Available for Sale</span>
              <p className="text-2xl font-black text-emerald-400">{availableAnimals}</p>
              <span className="text-[10px] text-neutral-400 font-medium">Active in marketplace</span>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-900 border border-rose-800/40 space-y-1">
              <span className="text-[10px] text-rose-400 uppercase font-bold">Sold & Delivered</span>
              <p className="text-2xl font-black text-rose-400">{soldAnimals}</p>
              <span className="text-[10px] text-neutral-400 font-medium">Closed transactions</span>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-900 border border-amber-800/40 space-y-1">
              <span className="text-[10px] text-amber-400 uppercase font-bold">Gross Revenue</span>
              <p className="text-xl font-black text-amber-400">Rs. {(totalRevenue / 100000).toFixed(1)} Lakh</p>
              <span className="text-[10px] text-neutral-400 font-medium">Rs. {totalRevenue.toLocaleString()}</span>
            </div>
          </div>

          {/* Dynamic Recharts Dairy Visualizations: Milk Price Trends (30D) & Herd Yield */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-neutral-900/90 p-2.5 rounded-2xl border border-neutral-800">
              <div className="flex items-center gap-2 px-1">
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Recharts Dairy Visualizations
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/40 font-semibold font-mono">
                  30 Days
                </span>
              </div>

              <div className="flex items-center gap-1.5 bg-neutral-950 p-1 rounded-xl border border-neutral-800 text-xs">
                <button
                  id="tab-btn-price-trends-recharts"
                  type="button"
                  onClick={() => setDashboardChartTab('prices')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    dashboardChartTab === 'prices'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Milk Price Trends (30D)</span>
                </button>
                <button
                  id="tab-btn-production-recharts"
                  type="button"
                  onClick={() => setDashboardChartTab('production')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    dashboardChartTab === 'production'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Milk className="w-3.5 h-3.5" />
                  <span>Herd Production Yield</span>
                </button>
                <button
                  id="tab-btn-both-recharts"
                  type="button"
                  onClick={() => setDashboardChartTab('both')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer hidden md:flex items-center gap-1.5 ${
                    dashboardChartTab === 'both'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <span>Show Both</span>
                </button>
              </div>
            </div>

            {/* Historical Milk Price Trends Line Chart (Recharts) */}
            {(dashboardChartTab === 'prices' || dashboardChartTab === 'both') && (
              <MilkPriceTrendsChart />
            )}

            {/* Daily Milk Production Trends */}
            {(dashboardChartTab === 'production' || dashboardChartTab === 'both') && (
              <DailyMilkProductionChart />
            )}
          </div>

          {/* Quick Action shortcuts */}
          <div className="p-5 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-3">
            <h3 className="text-xs font-bold text-neutral-200 uppercase tracking-wider">
              Management Direct Actions
            </h3>
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => setActiveTab('add_animal')}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add New Cattle Record</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold flex items-center gap-1.5 border border-neutral-700"
              >
                <ClipboardList className="w-4 h-4 text-emerald-400" />
                <span>Review Customer Orders</span>
              </button>

              <button
                onClick={() => setActiveTab('contact')}
                className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold flex items-center gap-1.5 border border-neutral-700"
              >
                <PhoneCall className="w-4 h-4 text-blue-400" />
                <span>Update WhatsApp / Phone</span>
              </button>
            </div>
          </div>

          {/* Recent Orders Overview */}
          <div className="p-5 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Recent Dispatches & Orders
              </h3>
              <button
                onClick={() => setActiveTab('orders')}
                className="text-xs text-emerald-400 font-semibold hover:underline"
              >
                View All ({orders.length})
              </button>
            </div>

            <div className="space-y-2.5">
              {orders.slice(0, 3).map(ord => (
                <div
                  key={ord.id}
                  className="p-3.5 rounded-2xl bg-neutral-850 border border-neutral-800 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <span className="font-bold text-white block">{ord.id} - {ord.animalName}</span>
                    <span className="text-[11px] text-neutral-400">{ord.customerName} ({ord.customerPhone})</span>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-amber-400 block">Rs. {ord.totalAmount.toLocaleString()}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 font-semibold border border-emerald-800/40">
                      {ord.orderStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. ANIMALS MANAGEMENT LIST */}
      {activeTab === 'animals' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Herd Records ({animals.length})
            </h3>
            <button
              onClick={() => setActiveTab('add_animal')}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Livestock</span>
            </button>
          </div>

          <div className="space-y-3">
            {animals.map((animal) => (
              <div
                key={animal.id}
                className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-neutral-800 shrink-0">
                    <img
                      src={animal.imageUrl}
                      alt={animal.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-white">{animal.name}</h4>
                      <span className="text-[10px] text-neutral-500">({animal.id})</span>
                    </div>
                    <p className="text-xs text-emerald-400">
                      {animal.breed} • {animal.type} • {animal.age} Yrs
                      {animal.milkProductionPerDay > 0 && ` • ${animal.milkProductionPerDay} L/day`}
                    </p>
                    <p className="text-xs font-black text-amber-400">
                      Rs. {animal.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 self-end sm:self-center">
                  {/* Availability Dropdown */}
                  <select
                    value={animal.availability}
                    onChange={(e) => updateAnimalAvailability(animal.id, e.target.value)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border focus:outline-none ${
                      animal.availability === 'Available'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-700/50'
                        : animal.availability === 'Reserved'
                        ? 'bg-amber-950 text-amber-300 border-amber-700/50'
                        : 'bg-rose-950 text-rose-300 border-rose-700/50'
                    }`}
                  >
                    <option value="Available">Available</option>
                    <option value="Reserved">Reserved</option>
                    <option value="Sold">Sold</option>
                  </select>

                  {/* Edit Button */}
                  <button
                    onClick={() => setEditingAnimal(animal)}
                    className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200"
                    title="Edit details"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to remove ${animal.name} from herd inventory?`)) {
                        deleteAnimal(animal.id);
                      }
                    }}
                    className="p-2 rounded-xl bg-neutral-800 hover:bg-rose-950/70 text-neutral-400 hover:text-rose-400"
                    title="Delete animal"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. ADD LIVESTOCK TAB */}
      {activeTab === 'add_animal' && (
        <form onSubmit={handleAddAnimalSubmit} className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4 max-w-2xl mx-auto">
          <div className="border-b border-neutral-800 pb-3">
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              Register New Dairy Animal
            </h3>
            <p className="text-xs text-neutral-400">
              Add cattle to the live marketplace with veterinary specs and price in PKR.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="text-neutral-300 font-bold">Animal Name / Identifier *</label>
              <input
                type="text"
                required
                value={newAnimal.name}
                onChange={(e) => setNewAnimal({ ...newAnimal, name: e.target.value })}
                placeholder="e.g. Sahiwal Red Champion (Heer)"
                className="w-full px-3 py-2.5 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-300 font-bold">Animal Type</label>
              <select
                value={newAnimal.type}
                onChange={(e) => setNewAnimal({ ...newAnimal, type: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Cow">Cow</option>
                <option value="Buffalo">Buffalo</option>
                <option value="Bull">Bull</option>
                <option value="Calf">Calf</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-neutral-300 font-bold">Breed</label>
              <select
                value={newAnimal.breed}
                onChange={(e) => setNewAnimal({ ...newAnimal, breed: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Sahiwal">Sahiwal</option>
                <option value="Nili Ravi">Nili Ravi</option>
                <option value="Cholistani">Cholistani</option>
                <option value="Red Sindhi">Red Sindhi</option>
                <option value="Holstein Friesian">Holstein Friesian</option>
                <option value="Jersey">Jersey</option>
                <option value="Cross Breed">Cross Breed</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-neutral-300 font-bold">Official Price (PKR) *</label>
              <input
                type="number"
                required
                value={newAnimal.price}
                onChange={(e) => setNewAnimal({ ...newAnimal, price: e.target.value })}
                placeholder="e.g. 450000"
                className="w-full px-3 py-2.5 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-300 font-bold">Age (Years)</label>
              <input
                type="number"
                step="0.5"
                value={newAnimal.age}
                onChange={(e) => setNewAnimal({ ...newAnimal, age: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-300 font-bold">Milk Production (Liters / Day)</label>
              <input
                type="number"
                value={newAnimal.milkProductionPerDay}
                onChange={(e) => setNewAnimal({ ...newAnimal, milkProductionPerDay: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* 5-Angle Livestock Photo Studio (Face, Body, Udder/Breast, Rear, Legs) */}
            <div className="col-span-1 sm:col-span-2">
              <CattlePhotoUploadSection
                angles={newAnimal.angles || {}}
                onChange={(updatedAngles) => setNewAnimal({ 
                  ...newAnimal, 
                  angles: updatedAngles, 
                  imageUrl: updatedAngles.body || updatedAngles.face || newAnimal.imageUrl 
                })}
                breed={newAnimal.breed}
                gender={newAnimal.gender}
                type={newAnimal.type}
              />
            </div>

            <div className="col-span-1 sm:col-span-2 space-y-1">
              <label className="text-neutral-300 font-bold">Description & Pedigree</label>
              <textarea
                rows={3}
                value={newAnimal.description}
                onChange={(e) => setNewAnimal({ ...newAnimal, description: e.target.value })}
                placeholder="Describe milk yield history, temperament, teat spacing, and parents' bloodline..."
                className="w-full px-3 py-2.5 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Save & Publish Animal to Marketplace</span>
          </button>
        </form>
      )}

      {/* 4. ORDERS & STATUS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Customer Orders & Livestock Dispatches ({orders.length})
            </h3>
          </div>

          <div className="space-y-3">
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="p-5 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-sm text-white">{ord.id}</span>
                      <span className="text-xs text-neutral-400">• {ord.animalName}</span>
                    </div>
                    <span className="text-[11px] text-neutral-500">Customer: {ord.customerName} ({ord.customerPhone})</span>
                  </div>

                  <div className="sm:text-right">
                    <span className="text-sm font-black text-amber-400 block">Rs. {ord.totalAmount.toLocaleString()}</span>
                    <span className="text-[10px] text-emerald-400">{ord.paymentMethod}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] text-neutral-500 uppercase font-bold block">Delivery Address:</span>
                    <p className="text-neutral-300 max-w-sm">{ord.deliveryAddress}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Order Status Selector */}
                    <div>
                      <span className="text-[10px] text-neutral-400 font-bold block mb-1">Order Status:</span>
                      <select
                        value={ord.orderStatus}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                        className="px-3 py-1.5 rounded-xl bg-neutral-850 border border-neutral-750 text-xs font-bold text-white focus:outline-none"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>

                    {/* Payment Status Selector */}
                    <div>
                      <span className="text-[10px] text-neutral-400 font-bold block mb-1">Payment Status:</span>
                      <select
                        value={ord.paymentStatus}
                        onChange={(e) => updatePaymentStatus(ord.id, e.target.value)}
                        className="px-3 py-1.5 rounded-xl bg-neutral-850 border border-neutral-750 text-xs font-bold text-white focus:outline-none"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Paid">Paid</option>
                        <option value="Failed">Failed</option>
                        <option value="Refunded">Refunded</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. ANALYTICS & KPIS TAB */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
              <span className="text-xs font-bold text-neutral-400 uppercase">Breed Inventory Distribution</span>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between"><span>Sahiwal</span><span className="font-bold text-emerald-400">12 head</span></div>
                <div className="flex justify-between"><span>Nili Ravi Buffalo</span><span className="font-bold text-emerald-400">8 head</span></div>
                <div className="flex justify-between"><span>Cholistani</span><span className="font-bold text-emerald-400">4 head</span></div>
                <div className="flex justify-between"><span>Holstein / Cross</span><span className="font-bold text-emerald-400">8 head</span></div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
              <span className="text-xs font-bold text-neutral-400 uppercase">Average Animal Yield</span>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between"><span>Milch Cow Average</span><span className="font-bold text-amber-400">22.4 L / Day</span></div>
                <div className="flex justify-between"><span>Buffalo Average</span><span className="font-bold text-amber-400">19.5 L / Day</span></div>
                <div className="flex justify-between"><span>Peak Record Producer</span><span className="font-bold text-amber-400">35 L / Day</span></div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
              <span className="text-xs font-bold text-neutral-400 uppercase">Fulfillment Performance</span>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between"><span>Live Transit Success</span><span className="font-bold text-emerald-400">100%</span></div>
                <div className="flex justify-between"><span>Verified Health Reports</span><span className="font-bold text-emerald-400">100%</span></div>
                <div className="flex justify-between"><span>Repeat Buyer Rate</span><span className="font-bold text-emerald-400">84%</span></div>
              </div>
            </div>
          </div>

          {/* 30-Day Historical Milk Price Trends & Production Yield in Analytics */}
          <MilkPriceTrendsChart />
          <DailyMilkProductionChart />
        </div>
      )}

      {/* 6. BRANDING & HERO PHOTOS TAB */}
      {activeTab === 'branding' && (
        <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-5 max-w-2xl mx-auto">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider">
                Farm Branding & Identity
              </h3>
              <p className="text-xs text-neutral-400">
                Update farm name, tagline, founder portrait, and hero imagery.
              </p>
            </div>

            <button
              onClick={handleSaveSettings}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>

          {saveSuccess && (
            <div className="p-3 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-700/60 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Branding and settings updated successfully.</span>
            </div>
          )}

          <div className="space-y-3.5 text-xs">
            <div className="space-y-1">
              <label className="text-neutral-300 font-bold">Farm Full Name</label>
              <input
                type="text"
                value={branding.brandName}
                onChange={(e) => updateBranding({ brandName: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-300 font-bold">Tagline</label>
              <input
                type="text"
                value={branding.tagline}
                onChange={(e) => updateBranding({ tagline: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-300 font-bold">Experience Statement</label>
              <input
                type="text"
                value={branding.experienceYears}
                onChange={(e) => updateBranding({ experienceYears: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-300 font-bold">Founder Photograph URL (Raja Haqnawaz)</label>
              <input
                type="text"
                value={branding.fallbackPhoto}
                onChange={(e) => updateBranding({ fallbackPhoto: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-300 font-bold">Farm Hero Image URL</label>
              <input
                type="text"
                value={branding.farmHeroImage}
                onChange={(e) => updateBranding({ farmHeroImage: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* 7. ABOUT FARM CONTENT EDITOR */}
      {activeTab === 'about' && (
        <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4 max-w-2xl mx-auto">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              Edit 'About Farm' Story & Mission
            </h3>
            <button
              onClick={handleSaveSettings}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="text-neutral-300 font-bold">Story Heading</label>
              <input
                type="text"
                value={aboutContent.heading}
                onChange={(e) => updateAboutContent({ heading: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-300 font-bold">Highlight Title</label>
              <input
                type="text"
                value={aboutContent.highlight}
                onChange={(e) => updateAboutContent({ highlight: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-300 font-bold">Main Story Text</label>
              <textarea
                rows={4}
                value={aboutContent.mainStory}
                onChange={(e) => updateAboutContent({ mainStory: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-300 font-bold">Our Mission</label>
              <textarea
                rows={2}
                value={aboutContent.mission}
                onChange={(e) => updateAboutContent({ mission: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* 8. CONTACT & SOCIAL MEDIA TAB */}
      {activeTab === 'contact' && (
        <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4 max-w-2xl mx-auto">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              Official Contact & Social Media Channels
            </h3>
            <button
              onClick={handleSaveSettings}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
            <div className="space-y-1">
              <label className="text-neutral-300 font-bold">WhatsApp (e.g. 0345 2923974)</label>
              <input
                type="text"
                value={farmContact.whatsapp}
                onChange={(e) => updateContactInfo({ whatsapp: e.target.value, displayWhatsapp: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-300 font-bold">Direct Phone (e.g. 0300 6072070)</label>
              <input
                type="text"
                value={farmContact.phone}
                onChange={(e) => updateContactInfo({ phone: e.target.value, displayPhone: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-300 font-bold">Facebook Page URL</label>
              <input
                type="text"
                value={socialLinks.facebook}
                onChange={(e) => updateSocialLinks({ facebook: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-300 font-bold">TikTok Profile URL</label>
              <input
                type="text"
                value={socialLinks.tiktok}
                onChange={(e) => updateSocialLinks({ tiktok: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none"
              />
            </div>

            <div className="col-span-1 sm:col-span-2 space-y-1">
              <label className="text-neutral-300 font-bold">Farm Physical Address</label>
              <input
                type="text"
                value={farmContact.farmAddress}
                onChange={(e) => updateContactInfo({ farmAddress: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-300 font-bold">Latitude</label>
              <input
                type="number"
                step="0.0001"
                value={farmContact.latitude}
                onChange={(e) => updateContactInfo({ latitude: Number(e.target.value) })}
                className="w-full px-3 py-2.5 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-300 font-bold">Longitude</label>
              <input
                type="number"
                step="0.0001"
                value={farmContact.longitude}
                onChange={(e) => updateContactInfo({ longitude: Number(e.target.value) })}
                className="w-full px-3 py-2.5 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Edit Animal Modal if editing */}
      {editingAnimal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleEditAnimalSave} className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-sm font-bold text-white">Edit Animal ({editingAnimal.id})</h3>
              <button
                type="button"
                onClick={() => setEditingAnimal(null)}
                className="p-1 text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-neutral-400 font-bold block mb-1">Name</label>
                <input
                  type="text"
                  value={editingAnimal.name}
                  onChange={(e) => setEditingAnimal({ ...editingAnimal, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-850 border border-neutral-750 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-400 font-bold block mb-1">Price (PKR)</label>
                  <input
                    type="number"
                    value={editingAnimal.price}
                    onChange={(e) => setEditingAnimal({ ...editingAnimal, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-850 border border-neutral-750 text-white"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 font-bold block mb-1">Milk (L/day)</label>
                  <input
                    type="number"
                    value={editingAnimal.milkProductionPerDay}
                    onChange={(e) => setEditingAnimal({ ...editingAnimal, milkProductionPerDay: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-850 border border-neutral-750 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-neutral-400 font-bold block mb-1">Availability</label>
                <select
                  value={editingAnimal.availability}
                  onChange={(e) => setEditingAnimal({ ...editingAnimal, availability: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-850 border border-neutral-750 text-white font-bold"
                >
                  <option value="Available">Available</option>
                  <option value="Reserved">Reserved</option>
                  <option value="Sold">Sold</option>
                </select>
              </div>

              {/* Edit 5-Angle Photos */}
              <div className="pt-2">
                <CattlePhotoUploadSection
                  angles={editingAnimal.angles || {}}
                  onChange={(updatedAngles) => setEditingAnimal({
                    ...editingAnimal,
                    angles: updatedAngles,
                    imageUrl: updatedAngles.body || updatedAngles.face || editingAnimal.imageUrl
                  })}
                  breed={editingAnimal.breed}
                  gender={editingAnimal.gender}
                  type={editingAnimal.type}
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingAnimal(null)}
                className="flex-1 py-2.5 rounded-xl bg-neutral-800 text-neutral-300 font-semibold text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
