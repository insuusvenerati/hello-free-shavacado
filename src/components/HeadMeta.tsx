export const HeadMeta = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <>
    <meta name="application-name" content={title} />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content={title} />
    <meta name="format-detection" content="telephone=no" />
    <meta name="mobile-web-app-capable" content="yes" />
    {/* <meta name="msapplication-config" content="/browserconfig.xml" />
    <meta name="msapplication-TileColor" content="#2B5797" />
    <meta name="msapplication-tap-highlight" content="no" /> */}
    <meta name="theme-color" content="#f69435" />

    <link rel="apple-touch-icon" href="/touch-icon-iphone.png" />
    <link rel="apple-touch-icon" sizes="152x152" href="/touch-icon-ipad.png" />
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/touch-icon-iphone-retina.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="167x167"
      href="/touch-icon-ipad-retina.png"
    />

    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/manifest.json" />
  </>
);
