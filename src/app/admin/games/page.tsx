'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Plus,
  Trash2,
  Lock,
  Unlock,
  Edit2,
  X,
  Gamepad2,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { useMemo, useState } from 'react';

type GameStatus = 'live' | 'pending' | 'archived';

type Game = {
  id: string;
  name: string;
  publisher: string;
  price: string;
  status: GameStatus;
  stock: string;
  locked?: boolean;
};

type ModalMode = 'create' | 'edit';

const uid = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export default function GameManagement() {
  const [games, setGames] = useState<Game[]>([
    { id: '1', name: 'God of War', publisher: 'PlayStation PC LLC', price: '6,000 DA', status: 'live', stock: 'Unlimited', locked: false },
    { id: '2', name: 'Elden Ring', publisher: 'FromSoftware Inc.', price: '10,000 DA', status: 'live', stock: 'Unlimited', locked: false },
    { id: '3', name: 'Red Dead Redemption 2', publisher: 'Rockstar Games', price: '8,000 DA', status: 'live', stock: 'Unlimited', locked: false },
    { id: '4', name: 'Starfield', publisher: 'Bethesda', price: '7,000 DA', status: 'pending', stock: 'Unlimited', locked: false },
    { id: '5', name: 'Hades II', publisher: 'Supergiant', price: '3,200 DA', status: 'archived', stock: '0', locked: true },
    { id: '6', name: 'Cyberpunk 2077', publisher: 'CD PROJEKT RED', price: '7,000 DA', status: 'live', stock: 'Unlimited', locked: false },
  ]);

  const [query, setQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [modalMode, setModalMode] = useState<ModalMode>('edit');

  const [editName, setEditName] = useState('');
  const [editPublisher, setEditPublisher] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editStock, setEditStock] = useState('');
  const [editStatus, setEditStatus] = useState<GameStatus>('pending');

  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1800);
  };

    const getStatusBadge = (status: GameStatus) => {
    const styles: Record<GameStatus, string> = {
      live: 'bg-[#5ba32b]/10 text-[#5ba32b] border-[#5ba32b]/20',
      pending: 'bg-[#f5c518]/10 text-[#f5c518] border-[#f5c518]/20',
      archived: 'bg-[#d94141]/10 text-[#d94141] border-[#d94141]/20',
    };
    return styles[status];
  };

  const filteredGames = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return games;
    return games.filter((g) => {
      return (
        g.name.toLowerCase().includes(q) ||
        g.publisher.toLowerCase().includes(q) ||
        g.status.toLowerCase().includes(q)
      );
    });
  }, [games, query]);

  const openCreate = () => {
    setModalMode('create');
    setSelectedGame(null);
    setEditName('');
    setEditPublisher('');
    setEditPrice('');
    setEditStock('Unlimited');
    setEditStatus('pending');
  };

  const openEdit = (game: Game) => {
    if (game.locked) {
      showToast('This game is locked.');
      return;
    }
    setModalMode('edit');
    setSelectedGame(game);
    setEditName(game.name);
    setEditPublisher(game.publisher);
    setEditPrice(game.price);
    setEditStock(game.stock);
    setEditStatus(game.status);
  };

  const closeModal = () => {
    setSelectedGame(null);

  };

  const validateForm = () => {
    if (!editName.trim()) return 'Name is required';
    if (!editPublisher.trim()) return 'Publisher is required';
    if (!editPrice.trim()) return 'Price is required';
    if (!editStock.trim()) return 'Stock is required';
    return null;
  };

  const saveGame = () => {
    const err = validateForm();
    if (err) {
      showToast(err);
      return;
    }

    if (modalMode === 'create') {
      const newGame: Game = {
        id: uid(),
        name: editName.trim(),
        publisher: editPublisher.trim(),
        price: editPrice.trim(),
        stock: editStock.trim(),
        status: editStatus,
        locked: false,
      };
      setGames((prev) => [newGame, ...prev]);
      showToast('Game added');
      closeModal();
      return;
    }

    if (!selectedGame) return;

    setGames((prev) =>
      prev.map((g) =>
        g.id === selectedGame.id
          ? {
              ...g,
              name: editName.trim(),
              publisher: editPublisher.trim(),
              price: editPrice.trim(),
              stock: editStock.trim(),
              status: editStatus,
            }
          : g
      )
    );

    showToast('Changes saved');
    closeModal();
  };

  const toggleLock = (game: Game) => {
    setGames((prev) =>
      prev.map((g) =>
        g.id === game.id ? { ...g, locked: !g.locked } : g
      )
    );
    showToast(game.locked ? 'Unlocked' : 'Locked');
  };

  const deleteGame = (game: Game) => {
    if (game.locked) {
      showToast('Unlock to delete');
      return;
    }
    const ok = window.confirm(`Delete "${game.name}"?`);
    if (!ok) return;
    setGames((prev) => prev.filter((g) => g.id !== game.id));
    showToast('Deleted');
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0e141b] text-[#c7d5e0]">
      

      <div className="relative p-8 md:p-12 pt-24 w-full">
        <div className="flex justify-between items-end mb-10 flex-wrap gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-10 bg-[#66c0f4] rounded-sm" />
              <p className="text-[#8f98a0] font-semibold uppercase tracking-[0.35em] text-[11px]">
                Inventory Management
              </p>
            </div>

            <h1 className="text-5xl font-extrabold tracking-tight leading-none uppercase text-[#c7d5e0]">
              Game Catalog
            </h1>

            <p className="mt-3 text-sm text-white/60 max-w-xl">
              Manage your game listings with fast edits, lock protection, and real-time search.
            </p>
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8f98a0]" size={18} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search name / publisher / status..."
                className="bg-[#1b2838] border border-[#2a3f55] rounded-sm pl-12 pr-5 py-3.5 text-sm text-[#c7d5e0] placeholder-[#8f98a0] focus:border-[#66c0f4]/60 outline-none transition-all w-72 shadow-inner"
              />
            </div>

            <button
              onClick={openCreate}
              className="bg-[#66c0f4] text-[#0e141b] px-6 py-3.5 rounded-sm font-bold uppercase text-xs tracking-wider flex items-center gap-2 hover:bg-[#1999ff] transition-all"
            >
              <Plus size={18} /> Add Game
            </button>
          </div>
        </div>

        
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-sm border border-[#2a3f55] bg-[#16202d] p-5">
            <p className="text-[11px] uppercase tracking-[0.35em] text-[#8f98a0] font-semibold">Total</p>
            <p className="mt-2 text-2xl font-extrabold text-white">{games.length}</p>
          </div>
          <div className="rounded-sm border border-[#2a3f55] bg-[#16202d] p-5">
            <p className="text-[11px] uppercase tracking-[0.35em] text-[#8f98a0] font-semibold">Live</p>
            <p className="mt-2 text-2xl font-extrabold text-[#66c0f4]">
              {games.filter((g) => g.status === 'live').length}
            </p>
          </div>
          <div className="rounded-sm border border-[#2a3f55] bg-[#16202d] p-5">
            <p className="text-[11px] uppercase tracking-[0.35em] text-[#8f98a0] font-semibold">Locked</p>
            <p className="mt-2 text-2xl font-extrabold text-[#f5c518]">
              {games.filter((g) => g.locked).length}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {filteredGames.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="relative overflow-hidden rounded-sm border border-[#2a3f55] bg-[#16202d] p-5 shadow-xl transition-all duration-300 hover:border-[#66c0f4]/40"
            >
              

              
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2.5 py-1 rounded-sm text-[9px] font-bold uppercase tracking-wider border ${getStatusBadge(game.status)}`}>
                  {game.status}
                </span>

                {game.locked ? (
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-[#8f98a0]/60">
                    <Lock size={12} /> Locked
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-[#8f98a0]/40">
                    <Unlock size={12} /> Unlocked
                  </span>
                )}
              </div>

              
              <div className="mb-5 rounded-sm border border-[#2a3f55] bg-[#16202d]/50 p-4">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-sm bg-[#1b2838] border border-[#2a3f55] flex items-center justify-center">
                    <Gamepad2 className="text-[#66c0f4]" size={20} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-extrabold uppercase leading-tight truncate text-white">{game.name}</h3>
                    <p className="text-[11px] text-[#8f98a0] font-semibold uppercase tracking-wider truncate">{game.publisher}</p>
                  </div>
                </div>
              </div>

              
              <div className="flex justify-between items-end mb-5">
                <div>
                  <p className="text-[10px] text-[#8f98a0] font-bold uppercase tracking-wider mb-1">Price</p>
                  <p className="text-2xl font-extrabold text-[#5ba32b]">
                    {game.price}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-[#8f98a0] font-bold uppercase tracking-wider mb-1">Stock</p>
                  <p className="text-sm font-bold text-[#c7d5e0]">{game.stock}</p>
                </div>
              </div>

              
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => openEdit(game)}
                  disabled={!!game.locked}
                  className={`py-3 rounded-sm border border-[#2a3f55] transition-all flex items-center justify-center ${
                    game.locked
                      ? 'bg-[#1b2838]/50 text-white/10 cursor-not-allowed border-transparent'
                      : 'bg-[#1b2838] hover:bg-[#2a3f55] text-[#c7d5e0]'
                  }`}
                  title={game.locked ? 'Unlock to edit' : 'Edit'}
                >
                  <Edit2 size={16} />
                </button>

                <button
                  onClick={() => toggleLock(game)}
                  className="py-3 rounded-sm bg-[#1b2838] border border-[#2a3f55] hover:bg-[#2a3f55] text-[#c7d5e0] transition-all flex items-center justify-center"
                  title={game.locked ? 'Unlock' : 'Lock'}
                >
                  {game.locked ? <Unlock size={16} /> : <Lock size={16} />}
                </button>

                <button
                  onClick={() => deleteGame(game)}
                  disabled={!!game.locked}
                  className={`py-3 rounded-sm border transition-all flex items-center justify-center ${
                    game.locked
                      ? 'bg-[#1b2838]/50 text-white/10 border-transparent cursor-not-allowed'
                      : 'bg-[#1b2838] border-[#2a3f55] hover:bg-[#d94141]/20 hover:border-[#d94141]/30 hover:text-[#d94141] text-[#c7d5e0]'
                  }`}
                  title={game.locked ? 'Unlock to delete' : 'Delete'}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="mt-14 text-center text-white/60">
            No games match your search.
          </div>
        )}
      </div>

      
      <AnimatePresence>
        {(modalMode === 'create' || selectedGame) && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => {

              if (e.target === e.currentTarget) closeModal();
            }}
          >
            <motion.div
              className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0b0b10] p-6 shadow-[0_0_90px_-30px_rgba(99,102,241,0.45)]"
              initial={{ scale: 0.96, y: 18, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.97, y: 12, opacity: 0 }}
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <p className="text-xs text-[#a5b4fc] font-semibold uppercase tracking-[0.35em]">
                    {modalMode === 'create' ? 'Add Game' : 'Edit Game'}
                  </p>
                  <h2 className="text-2xl font-extrabold uppercase leading-tight">
                    {modalMode === 'create' ? 'New Listing' : selectedGame?.name}
                  </h2>
                  <p className="text-[11px] text-white/45 font-semibold uppercase tracking-wider">
                    {modalMode === 'create' ? 'Create a new entry' : selectedGame?.publisher}
                  </p>
                </div>

                <button
                  onClick={closeModal}
                  className="p-2 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/10 transition"
                  aria-label="Close"
                >
                  <X size={18} className="text-white/80" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-[#8f98a0] font-bold uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="e.g. GTA V"
                    className="mt-2 w-full bg-[#1b2838] border border-[#2a3f55] rounded-sm px-4 py-3 text-sm text-white placeholder-[#8f98a0]/50 focus:border-[#66c0f4]/60 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#8f98a0] font-bold uppercase tracking-wider">
                    Publisher
                  </label>
                  <input
                    value={editPublisher}
                    onChange={(e) => setEditPublisher(e.target.value)}
                    placeholder="e.g. Rockstar"
                    className="mt-2 w-full bg-[#1b2838] border border-[#2a3f55] rounded-sm px-4 py-3 text-sm text-white placeholder-[#8f98a0]/50 focus:border-[#66c0f4]/60 outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-[#8f98a0] font-bold uppercase tracking-wider">
                      Price
                    </label>
                    <input
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      placeholder="e.g. 5,500 DA"
                      className="mt-2 w-full bg-[#1b2838] border border-[#2a3f55] rounded-sm px-4 py-3 text-sm text-white placeholder-[#8f98a0]/50 focus:border-[#66c0f4]/60 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-[#8f98a0] font-bold uppercase tracking-wider">
                      Stock
                    </label>
                    <input
                      value={editStock}
                      onChange={(e) => setEditStock(e.target.value)}
                      placeholder="Unlimited / 0 / 25"
                      className="mt-2 w-full bg-[#1b2838] border border-[#2a3f55] rounded-sm px-4 py-3 text-sm text-white placeholder-[#8f98a0]/50 focus:border-[#66c0f4]/60 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-[#8f98a0] font-bold uppercase tracking-wider">
                    Status
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as GameStatus)}
                    className="mt-2 w-full bg-[#1b2838] border border-[#2a3f55] rounded-sm px-4 py-3 text-sm text-white focus:border-[#66c0f4]/60 outline-none transition-all"
                  >
                    <option value="live">live</option>
                    <option value="pending">pending</option>
                    <option value="archived">archived</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={closeModal}
                  className="flex-1 bg-[#1b2838] border border-[#2a3f55] py-3 rounded-sm hover:bg-[#2a3f55] text-[#c7d5e0] transition-all font-bold uppercase text-xs tracking-wider"
                >
                  Cancel
                </button>

                <button
                  onClick={saveGame}
                  className="flex-1 bg-[#66c0f4] text-[#0e141b] py-3 rounded-sm font-bold uppercase text-xs tracking-wider hover:bg-[#1999ff] transition-all inline-flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={16} />
                  Save
                </button>
              </div>

              {modalMode === 'edit' && selectedGame?.locked && (
                <div className="mt-4 text-xs text-amber-200/80 flex items-center gap-2">
                  <AlertTriangle size={14} />
                  This game is locked. Unlock it to edit.
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      
      <AnimatePresence>
        {toast && (
          <motion.div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] rounded-xl border border-white/10 bg-black/60 backdrop-blur px-4 py-3 text-sm text-white/90 shadow-lg"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
