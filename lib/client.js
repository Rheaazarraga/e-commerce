import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// connect to Sanity
export const client = sanityClient({
  projectId: 'dizfs7fu',
  dataset: 'production',
  apiVersion: '2022-06-15',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

// let's us use Sanity images
const builder = imageUrlBuilder(client);

// gives access to the urls where images are stored
export const urlFor = (source) => builder.image(source);