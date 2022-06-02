/**
 * @type {import('next-seo').NextSeoProps}
 */
const openGraphConfig = {
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hf.stiforr.tech",
    site_name: "Hello Free Shavacado",
    title: "Hello Free Shavacado",
    description: "Search for Hello Fresh recipes by ingredient",
    images: [
      {
        url: "https://i.imgur.com/0RSkm23.jpg",
        height: 1800,
        width: 1200,
        alt: "Hello Free Shavacado Logo",
      },
    ],
  },
  twitter: {
    handle: "@stiforr",
    site: "@stiforr",
    cardType: "app",
  },
};

export default openGraphConfig;
