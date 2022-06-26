 import React from 'react';
 import { client, urlFor } from '../../lib/client';
 
 const ProductDetails = ({ product, products }) => {
   return (
     <div>
      <div className='product-detail-container'>
        <div>
          <div className='image-container'>
            <img src='' />
          </div>
        </div>
      </div>
     </div>
   )
 }

 export const getStaticProps = async({ params: { slug }}) => {
  // get access to the slug that belongs to the product page clicked
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;

  // fetch all the products
  const productsQuery = '*[_type == "product"]';

  // get the individual product
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product }
  }
}
 
 export default ProductDetails

  // [] in file name indicates that the product slug will be dynamic
 // file based routing
 // ----------
 // getStaticProps is a built in Next.js function used when we want to pre-render the page at build time using the props returned
 // the user can click on any of the product pages on the homepage, therefore, the product data should already be stored so everything instantly populates
