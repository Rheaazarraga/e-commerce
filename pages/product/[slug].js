 import React from 'react';
 import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
 import { client, urlFor } from '../../lib/client';
 
 const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
   return (
     <div>
      <div className='product-detail-container'>
        <div>
          <div className='image-container'>
            <img src={urlFor(image && image[0])} alt=''/>
          </div>
          {/* PRODUCT CAROUSEL  
          <div className='small-images-container'>
            {image?.map((item, i) => (
              <img
              src={urlFor(item)}
              className=""
              onMouseEnter=""
                />
            ))}
          </div> */}
        </div>
        <div className='product-details-desc'>
          <h1>{name}</h1>
          <div className='reviews'>
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>
              (20)
            </p>
          </div>
          <h4>Details:</h4>
          <p>{details}</p>
          <p className='price'>${price}</p>
          <div className='quantity'>
            <h3>Quantity:</h3>
            <p className='quantity-desc'>
              <span className='minus' onClick=''><AiOutlineMinus /></span>
              <span className='num' onClick=''>0</span>
              <span className='plus' onClick=''><AiOutlinePlus /></span>
            </p>
          </div>
        </div>
      </div>
     </div>
   )
 }

 export const getStaticPaths = async () => {
  // query to get all the products, but only return the current slug property
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  // generate paths for each individual product, return an object containing the paths

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current
    }
  }))

  return {
    paths, 
    fallback: 'blocking'
  }
 }

 export const getStaticProps = async({ params: { slug }}) => {
  // get access to the slug that belongs to the product page clicked - fetch the 1st product that matches the query
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;

  // fetch all the products
  const productsQuery = '*[_type == "product"]';

  // get the individual product
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  console.log(product);
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
// ----------
//getStaticPaths **must** be used with getStaticProps
// if a page has dynamic routes (aka slug) and uses getStaticProps, it needs to define a list of paths to be statically generated
// fallback is blocking , new paths not returned by getStaticPaths will wait for the HTML to be generated (like server -side rendering), then be cached for future requests so it only happens once per path