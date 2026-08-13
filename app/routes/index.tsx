import { createFileRoute } from '@tanstack/react-router';
import { useState, useMemo } from 'react';
import { VideoPlayer } from '../components/VideoPlayer';
import { channels, categories } from '../lib/channels';
import { Radio, Tv } from 'lucide-react';

export const Route = createFileRoute('/')({
  component: HomeComponent,
});

function HomeComponent() {
  const [selectedId, setSelectedId] = useState('1');
  const [activeCat, setActiveCat] = useState('الكل');

  const active = useMemo(() => channels.find((c) => c.id === selectedId)!, [selectedId]);

  const filtered = useMemo(() => {
    if (activeCat === 'الكل') return channels;
    return channels.filter((c) => c.category === activeCat);
  }, [activeCat]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* المشغل الثابت */}
      <div className="sticky top-0 z-50 bg-zinc-950/95 backdrop-blur border-b border-zinc-800">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
              <Radio className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-sm font-bold">بث مباشر</h1>
            <span className="mr-auto text-xs text-emerald-400 font-bold">{active.name}</span>
          </div>
          <VideoPlayer src={active.url} type={active.type} />
        </div>
      </div>

      {/* القنوات */}
      <div className="max-w-3xl mx-auto px-4 py-6 pb-20">
        {/* فلتر */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
          {['الكل', ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap border ${
                activeCat === cat
                  ? 'bg-zinc-800 border-zinc-600 text-white'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400'
              }`}
            >
              {cat === 'الكل' ? `الكل (${channels.length})` : cat}
            </button>
          ))}
        </div>

        {/* قائمة القنوات */}
        <div className="flex flex-col gap-3">
          {filtered.map((ch) => (
            <button
              key={ch.id}
              onClick={() => setSelectedId(ch.id)}
              className={`flex items-center gap-4 p-4 rounded-xl border text-right transition-all ${
                selectedId === ch.id
                  ? 'bg-zinc-800 border-zinc-600 shadow-lg'
                  : 'bg-zinc-900/40 border-zinc-800 hover:bg-zinc-900'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  selectedId === ch.id ? 'bg-zinc-700 text-white' : 'bg-zinc-800 text-zinc-500'
                }`}
              >
                <Tv className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <span className={`text-sm font-bold block ${selectedId === ch.id ? 'text-white' : 'text-zinc-300'}`}>
                  {ch.name}
                </span>
                <span className="text-xs text-zinc-500">{ch.category}</span>
              </div>
              {selectedId === ch.id && (
                <span className="text-[10px] font-bold text-emerald-500">مباشر</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
