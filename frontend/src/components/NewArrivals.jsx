import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import Loader from "./Loader";
import { getLatestProducts } from "../queries/products";

const NewArrivals = () => {
  const { isFetching, data } = useQuery({
    queryKey: ["new-products"],
    queryFn: async () => {
      const res = await getLatestProducts();
      console.log(res);
      return res.data;
    },
  });

  return (
    <section id="products1" class="section-p1">
      <h2>New Arrivals</h2>
      <p>Summer Collections New Morden Design</p>
      <div class="pro-container">
        {isFetching ? (
          <div class="loader-container">
            <Loader />
          </div>
        ) : (
          data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </section>
  );
};

export default NewArrivals;
