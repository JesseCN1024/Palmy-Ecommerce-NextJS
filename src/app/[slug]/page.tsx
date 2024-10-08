import CustomizeProducts from '@/components/CustomizeProducts';
import NotFound from '@/components/NotFound';
import ProductImages from '@/components/ProductImages'
import { wixClientServer } from '@/lib/wixClientServer';
import { notFound } from 'next/navigation';
import React from 'react'

async function ProductDetail({params} : {params: any}) {
  const wixClient = await wixClientServer();
  const products = await wixClient.products.queryProducts().eq("slug", params.slug).find();
  if (!products){
    return notFound();
  }
  const product = products.items[0];
  console.log(product);

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      {/* IMG */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages items={product?.media?.items} />
      </div>
      {/* TEXTS */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
        <div className="h-[2px] bg-gray-100" />
        {product.price?.price === product.price?.discountedPrice ? (
          <h2 className="font-medium text-2xl">${product.price?.price}</h2>
        ) : (
          <div className="flex items-center gap-4">
            <h3 className="text-xl text-gray-500 line-through">
              ${product.price?.price}
            </h3>
            <h2 className="font-medium text-2xl">
              ${product.price?.discountedPrice}
            </h2>
          </div>
        )}
        <div className="h-[2px] bg-gray-100" />
          <CustomizeProducts
            productId={product._id?.toString() || ""}
            variants={product.variants  || []}
            productOptions={product.productOptions || []}
          />
        <div className="h-[2px] bg-gray-100" />
        {product.additionalInfoSections?.map((section: any,idx) => (
          <div key={idx}>
            <h3 className="text-lg font-medium">{section.title}</h3>
            <p className="text-sm">{section.description}</p>
          </div>
        )
        )}
          <div className="text-sm" >
            <h4 className="font-medium mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore laboriosam ipsa fugit? Odit nemo delectus commodi ut tempore doloribus non, fuga incidunt eveniet sunt quam voluptas esse enim earum mollitia.</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore laboriosam ipsa fugit? Odit nemo delectus commodi ut tempore doloribus non, fuga incidunt eveniet sunt quam voluptas esse enim earum mollitia.</p>
          </div>
        <div className="h-[2px] bg-gray-100" />
        {/* REVIEWS */}
        <h1 className="text-2xl">User Reviews</h1>
        {/* <Suspense fallback="Loading...">
          <Reviews productId={product._id!} />
        </Suspense> */}
      </div>
    </div>
  )
}

export default ProductDetail