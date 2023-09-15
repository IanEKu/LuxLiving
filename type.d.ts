// Type for collectionShowcase items
type CollectionShowcaseItem = {
    title: string;
    discount: number;
    special: string | null;
    category: string;
    image: CollectionImage;
  }

type CollectionImage = {
    url: string,
    alt: string
}
  
  // Type for navigationsLink items
  type NavigationLinkItem = {
    title: string;
    route: string;
  }
  
  // Type for footerLinks items
  type FooterLinkItem = {
    title: string;
    links: {
      title: string;
      link: string;
    }[];
  }
  
  // Type for products items
  type ProductItem = {
    title: string;
    category: string;
    color: string | null;
    price?: number;
    image: string;
    blurDataURL?: string;
  }
  
  // Type for productCategories and productColors
  type ProductCategory = 'modern' | 'bohemian' | 'classy' | 'wooden';
  type ProductColor = 'black' | 'gray' | 'gray-blue' | 'light-wood' | 'dark-wood';  