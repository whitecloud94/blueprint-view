import React from 'react';
import {ArrowUpRight} from 'lucide-react';

const STYLES = {
    wrapper: "bg-[#F9F9F9] rounded-[28px] sm:rounded-[32px] p-1.5 sm:p-2 space-y-1 border border-gray-50",
    productItem: "group bg-white rounded-[20px] sm:rounded-[24px] p-3 sm:p-4 pl-4 sm:pl-5 flex items-center justify-between hover:scale-[1.01] hover:shadow-md transition-all duration-300 cursor-pointer border border-transparent hover:border-gray-50",
    productIcon: "w-9 h-9 sm:w-10 sm:h-10 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center text-lg sm:text-xl shadow-sm",
    productTag: "text-[9px] sm:text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-md tracking-wider border border-gray-200",
    dot: "w-1.5 h-1.5 rounded-full bg-gray-300",
};

export const ProductsSection = () => (
    <section className={`${STYLES.wrapper} mb-12 sm:mb-16`}>
        <div className="flex items-center gap-2 px-4 sm:px-6 py-4 text-xs sm:text-sm font-medium text-gray-400">
            <div className={STYLES.dot}/>
            Products
        </div>
        {[
            {name: 'Goven', tag: 'FRAMER'},
            {name: 'Faktur Invoice', tag: 'FRAMER'},
            {name: 'Subtle Folio', tag: 'FRAMER'}
        ].map((prod, j) => (
            <div key={j} className={STYLES.productItem}>
                <div className="flex items-center gap-3 sm:gap-5">
                    <div className={STYLES.productIcon}>⚡️</div>
                    <span className="text-[14px] sm:text-[15px] font-bold text-gray-900">{prod.name}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                    <span className={STYLES.productTag}>{prod.tag}</span>
                    <ArrowUpRight size={16} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
            </div>
        ))}
    </section>
);
