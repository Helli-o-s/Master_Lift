import { useState } from 'react';
import { products } from '../constants';
import { Card } from '../components/ui/Card';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ProductModal } from '../components/ui/ProductModal';

export const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

  return (
    <section id="products" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading 
          title="Vertical Mobility Catalog." 
          subtitle="Explore our comprehensive range of safety-first elevators, escalators, and specialty access equipment."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} onClick={() => setSelectedProduct(product)} className="cursor-pointer">
              <Card 
                title={product.title}
                description={product.desc}
                imageUrl={product.imageUrl}
              />
            </div>
          ))}
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
