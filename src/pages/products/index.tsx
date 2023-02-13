import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Product from '@/components/Product';
import connection from 'server/db';

export interface IProduct {
    name: string;
    description: string;
    price: number;
    image: string;
  }

const Products = () => {
const [products, setProducts] = useState<IProduct[]>([{name: 'test', description: 'loremmmmmmmmmmmmm mmmmmm mmmmmm', price:133, image: 'https://picsum.photos/400/300'},{name: 'test', description: 'loremmmmmmmmmmmmm mmmmmm mmmmmm', price:123, image: 'https://picsum.photos/400/300'},{name: 'test', description: 'loremmmmmmmmmmmmm mmmmmm mmmmmm', price:183, image: 'https://picsum.photos/400/300'},{name: 'test', description: 'loremmmmmmmmmmmmm mmmmmm mmmmmm', price:193, image: 'https://picsum.photos/400/300'}]);

useEffect(() => {
   
const fetchProducts = async () => {
// const data = await productSchema.find();
// setProducts(data);
console.log('mock db product');

};
fetchProducts();
}, []);

return (
<Layout>
<div className="container mx-auto">
<h1 className="text-2xl font-bold text-center">Our Products</h1>
<div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2">
{products.map(product => (
<Product key={product.price} {...product} />
))}
</div>
</div>
</Layout>
);
};

export default Products;