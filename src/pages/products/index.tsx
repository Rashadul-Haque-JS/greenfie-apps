import React, { useState, useEffect } from 'react';
import Product from '@/components/cards/Product';
import ListsPage from '@/components/layouts/LayoutInner';

// mock dtat to be removed..when done
import products from '@/utils/mock-data/products';

export interface IProduct {
  name: string;
  description: string;
  price: number;
  image: string;
}

const Products = () => {
  
  return (
    <ListsPage>
      {products.map(product => (
            <Product key={product.price} {...product} />
          ))}
    </ListsPage>
  );
};

export default Products;