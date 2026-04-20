/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HelpCircle, Info, User, ChevronDown } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-nice-blue text-white h-12 flex items-center justify-between px-4 shadow-md">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>
          <span className="font-semibold tracking-wide text-sm">INTERACTION ANALYTICS</span>
        </div>
      </div>
      
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-1 cursor-pointer hover:text-white/80 transition-colors">
          <span>Nital Patel</span>
          <ChevronDown className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-4">
          <HelpCircle className="w-5 h-5 cursor-pointer hover:text-white/80 transition-colors" />
          <Info className="w-5 h-5 cursor-pointer hover:text-white/80 transition-colors" />
          <div className="font-bold text-xs tracking-tighter">NICE</div>
        </div>
      </div>
    </header>
  );
}
