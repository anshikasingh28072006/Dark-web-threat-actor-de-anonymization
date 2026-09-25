import React, { useState } from 'react';
import { 
  Clock, 
  Sun, 
  Moon, 
  Globe, 
  Calendar, 
  Info, 
  Activity, 
  TrendingDown, 
  TrendingUp,
  MapPin,
  HelpCircle
} from 'lucide-react';
import { ThreatActorProfile } from '../types';

interface DiurnalLabViewProps {
  profile: ThreatActorProfile;
}

export const DiurnalLabView: React.FC<DiurnalLabViewProps> = ({ profile }) => {
  const diurnal = profile?.diurnal || {
    hourly: Array(24).fill(0),
    sleepWindow: [2, 8],
    primaryTimezone: 'UTC+0',
    varianceScore: 0
  };
  const hourly = diurnal.hourly || Array(24).fill(0); // 24 numbers

  // User interactive scrub hour (0-23)
  const [selectedHour, setSelectedHour] = useState<number>(14);

  const maxVal = Math.max(...hourly, 1);
  const sleepStart = diurnal.sleepWindow ? diurnal.sleepWindow[0] : 2;
  const sleepEnd = diurnal.sleepWindow ? diurnal.sleepWindow[1] : 8;

  // Helper to check if hour falls in sleep window
  const isSleepHour = (h: number) => {
    if (sleepStart <= sleepEnd) {
      return h >= sleepStart && h < sleepEnd;
    } else {
      return h >= sleepStart || h < sleepEnd;
    }
  };

  // World clock calculations for selected hour
  const timezones = [
    { city: 'London (UTC)', offset: 0, flag: '🇬🇧' },
    { city: 'Moscow (MSK, UTC+3)', offset: 3, flag: '🇷🇺', isTarget: profile.locale.includes('Russia') || profile.locale.includes('Moscow') },
    { city: 'New Delhi (IST, UTC+5:30)', offset: 5.5, flag: '🇮🇳' },
    { city: 'Singapore (SGT, UTC+8)', offset: 8, flag: '🇸🇬', isTarget: profile.locale.includes('Singapore') || profile.locale.includes('Asia') },
    { city: 'New York (EDT, UTC-4)', offset: -4, flag: '🇺🇸' },
  ];

  const formatLocalTime = (utcHour: number, offset: number) => {
    let localHours = (utcHour + offset) % 24;
    if (localHours < 0) localHours += 24;
    const h = Math.floor(localHours);
    const m = (localHours % 1) * 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 p-4 lg:p-6 space-y-6 select-none">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-semibold flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" />
              CIRCADIAN CHRONOBIOLOGY LAB
            </span>
            <span className="text-xs text-slate-400">24-Hour Diurnal Posting Distributions</span>
          </div>
          <h2 className="text-lg font-bold text-slate-100">
            Biological Sleep Curve & Inferred Timezone Profiler
          </h2>
          <p className="text-xs text-slate-400 mt-0.5 max-w-2xl">
            Human operators cannot escape the physiological requirement for 6–8 hours of daily sleep. By aggregating timestamped forum posts, we isolate the sleep trough and identify real-world physical longitude.
          </p>
        </div>

        {/* Quick Result Badge */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
              Inferred Territory:
            </span>
            <span className="text-xs font-bold text-amber-300">
              {profile.locale}
            </span>
            <span className="text-[10px] font-mono text-sky-400 block font-semibold">
              Offset: {diurnal.inferredOffset} (Confidence: {diurnal.confidence * 100}%)
            </span>
          </div>
        </div>
      </div>

      {/* Primary 24-Hour Circadian Chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-slate-100">
              24-Hour Forum Posting Distribution (UTC Hours 00:00 to 23:00)
            </h3>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-purple-400">
              <span className="w-2.5 h-2.5 rounded bg-purple-500/30 border border-purple-500" />
              Sleep Trough ({String(sleepStart).padStart(2, '0')}:00-{String(sleepEnd).padStart(2, '0')}:00 UTC)
            </span>
            <span className="flex items-center gap-1.5 text-amber-400">
              <span className="w-2.5 h-2.5 rounded bg-amber-500/50" />
              Active Hours
            </span>
          </div>
        </div>

        {/* Bar Chart Container */}
        <div className="pt-8 pb-2">
          <div className="h-44 flex items-end gap-1.5 sm:gap-2 px-2 border-b border-slate-800">
            {hourly.map((val, h) => {
              const heightPct = (val / maxVal) * 100;
              const inSleep = isSleepHour(h);
              const isSelected = selectedHour === h;

              return (
                <div
                  key={h}
                  onClick={() => setSelectedHour(h)}
                  className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
                >
                  {/* Tooltip on hover/active */}
                  <div className={`absolute -top-7 text-[10px] font-mono px-1.5 py-0.5 rounded transition-all pointer-events-none whitespace-nowrap z-10 ${
                    isSelected
                      ? 'bg-sky-500 text-white font-bold opacity-100'
                      : 'bg-slate-800 text-slate-300 opacity-0 group-hover:opacity-100'
                  }`}>
                    {val} posts
                  </div>

                  {/* The Bar */}
                  <div
                    className={`w-full rounded-t transition-all duration-200 ${
                      isSelected
                        ? 'bg-sky-400 ring-2 ring-sky-300'
                        : inSleep
                        ? 'bg-purple-900/60 hover:bg-purple-700/80 border-t-2 border-purple-500'
                        : 'bg-amber-500/70 hover:bg-amber-400'
                    }`}
                    style={{ height: `${Math.max(heightPct, 6)}%` }}
                  />

                  {/* Sleep marker dot */}
                  {inSleep && (
                    <div className="absolute bottom-1 w-1 h-1 rounded-full bg-purple-400 pointer-events-none" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Hour Labels */}
          <div className="flex gap-1.5 sm:gap-2 px-2 pt-2 text-[10px] font-mono text-slate-500">
            {hourly.map((_, h) => (
              <div
                key={h}
                onClick={() => setSelectedHour(h)}
                className={`flex-1 text-center cursor-pointer transition-colors ${
                  selectedHour === h ? 'text-sky-400 font-bold' : 'hover:text-slate-300'
                }`}
              >
                {h % 3 === 0 ? String(h).padStart(2, '0') : '·'}
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Scrub Slider */}
        <div className="pt-2 flex items-center gap-4 bg-slate-950 p-3 rounded-xl border border-slate-850">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <span>SCRUB HOUR:</span>
            <span className="px-2 py-0.5 rounded bg-sky-950 text-sky-400 font-bold border border-sky-800">
              {String(selectedHour).padStart(2, '0')}:00 UTC
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={23}
            value={selectedHour}
            onChange={e => setSelectedHour(Number(e.target.value))}
            className="flex-1 accent-sky-500 cursor-pointer"
          />

          <span className="text-xs font-mono text-slate-400">
            {isSleepHour(selectedHour) ? (
              <span className="text-purple-400 flex items-center gap-1 font-semibold">
                <Moon className="w-3.5 h-3.5" /> Sleep Window
              </span>
            ) : (
              <span className="text-amber-400 flex items-center gap-1 font-semibold">
                <Sun className="w-3.5 h-3.5" /> Active Window
              </span>
            )}
          </span>
        </div>
      </div>

      {/* World Clock Mapping for the Selected Hour */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-sky-400" />
            <h3 className="text-sm font-bold text-slate-100">
              World Clock Alignment for {String(selectedHour).padStart(2, '0')}:00 UTC
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Correlating sleep patterns with real-world local day/night cycles
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {timezones.map((tz, index) => {
            const localTimeStr = formatLocalTime(selectedHour, tz.offset);
            const localH = parseInt(localTimeStr.split(':')[0], 10);
            const isNight = localH >= 23 || localH <= 6;

            return (
              <div
                key={index}
                className={`p-3.5 rounded-xl border transition-all ${
                  tz.isTarget
                    ? 'bg-amber-950/40 border-amber-500 ring-2 ring-amber-500/20 shadow-lg'
                    : 'bg-slate-950 border-slate-850'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-base">{tz.flag}</span>
                  {tz.isTarget && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                      LIKELY MATCH
                    </span>
                  )}
                </div>
                <h4 className="text-xs font-bold text-slate-200 truncate">{tz.city}</h4>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-xl font-bold font-mono text-slate-100">
                    {localTimeStr}
                  </span>
                  <span className="text-xs text-slate-400">
                    {isNight ? (
                      <span className="text-indigo-400 flex items-center gap-1">
                        <Moon className="w-3 h-3" /> Night
                      </span>
                    ) : (
                      <span className="text-amber-400 flex items-center gap-1">
                        <Sun className="w-3 h-3" /> Day
                      </span>
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Explainer Card */}
      <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 flex items-start gap-3">
        <HelpCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 space-y-1 leading-relaxed">
          <h4 className="font-bold text-amber-300">How Circadian Trough Detection Works</h4>
          <p>
            By sliding a continuous 5-hour window across 24 hours of timestamped forum posts, the algorithm searches for the minimum variance interval (the "sleep trough"). Because standard sleep in temperate zones occurs between 23:00 and 08:00 local time, observing a lull from 02:00 to 07:00 UTC mathematically points to an operator situated in UTC+03:00 (e.g., Moscow, Minsk) or UTC+04:00 (Samara, Tbilisi).
          </p>
        </div>
      </div>

    </div>
  );
};
