
import CardCarousel from '@/components/sections/card-carousel';
import Details from '@/components/sections/details';
import Hero from '@/components/sections/hero';
import ProductGrid from '@/components/sections/product-grid';
import CategoryCard from '@/components/ui/category-card';
import { notFound } from 'next/navigation';
import { dc } from '@/lib/data-connect';
import { getCollectionsByPage } from '@firebasegen/default-connector';
import CardOverlay from '@/components/card-overlay';
import { getRemoteConfigFetchResponse } from '@/lib/firebase/admin';
import Header from '@/components/layout/header/header';

export default async function Page() {
  // Fetch and serialize the Remote Config fetch response for SSR hydration
  const remoteConfigFetchResponse = await getRemoteConfigFetchResponse();
  // Extract darkMode from fetchResponse (example: remoteConfigFetchResponse.parameters['darkmode'])
  const darkMode = remoteConfigFetchResponse.parameters?.['darkmode']?.value === 'true';
  const { data: collectionsData } = await getCollectionsByPage(dc, { page: 'home' });
  const [mainCollection, secondaryCollection, tertiaryCollection] = [
    ...(collectionsData?.collections || [])
  ].sort((a, b) => {
    const order: Record<string, number> = {
      'o25-collection': 1,
      'mist-collection': 2,
      'winter-collection': 3
    };
    return (order[a.handle] || 99) - (order[b.handle] || 99);
  });

  if (!collectionsData?.collections?.length) return notFound();

  // Example navigation, replace with your actual navigation data
  const navigation = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/products' },
    { label: 'Cart', href: '/cart' },
    { label: 'Orders', href: '/orders' }
  ];

  return (
    <>
      {/* Pass SSR darkMode value to Header for client hydration */}
      <Header navigation={navigation} initialDarkMode={darkMode} />
      <Hero
        title={mainCollection?.name ?? ''}
        description={mainCollection?.description ?? ''}
        image={mainCollection?.featuredImage?.url ?? ''}
        primaryCta={{ label: 'Shop Now', href: `/category/${mainCollection?.handle}` }}
        secondaryCta={{ label: 'Learn More', href: `/category/${mainCollection?.handle}#about` }}
        darkMode={darkMode}
      />
      <Details title={mainCollection?.name ?? ''} body={mainCollection?.description ?? ''} />
      <CardCarousel title="Explore" cta={{ label: 'Shop All', href: '/products' }}>
        {collectionsData?.collections
          .filter((collection) => Boolean(collection?.featuredImage?.url))
          .map((collection) => (
            <CategoryCard
              key={collection.id}
              handle={collection.handle}
              name={collection.name}
              image={collection.featuredImage?.url ?? ''}
            />
          ))}
      </CardCarousel>
      <CardOverlay
        title={secondaryCollection?.name ?? ''}
        description={secondaryCollection?.description ?? ''}
        cta={{ label: 'Shop Now', href: `/category/${secondaryCollection?.handle}` }}
        image={secondaryCollection?.featuredImage?.url ?? ''}
      />
      <ProductGrid
        title={tertiaryCollection?.name ?? ''}
        variant="character"
        products={tertiaryCollection?.products_via_ProductCollection?.map((product) => ({
          id: product.id,
          title: product.title,
          handle: product.handle,
          price: product.productVariants_on_product?.at(0)?.price?.toString() ?? '',
          image: product.productImages_on_product?.at(0),
          variants: product.productVariants_on_product?.at(0)?.selectedOptions_on_productVariant?.map((option) => option.value ?? '') ?? []
        })) ?? []}
      />
    </>
  );
