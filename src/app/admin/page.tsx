'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { formulas as initialFormulas } from '@/lib/data'
import type { Formula } from '@/lib/data'

const ADMIN_PASS = 'mmiboost2024'

type Tab = 'formules' | 'commandes' | 'stats'

const mockOrders = [
  { id: '#MMI-2847', client: 'Sophie L.', email: 'sophie@email.com', formula: 'Growth VIP', amount: 300, date: '2024-01-15', status: 'completed' },
  { id: '#MMI-2846', client: 'Marcus C.', email: 'marcus@email.com', formula: 'Dominate', amount: 100, date: '2024-01-15', status: 'completed' },
  { id: '#MMI-2845', client: 'Yasmine D.', email: 'yasmine@email.com', formula: 'Scale VIP', amount: 500, date: '2024-01-14', status: 'completed' },
  { id: '#MMI-2844', client: 'Thomas M.', email: 'thomas@email.com', formula: 'Momentum', amount: 40, date: '2024-01-14', status: 'completed' },
  { id: '#MMI-2843', client: 'Amina D.', email: 'amina@email.com', formula: 'Empire VIP', amount: 1000, date: '2024-01-13', status: 'completed' },
  { id: '#MMI-2842', client: 'Kevin R.', email: 'kevin@email.com', formula: 'Surge', amount: 25, date: '2024-01-13', status: 'pending' },
]

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [tab, setTab] = useState<Tab>('formules')
  const [formulas, setFormulas] = useState<Formula[]>(initialFormulas)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<Formula>>({})
  const [saved, setSaved] = useState(false)

  const handleLogin = () => {
    if (password === ADMIN_PASS) {
      setAuthed(true)
      setAuthError('')
    } else {
      setAuthError('Mot de passe incorrect')
    }
  }

  const startEdit = (f: Formula) => {
    setEditingId(f.id)
    setEditData({ price: f.price, name: f.name, description: f.description, followUp: f.followUp })
  }

  const saveEdit = () => {
    setFormulas((prev) =>
      prev.map((f) => (f.id === editingId ? { ...f, ...editData } : f))
    )
    setEditingId(null)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const totalRevenue = mockOrders.reduce((acc, o) => acc + o.amount, 0)
  const avgOrder = Math.round(totalRevenue / mockOrders.length)

  // Login screen
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="glass rounded-3xl p-10 text-center">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6"
              style={{ background: 'linear-gradient(135deg, #3B82F6, #7C3AED)' }}
            >
              🔐
            </div>
            <h1 className="font-display text-3xl font-bold text-white mb-2">Admin MMI Boost</h1>
            <p className="text-gray-400 text-sm mb-8">Accès réservé à l&apos;équipe MMI Boost</p>

            <div className="mb-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Mot de passe administrateur"
                className={`input-dark text-center ${authError ? 'border-red-500/50' : ''}`}
              />
              {authError && <p className="text-red-400 text-xs mt-2">{authError}</p>}
            </div>

            <button onClick={handleLogin} className="btn-primary w-full py-3.5">
              Se connecter
            </button>

            <p className="text-xs text-gray-600 mt-4">Demo: mmiboost2024</p>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {/* Sidebar */}
      <div className="flex h-screen">
        <aside className="w-64 flex-shrink-0 bg-[#080810] border-r border-white/5 p-6 hidden lg:flex flex-col">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold"
              style={{ background: 'linear-gradient(135deg, #3B82F6, #7C3AED)' }}
            >
              M
            </div>
            <div>
              <p className="font-display font-bold text-white text-base">MMI Boost</p>
              <p className="text-xs text-gray-500">Administration</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 space-y-1">
            {([
              { id: 'stats', icon: '📊', label: 'Tableau de bord' },
              { id: 'formules', icon: '💎', label: 'Formules & Prix' },
              { id: 'commandes', icon: '📦', label: 'Commandes' },
            ] as { id: Tab; icon: string; label: string }[]).map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
                  tab === item.id
                    ? 'bg-blue-500/15 text-blue-400 border border-blue-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="pt-4 border-t border-white/8">
            <button
              onClick={() => setAuthed(false)}
              className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-gray-500 hover:text-red-400 hover:bg-red-400/5 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Déconnexion
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-y-auto">
          {/* Top bar */}
          <div className="sticky top-0 z-10 bg-[#0A0A0F]/90 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
            <h1 className="font-display text-xl font-bold text-white">
              {tab === 'stats' && 'Tableau de bord'}
              {tab === 'formules' && 'Gestion des formules'}
              {tab === 'commandes' && 'Commandes récentes'}
            </h1>

            <div className="flex items-center gap-3">
              {saved && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-green-400 bg-green-400/10 border border-green-400/20"
                >
                  ✓ Sauvegardé
                </motion.div>
              )}
              {/* Mobile tabs */}
              <div className="flex lg:hidden gap-1">
                {(['stats', 'formules', 'commandes'] as Tab[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      tab === t ? 'bg-blue-500/15 text-blue-400' : 'text-gray-500 hover:text-white'
                    }`}
                  >
                    {t === 'stats' ? '📊' : t === 'formules' ? '💎' : '📦'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              {/* ─── STATS ─── */}
              {tab === 'stats' && (
                <motion.div
                  key="stats"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[
                      { label: 'Revenus (30j)', value: `£${totalRevenue.toLocaleString()}`, icon: '💰', trend: '+24%' },
                      { label: 'Commandes', value: mockOrders.length.toString(), icon: '📦', trend: '+12%' },
                      { label: 'Panier moyen', value: `£${avgOrder}`, icon: '🛒', trend: '+8%' },
                      { label: 'Clients actifs', value: '2 400+', icon: '👥', trend: '+33%' },
                    ].map((stat) => (
                      <div key={stat.label} className="glass rounded-2xl p-5">
                        <div className="flex items-start justify-between mb-3">
                          <span className="text-2xl">{stat.icon}</span>
                          <span className="text-xs text-green-400 font-semibold bg-green-400/10 px-2 py-0.5 rounded-full">
                            {stat.trend}
                          </span>
                        </div>
                        <p className="font-display text-2xl font-bold text-white">{stat.value}</p>
                        <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Top formulas */}
                  <div className="glass rounded-2xl p-6">
                    <h3 className="font-display font-semibold text-white mb-5">Formules les plus vendues</h3>
                    <div className="space-y-4">
                      {[
                        { name: 'Momentum (£40)', percent: 82, revenue: '£3 280' },
                        { name: 'Growth VIP (£300)', percent: 65, revenue: '£4 500' },
                        { name: 'Dominate (£100)', percent: 58, revenue: '£2 900' },
                        { name: 'Surge (£25)', percent: 47, revenue: '£1 175' },
                      ].map((item) => (
                        <div key={item.name}>
                          <div className="flex items-center justify-between text-sm mb-1.5">
                            <span className="text-gray-300">{item.name}</span>
                            <span className="text-gray-500">{item.revenue}</span>
                          </div>
                          <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${item.percent}%` }}
                              transition={{ duration: 1, delay: 0.2 }}
                              className="h-full rounded-full"
                              style={{ background: 'linear-gradient(90deg, #3B82F6, #7C3AED)' }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ─── FORMULES ─── */}
              {tab === 'formules' && (
                <motion.div
                  key="formules"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  <p className="text-sm text-gray-500 mb-5">
                    Cliquez sur &quot;Modifier&quot; pour ajuster les prix, descriptions et durées de suivi.
                  </p>

                  {formulas.map((f) => (
                    <div key={f.id} className="glass rounded-2xl overflow-hidden">
                      {editingId === f.id ? (
                        /* Edit mode */
                        <div className="p-5">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            <div>
                              <label className="text-xs text-gray-500 mb-1 block">Prix (£)</label>
                              <input
                                type="number"
                                value={editData.price}
                                onChange={(e) => setEditData({ ...editData, price: +e.target.value })}
                                className="input-dark text-sm py-2"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-500 mb-1 block">Nom</label>
                              <input
                                value={editData.name ?? ''}
                                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                className="input-dark text-sm py-2"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="text-xs text-gray-500 mb-1 block">Description</label>
                              <input
                                value={editData.description ?? ''}
                                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                className="input-dark text-sm py-2"
                              />
                            </div>
                            {f.followUp !== undefined && (
                              <div className="sm:col-span-2">
                                <label className="text-xs text-gray-500 mb-1 block">Durée de suivi</label>
                                <input
                                  value={editData.followUp ?? ''}
                                  onChange={(e) => setEditData({ ...editData, followUp: e.target.value })}
                                  className="input-dark text-sm py-2"
                                />
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button onClick={saveEdit} className="btn-primary text-sm py-2 px-5">
                              ✓ Sauvegarder
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="btn-secondary text-sm py-2 px-5"
                            >
                              Annuler
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* View mode */
                        <div className="flex items-center gap-4 p-5">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white flex-shrink-0"
                            style={{ background: 'linear-gradient(135deg, #3B82F6, #7C3AED)' }}
                          >
                            £{f.price}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-semibold text-white">{f.name}</p>
                              <span className={`text-xs px-2 py-0.5 rounded-full border ${
                                f.category === 'vip'
                                  ? 'text-amber-400 bg-amber-400/10 border-amber-400/20'
                                  : f.category === 'premium'
                                  ? 'text-violet-400 bg-violet-400/10 border-violet-400/20'
                                  : f.category === 'growth'
                                  ? 'text-blue-400 bg-blue-400/10 border-blue-400/20'
                                  : 'text-gray-400 bg-gray-400/10 border-gray-400/20'
                              }`}>
                                {f.category}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 truncate">{f.description}</p>
                            {f.followUp && (
                              <p className="text-xs text-amber-400 mt-0.5">🤝 {f.followUp}</p>
                            )}
                          </div>
                          <button
                            onClick={() => startEdit(f)}
                            className="btn-secondary text-xs py-2 px-4 flex-shrink-0"
                          >
                            Modifier
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}

              {/* ─── COMMANDES ─── */}
              {tab === 'commandes' && (
                <motion.div
                  key="commandes"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="glass rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-white/8">
                            <th className="text-left px-5 py-4 text-xs text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="text-left px-5 py-4 text-xs text-gray-500 uppercase tracking-wider">Client</th>
                            <th className="text-left px-5 py-4 text-xs text-gray-500 uppercase tracking-wider hide-mobile">Formule</th>
                            <th className="text-left px-5 py-4 text-xs text-gray-500 uppercase tracking-wider">Montant</th>
                            <th className="text-left px-5 py-4 text-xs text-gray-500 uppercase tracking-wider hide-mobile">Date</th>
                            <th className="text-left px-5 py-4 text-xs text-gray-500 uppercase tracking-wider">Statut</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {mockOrders.map((order, i) => (
                            <motion.tr
                              key={order.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                              className="hover:bg-white/2 transition-colors"
                            >
                              <td className="px-5 py-4 text-sm text-gray-500 font-mono">{order.id}</td>
                              <td className="px-5 py-4">
                                <div>
                                  <p className="text-sm text-white font-medium">{order.client}</p>
                                  <p className="text-xs text-gray-600">{order.email}</p>
                                </div>
                              </td>
                              <td className="px-5 py-4 text-sm text-gray-400 hide-mobile">{order.formula}</td>
                              <td className="px-5 py-4 text-sm font-bold text-white">£{order.amount}</td>
                              <td className="px-5 py-4 text-sm text-gray-500 hide-mobile">{order.date}</td>
                              <td className="px-5 py-4">
                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                                  order.status === 'completed'
                                    ? 'bg-green-400/10 text-green-400 border border-green-400/20'
                                    : 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                                }`}>
                                  {order.status === 'completed' ? '✓ Complété' : '⏳ En attente'}
                                </span>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  )
}
