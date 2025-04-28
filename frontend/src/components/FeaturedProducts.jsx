import { useQuery } from "@tanstack/react-query";
import { getFeaturedProducts } from "../queries/products";
import Loader from "./Loader";
import ProductCard from "./ProductCard";

const FeaturedProducts = () => {
  const { isFetching, data } = useQuery({
    queryKey: ["products"],
    queryFn: async() => {
      const res = await getFeaturedProducts();
      return res.data;
    },
  });
  return (
    <section id="products1" className="section-p1">
      <h2>Featured Products</h2>
      <p>Collections New Modern Design</p>
      {isFetching ? (
          <div class="loader-container">
            <Loader />
          </div>
        ) :(
      <div className="pro-container">
        {data.map(product => {
          return <ProductCard product={product} key={product._id} />
        })}
      </div>)}
    </section>
  );
};

export default FeaturedProducts;
