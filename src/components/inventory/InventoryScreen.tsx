import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { 
  Boxes, 
  Plus, 
  Minus, 
  AlertTriangle, 
  Calendar, 
  CheckCircle2, 
  Search, 
  ShieldAlert,
  ArrowUpDown,
  Building
} from 'lucide-react';
import { InventoryItem } from '../../types';

export const InventoryScreen: React.FC = () => {
  const { inventory, updateStock, addInventoryItem, currentUser } = useApp();
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Item State
  const [name, setName] = useState('');
  const [category, setCategory] = useState<InventoryItem['category']>('Reagen Kimia');
  const [currentStock, setCurrentStock] = useState(10);
  const [minStock, setMinStock] = useState(3);
  const [unit, setUnit] = useState('Botol');
  const [storageLocation, setStorageLocation] = useState('Rak Reagen Utama');
  const [lotNumber, setLotNumber] = useState('LOT-2026-X');
  const [expiryDate, setExpiryDate] = useState('2028-12-31');
  const [supplierName, setSupplierName] = useState('Merck / Sysmex');
  const [pricePerUnit, setPricePerUnit] = useState(500000);

  const categories = ['ALL', 'Reagen Kimia', 'Standar Kalibrasi', 'Kultur Media', 'Bahan Kimia Murni', 'Consumables & Tips'];

  const filteredItems = inventory.filter(item => {
    if (filterCategory === 'ALL') return true;
    return item.category === filterCategory;
  });

  const lowStockCount = inventory.filter(i => i.status === 'Low' || i.status === 'Expired').length;

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    addInventoryItem({
      code: `INV-${Date.now().toString().slice(-4)}`,
      name,
      category,
      currentStock,
      minStock,
      unit,
      storageLocation,
      lotNumber,
      expiryDate,
      supplierName,
      pricePerUnit,
      status: currentStock <= minStock ? 'Low' : 'Normal',
      lastRestocked: '2026-08-17'
    });

    setShowAddModal(false);
    setName('');
  };

  return (
    <div className="p-4 space-y-4 pb-24">
      {/* Top Banner Alert */}
      <div className="bg-[#272729] text-white rounded-[4px] p-5 shadow-apple-product relative overflow-hidden border border-[#3a3a3c]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Boxes className="w-5 h-5 text-[#ff9f0a]" />
            <span className="text-xs font-semibold text-[#cccccc]">Inventaris & Reagensia Lab</span>
          </div>
          {lowStockCount > 0 && (
            <span className="text-[10px] bg-[#ff3b30]/20 text-[#ff3b30] px-2 py-0.5 rounded-[4px] font-bold border border-[#ff3b30]/30 animate-pulse">
              {lowStockCount} Item Kritis
            </span>
          )}
        </div>

        <h2 className="text-lg font-bold text-white mb-1 font-apple-display">
          Stok Bahan Kimia & Consumables
        </h2>
        <p className="text-xs text-[#cccccc] mb-4 leading-relaxed">
          Monitoring otomatis reagen kadaluarsa, batch tracking lot, dan integrasi pengadaan re-order.
        </p>

        {currentUser.role !== 'CUSTOMER' && (
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#0066cc] hover:bg-[#0071e3] text-white text-xs font-semibold px-4 py-2 rounded-[4px] transition-all active:scale-95 flex items-center gap-1.5 shadow-md"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Tambah Item Reagen Baru</span>
          </button>
        )}
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-[4px] text-xs font-semibold whitespace-nowrap transition-all ${
              filterCategory === cat
                ? 'bg-[#0066cc] text-white shadow-sm'
                : 'bg-white text-[#333333] border border-black/[0.08] hover:bg-[#f5f5f7]'
            }`}
          >
            {cat === 'ALL' ? 'Semua Kategori' : cat}
          </button>
        ))}
      </div>

      {/* Inventory List */}
      {filteredItems.length === 0 ? (
        <Card className="p-8 text-center bg-white">
          <Boxes className="w-10 h-10 mx-auto text-[#7a7a7a] mb-2 opacity-50" />
          <h4 className="text-sm font-bold text-[#1d1d1f]">Belum Ada Data Reagen / Bahan Kimia</h4>
          <p className="text-xs text-[#7a7a7a] mt-1">Tambahkan item baru dengan menekan tombol "+ Tambah Item Reagen Baru".</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredItems.map(item => {
          const isLow = item.status === 'Low';
          const isExpired = item.status === 'Expired';

          return (
            <Card key={item.id} className="p-3.5 hover:shadow-md">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#0066cc]">
                    {item.code} • {item.category}
                  </span>
                  <h4 className="text-xs font-bold text-[#1d1d1f] mt-0.5">
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-[#7a7a7a]">
                    Penyimpanan: <strong>{item.storageLocation}</strong>
                  </p>
                </div>
                {isExpired ? (
                  <Badge variant="red">EXPIRED</Badge>
                ) : isLow ? (
                  <Badge variant="amber">STOK KRITIS</Badge>
                ) : (
                  <Badge variant="green">STOK AMAN</Badge>
                )}
              </div>

              {/* Stock Meta */}
              <div className="grid grid-cols-2 gap-2 text-[11px] bg-[#f5f5f7] p-2 rounded-[4px] mb-3">
                <div>
                  <span className="text-[#7a7a7a]">Batas Min:</span> <strong>{item.minStock} {item.unit}</strong>
                </div>
                <div>
                  <span className="text-[#7a7a7a]">Kadaluarsa:</span> <strong className={isExpired ? 'text-[#ff3b30]' : 'text-[#1d1d1f]'}>{item.expiryDate}</strong>
                </div>
                <div>
                  <span className="text-[#7a7a7a]">Lot Number:</span> <span className="font-mono">{item.lotNumber}</span>
                </div>
                <div>
                  <span className="text-[#7a7a7a]">Supplier:</span> {item.supplierName}
                </div>
              </div>

              {/* Stock Mutation Stepper */}
              <div className="flex items-center justify-between pt-1 border-t border-black/[0.04]">
                <div>
                  <span className="text-[10px] text-[#7a7a7a] block">Jumlah Stok Saat Ini:</span>
                  <span className="text-sm font-bold text-[#0066cc]">
                    {item.currentStock} {item.unit}
                  </span>
                </div>

                {currentUser.role !== 'CUSTOMER' && (
                  <div className="flex items-center gap-1.5 bg-[#f5f5f7] p-1 rounded-[4px] border border-black/[0.06]">
                    <button
                      onClick={() => updateStock(item.id, -1)}
                      className="w-7 h-7 rounded-[4px] bg-white hover:bg-[#ff3b30] hover:text-white text-[#1d1d1f] flex items-center justify-center transition-colors shadow-xs active:scale-90"
                      title="Kurangi Stok (Pakai)"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold px-2 text-[#1d1d1f]">
                      {item.currentStock}
                    </span>
                    <button
                      onClick={() => updateStock(item.id, 1)}
                      className="w-7 h-7 rounded-[4px] bg-white hover:bg-[#34c759] hover:text-white text-[#1d1d1f] flex items-center justify-center transition-colors shadow-xs active:scale-90"
                      title="Tambah Stok (Restock)"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
        </div>
      )}

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-[4px] max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-black/10 animate-in zoom-in-95">
            <div className="p-4 bg-[#f5f5f7] border-b border-black/[0.06] flex items-center justify-between">
              <h3 className="font-bold text-sm text-[#1d1d1f]">Tambah Reagen / Bahan Kimia Baru</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-7 h-7 rounded-[4px] bg-white text-[#7a7a7a] flex items-center justify-center hover:text-[#1d1d1f]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddItem} className="p-4 overflow-y-auto space-y-3">
              <div>
                <label className="block text-[11px] font-semibold mb-1">Nama Item Reagen *</label>
                <input
                  type="text"
                  required
                  placeholder="Cth: Reagen Kit Glukosa GOD-PAP 500mL"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#f5f5f7] border border-[#e0e0e0] text-xs rounded-[4px] px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold mb-1">Kategori</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-[#f5f5f7] border border-[#e0e0e0] text-xs rounded-[4px] px-3 py-2"
                  >
                    <option value="Reagen Kimia">Reagen Kimia</option>
                    <option value="Standar Kalibrasi">Standar Kalibrasi</option>
                    <option value="Kultur Media">Kultur Media</option>
                    <option value="Bahan Kimia Murni">Bahan Kimia Murni</option>
                    <option value="Consumables & Tips">Consumables & Tips</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold mb-1">Satuan</label>
                  <input
                    type="text"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full bg-[#f5f5f7] border border-[#e0e0e0] text-xs rounded-[4px] px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold mb-1">Stok Awal</label>
                  <input
                    type="number"
                    value={currentStock}
                    onChange={(e) => setCurrentStock(parseInt(e.target.value) || 0)}
                    className="w-full bg-[#f5f5f7] border border-[#e0e0e0] text-xs rounded-[4px] px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold mb-1">Batas Minimum (Alert)</label>
                  <input
                    type="number"
                    value={minStock}
                    onChange={(e) => setMinStock(parseInt(e.target.value) || 0)}
                    className="w-full bg-[#f5f5f7] border border-[#e0e0e0] text-xs rounded-[4px] px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold mb-1">Lokasi Penyimpanan</label>
                <input
                  type="text"
                  placeholder="Cth: Freezer Lab B-101 (-20°C)"
                  value={storageLocation}
                  onChange={(e) => setStorageLocation(e.target.value)}
                  className="w-full bg-[#f5f5f7] border border-[#e0e0e0] text-xs rounded-[4px] px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold mb-1">Lot Number</label>
                  <input
                    type="text"
                    value={lotNumber}
                    onChange={(e) => setLotNumber(e.target.value)}
                    className="w-full bg-[#f5f5f7] border border-[#e0e0e0] text-xs rounded-[4px] px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold mb-1">Tanggal Kadaluarsa</label>
                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full bg-[#f5f5f7] border border-[#e0e0e0] text-xs rounded-[4px] px-3 py-2"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-[#f5f5f7] text-xs font-semibold rounded-[4px]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#0066cc] text-white text-xs font-semibold py-2 rounded-[4px]"
                >
                  Simpan Reagen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
