import React, { useState } from 'react';
import { useStore } from './store/useStore';
import { Sidebar } from './components/Sidebar';
import { ImageGenerator } from './components/ImageGenerator';
import { VideoGenerator } from './components/VideoGenerator';
import { Moon, Sun, Plus, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const { theme, toggleTheme, coins, addCoins } = useStore();
  const [activeTab, setActiveTab] = useState<'image' | 'video'>('image');
  const [showAddCoins, setShowAddCoins] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setShowMobileSidebar(true)}
        className="fixed top-4 left-4 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg md:hidden z-50"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar with mobile responsiveness */}
      <AnimatePresence>
        {(showMobileSidebar || window.innerWidth >= 768) && (
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
            className="fixed inset-0 z-50 md:relative"
          >
            <div className="absolute inset-0 bg-black/50 md:hidden" onClick={() => setShowMobileSidebar(false)} />
            <Sidebar onClose={() => setShowMobileSidebar(false)} />
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="md:ml-64 min-h-screen">
        <header className="border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-40">
          <div className="flex flex-col md:flex-row md:items-center justify-between px-6 py-4 space-y-4 md:space-y-0">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab('image')}
                className={`px-4 py-2 rounded-lg transition-colors flex-1 md:flex-none ${
                  activeTab === 'image'
                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-100'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                Image Generation
              </button>
              <button
                onClick={() => setActiveTab('video')}
                className={`px-4 py-2 rounded-lg transition-colors flex-1 md:flex-none ${
                  activeTab === 'video'
                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-100'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                Video Generation
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowAddCoins(true)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Coins
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'image' ? <ImageGenerator /> : <VideoGenerator />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Add Coins Modal */}
      <AnimatePresence>
        {showAddCoins && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className={`bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              <h2 className="text-xl font-bold mb-4">Add Coins</h2>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[100, 500, 1000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      addCoins(amount);
                      setShowAddCoins(false);
                    }}
                    className="p-4 border border-purple-200 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900 transition-colors"
                  >
                    <div className="font-bold text-purple-600 dark:text-purple-400">{amount}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Coins</div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowAddCoins(false)}
                className="w-full py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;