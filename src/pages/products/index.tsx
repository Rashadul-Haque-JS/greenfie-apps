import ProductCard from '@/components/cards/Product';
import ListsPage from '@/components/layouts/LayoutInner';
import {IProducts, GenericProps } from '@/utils/types';
import { GetServerSideProps } from 'next';
import axios from 'axios';

// mock dtat to be removed..when done
// import products from '@/utils/mock-data/products';

const Products = ({ products }:GenericProps) => {
  
  return (
    <ListsPage>
      {products.map((product:IProducts) => (
            <ProductCard key={product._id} product={product} />
          ))}
    </ListsPage>
  );
};


export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await axios.get("http://127.0.0.1:9000/api/products");
    const products = res.data;
    return { props: { products } };
  } catch (error:any) {
    console.error(error.message);
    return { props: { products: []} };
  }
};

export default Products;;
