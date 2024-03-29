import ProductCard from '@/components/cards/Product';
import ListsPage from '@/components/layouts/LayoutInner';
import {IProducts, GenericProps } from '@/utils/types';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { getClientURL } from '@/utils/clientUrl';

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
  const URL = getClientURL();
  try {
    const res = await axios.get(`${URL}/api/products/products`);
    const products = res.data;
    return { props: { products } };
  } catch (error: any) {
    console.error(error.message);
    return { props: { products: [] } };
  }
};

export default Products;;
