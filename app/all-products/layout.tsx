import Filter from '@/app/ui/allproducts/filter';
import ProductCard from '@/app/ui/card/productcard/page';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
    
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
   
  );
}
