import { useState } from 'react';
import { products } from '../constants';
import { Card } from '../components/ui/Card';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ProductModal } from '../components/ui/ProductModal';
import { cn } from '../lib/utils';

export const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

  return (
    <section id="products" className="py-24 md:py-32 bg-background relative overflow-hidden content-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading
          title="Vertical Mobility Systems."
          subtitle="Engineered solutions for exact architectural requirements. Explore our comprehensive range of high-performance elevators, escalators, and specialty access infrastructure."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {products.map((product, index) => {
            // Dynamic span logic mirroring the Services bento grid (5 items)
            const isTopRow = index < 2;
            const lgSpan = isTopRow ? 'lg:col-span-3' : 'lg:col-span-2';
            const mdSpan = isTopRow || index === 2 || index === 3 ? 'md:col-span-1' : 'md:col-span-2';

            return (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className={cn("cursor-pointer relative min-h-[340px] flex", lgSpan, mdSpan)}
              >
                <Card
                  title={product.title}
                  description={product.desc}
                  imageUrl={product.imageUrl}
                  className="w-full h-full"
                />
              </div>
            );
          })}
        </div>
      </div>

      <ProductModal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
      />
    </section>
  );
};
