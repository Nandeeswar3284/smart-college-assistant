import React, { useState } from 'react';
import {
  MapPin,
  Search,
  Monitor,
  Building2,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  Compass,
  Filter,
  Navigation,
} from 'lucide-react';
import { CAMPUS_BUILDINGS, CAMPUS_ROOMS, CAMPUS_LABS } from '../../mockData';

export const CampusMapView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'map' | 'empty-rooms' | 'labs'>('map');
  const [selectedBuildingId, setSelectedBuildingId] = useState<string>(CAMPUS_BUILDINGS[0].id);

  // Empty Classroom Finder Filters
  const [filterBuilding, setFilterBuilding] = useState<string>('All');
  const [filterFloor, setFilterFloor] = useState<string>('All');
  const [filterTime, setFilterTime] = useState<string>('Now');

  const selectedBuilding = CAMPUS_BUILDINGS.find(b => b.id === selectedBuildingId) || CAMPUS_BUILDINGS[0];

  const filteredRooms = CAMPUS_ROOMS.filter(r => {
    const matchBuilding = filterBuilding === 'All' || r.building.includes(filterBuilding);
    const matchFloor = filterFloor === 'All' || r.floor.toString() === filterFloor;
    return matchBuilding && matchFloor;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
            <Compass className="w-4 h-4" />
            <span>Digital Campus Infrastructure</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
            Campus Navigation & Smart Facilities
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Locate lecture halls, query real-time empty classrooms for study sessions, and monitor lab occupancy.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('map')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'map'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Campus Map
          </button>
          <button
            onClick={() => setActiveTab('empty-rooms')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'empty-rooms'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Find Empty Classroom
          </button>
          <button
            onClick={() => setActiveTab('labs')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'labs'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Lab Availability Tracker
          </button>
        </div>
      </div>

      {/* TAB 1: Campus Blueprint / Interactive Map */}
      {activeTab === 'map' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Interactive Visual Blueprint Stage (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-indigo-500" />
                <span>Interactive Campus Ground Layout</span>
              </h3>
              <span className="text-[11px] text-slate-400">Click any block to inspect facilities</span>
            </div>

            {/* Campus SVG Map Simulation */}
            <div className="relative w-full aspect-[16/10] bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-inner flex items-center justify-center p-4">
              {/* Grid pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

              {/* Pathways */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 120,180 L 280,180 L 400,240 L 400,320" stroke="#475569" strokeWidth="6" strokeDasharray="8 6" fill="none" opacity="0.4" />
                <path d="M 280,180 L 280,340" stroke="#475569" strokeWidth="6" strokeDasharray="8 6" fill="none" opacity="0.4" />
              </svg>

              {/* Interactive Building Nodes */}
              {CAMPUS_BUILDINGS.map(bld => {
                const isSelected = bld.id === selectedBuildingId;
                return (
                  <button
                    key={bld.id}
                    onClick={() => setSelectedBuildingId(bld.id)}
                    style={{ left: `${bld.coordinates.x}%`, top: `${bld.coordinates.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-2xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 border-white text-white shadow-xl scale-110 z-20 ring-4 ring-indigo-500/30'
                        : 'bg-slate-800/90 hover:bg-slate-800 border-slate-700 text-slate-200 shadow-md hover:scale-105 z-10'
                    }`}
                  >
                    <Building2 className={`w-4 h-4 sm:w-5 sm:h-5 ${isSelected ? 'text-white' : 'text-indigo-400'}`} />
                    <span className="text-[10px] font-bold tracking-tight whitespace-nowrap">{bld.code}</span>
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                Academic & Faculty Blocks
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Computing Research Labs
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                Library & Student Center
              </span>
            </div>
          </div>

          {/* Building Inspector Details (5 cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                    {selectedBuilding.code}
                  </span>
                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mt-1">
                    {selectedBuilding.name}
                  </h3>
                </div>
                <span className="text-xs font-mono font-semibold text-slate-500">
                  {selectedBuilding.floors} Floors Total
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                {selectedBuilding.description}
              </p>

              <div className="mt-5 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Key Facilities & Chambers
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {selectedBuilding.facilities.map((fac, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2"
                    >
                      <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{fac}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 text-xs text-indigo-900 dark:text-indigo-200 flex items-center justify-between">
              <span>Need directions from your current classroom?</span>
              <button
                onClick={() => alert(`Directions plotted to ${selectedBuilding.name} via Central Lawn corridor.`)}
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Navigate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Find Empty Classroom */}
      {activeTab === 'empty-rooms' && (
        <div className="space-y-5">
          {/* Filter Controls Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Filter Building
                </label>
                <select
                  value={filterBuilding}
                  onChange={e => setFilterBuilding(e.target.value)}
                  className="px-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium"
                >
                  <option value="All">All Campus Buildings</option>
                  <option value="Tech Block A">Tech Block A</option>
                  <option value="Science">Science & Innovation</option>
                  <option value="Library">Central Library</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Floor Level
                </label>
                <select
                  value={filterFloor}
                  onChange={e => setFilterFloor(e.target.value)}
                  className="px-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium"
                >
                  <option value="All">All Floors</option>
                  <option value="1">Floor 1 (Ground)</option>
                  <option value="2">Floor 2</option>
                  <option value="3">Floor 3</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Time Slot
                </label>
                <select
                  value={filterTime}
                  onChange={e => setFilterTime(e.target.value)}
                  className="px-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium"
                >
                  <option value="Now">Right Now (Current Hour)</option>
                  <option value="11:30">11:30 AM - 12:30 PM</option>
                  <option value="01:30">01:30 PM - 03:30 PM</option>
                  <option value="04:00">04:00 PM - 06:00 PM</option>
                </select>
              </div>
            </div>

            <div className="text-xs text-slate-400">
              Showing <strong className="text-slate-800 dark:text-slate-200 font-mono">{filteredRooms.length}</strong> rooms matching schedule
            </div>
          </div>

          {/* Rooms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRooms.map(room => (
              <div
                key={room.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-base font-black text-slate-800 dark:text-slate-100">
                      {room.roomNumber}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                        room.isAvailable
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {room.isAvailable ? 'Vacant / Available' : 'Occupied'}
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {room.building} • Floor {room.floor}
                  </div>

                  <div className="mt-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                    <div className="flex items-center justify-between">
                      <span>Room Type:</span>
                      <strong className="text-slate-800 dark:text-slate-100">{room.type}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Seating Capacity:</span>
                      <strong className="text-slate-800 dark:text-slate-100">{room.capacity} seats</strong>
                    </div>
                    {room.currentActivity && (
                      <div className="text-rose-600 dark:text-rose-400 font-medium pt-1 border-t border-slate-200 dark:border-slate-700">
                        {room.currentActivity}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {room.nextAvailableTime}
                  </span>
                  {room.isAvailable && (
                    <button
                      onClick={() => alert(`Classroom ${room.roomNumber} marked for group study session!`)}
                      className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-semibold text-[11px] hover:bg-indigo-100"
                    >
                      Reserve Seat
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Lab Availability Tracker */}
      {activeTab === 'labs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CAMPUS_LABS.map(lab => {
            const percentAvailable = Math.round((lab.availableSystems / lab.totalSystems) * 100);
            return (
              <div
                key={lab.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {lab.code}
                    </span>
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        lab.status === 'Available'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      }`}
                    >
                      {lab.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
                    {lab.name}
                  </h3>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {lab.building} • Floor {lab.floor} • In-Charge: {lab.inCharge}
                  </div>

                  {/* Real-time System Availability Bar */}
                  <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                        <Monitor className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Workstations Free:</span>
                      </span>
                      <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                        {lab.availableSystems} / {lab.totalSystems} Free ({percentAvailable}%)
                      </span>
                    </div>

                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          percentAvailable > 30 ? 'bg-emerald-500' : percentAvailable > 0 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${percentAvailable}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {lab.nextSlot}
                  </span>
                  <button
                    onClick={() => alert(`Workstation reserved at ${lab.name} for 1 hour.`)}
                    disabled={lab.availableSystems === 0}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-semibold text-xs shadow-xs"
                  >
                    Walk-in Access
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
