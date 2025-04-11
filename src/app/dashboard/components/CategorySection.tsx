'use client';

import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
// import { toast } from '@/components/ui/use-toast';
// import type { Category } from '@/types/api';

// Static category data
const staticCategories = [
  {
    id: 1,
    name: 'Pizza',
    icon: '/assets/icons/category/pizza.svg',
  },
  {
    id: 2,
    name: 'Burger',
    icon: '/assets/icons/category/burger.svg',
  },
  {
    id: 3,
    name: 'SeaFood',
    icon: '/assets/icons/category/seafood.svg',
  }
]

export function CategorySection() {
  // const [categories, setCategories] = useState({});

  // useEffect(() => {
  //  setCategories(staticCategories);
  // }, []);

  // const handleCategoryClick = (category: Category) => {
  //   // Handle category selection
  //   console.log('Selected category:', category);
  //   // You can add navigation or filtering logic here
  // };

  // if (loading) {
  //   return (
  //     <div className="mb-8">
  //       <div className="flex justify-between items-center mb-4">
  //         <div className="h-7 w-32 bg-gray-200 animate-pulse rounded" />
  //         <div className="h-6 w-24 bg-gray-200 animate-pulse rounded" />
  //       </div>
  //       <div className="grid grid-cols-6 gap-4">
  //         {[...Array(6)].map((_, index) => (
  //           <div
  //             key={index}
  //             className="flex flex-col items-center p-4 bg-white rounded-2xl"
  //           >
  //             <div className="bg-gray-200 p-3 rounded-xl mb-3 w-14 h-14 animate-pulse" />
  //             <div className="h-4 w-16 bg-gray-200 animate-pulse rounded" />
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-neutral">Category</h3>
        <button className="text-secondary-1 flex items-center gap-1">
          View all <ChevronRight size={16} />
        </button>
      </div>
      <div className="grid grid-cols-6 gap-4">
        {staticCategories.map((category) => (
          <button
            key={category.id}
            // onClick={() => handleCategoryClick(category)}
            className="flex flex-col items-center p-4 bg-white rounded-2xl hover:bg-gray-50/80 transition-colors"
          >
            <div className="bg-gray-50 p-3 rounded-xl mb-3">
              <Image
                src={category.icon}
                alt={category.name}
                width={32}
                height={32}
                className="w-8 h-8"
              />
            </div>
            <span className="text-sm font-medium text-neutral">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
