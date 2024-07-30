import { Button } from "@/app/ui/cart_button";
import { lusitana } from "@/app/ui/fonts";
import SearchInput  from "./ui/search_input";
import Banner from "./landing/banner/Banner";
import Hero from "./landing/hero/page";
import Products from "./landing/product/page";
import TopProducts from "./landing/topproducts/page";
import Testimonials from "./landing/testimonials/Testimonials";


export default function Home() {
  return (
   <>
   <Products/>
   <Banner/>
   <TopProducts/>
   

   </>
   
  );
}
