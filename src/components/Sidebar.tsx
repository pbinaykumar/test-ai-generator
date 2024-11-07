import React from 'react';
import { useStore } from '../store/useStore';
import { Coins, Image, Video, Settings, Info, Sparkles, X } from 'lucide-react';

interface SidebarProps {
  onClose?: () => void;
}

export const Sidebar = ({ onClose }: SidebarProps) => {
  const { coins, theme } = useStore();
  
  return (
    <div className={`fixed left-0 top-0 h-full w-64 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} shadow-lg transition-all z-50`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-purple-600" />
            <h1 className="text-xl font-bold">AI Studio Pro</h1>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Coins className="w-5 h-5 text-yellow-500" />
            <span className="font-medium">{coins} Coins</span>
          </div>
          
          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-100 hover:text-purple-700 transition-colors">
              <Image className="w-5 h-5" />
              <span>Image Generation</span>
            </a>
            <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-100 hover:text-purple-700 transition-colors">
              <Video className="w-5 h-5" />
              <span>Video Generation</span>
            </a>
            <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-100 hover:text-purple-700 transition-colors">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </a>
          </nav>
          
          <div className="absolute bottom-6 left-6 right-6">
            <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-purple-600" />
                <span className="font-medium">Pro Tip</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Use detailed prompts for better generation results!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};