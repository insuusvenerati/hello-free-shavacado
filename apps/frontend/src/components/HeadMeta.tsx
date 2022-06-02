export const HeadMeta = ({ title }: { title: string }) => (
  <>
    <meta content={title} name="application-name" />
    <meta content="yes" name="apple-mobile-web-app-capable" />
    <meta content="default" name="apple-mobile-web-app-status-bar-style" />
    <meta content={title} name="apple-mobile-web-app-title" />
    <meta content="telephone=no" name="format-detection" />
    <meta content="yes" name="mobile-web-app-capable" />
    {/* <meta name="msapplication-config" content="/browserconfig.xml" />
    <meta name="msapplication-TileColor" content="#2B5797" />
    <meta name="msapplication-tap-highlight" content="no" /> */}
    <meta content="#f69435" name="theme-color" />

    <link href="/touch-icon-iphone.png" rel="apple-touch-icon" />
    <link href="/touch-icon-ipad.png" rel="apple-touch-icon" sizes="152x152" />
    <link href="/touch-icon-iphone-retina.png" rel="apple-touch-icon" sizes="180x180" />
    <link href="/touch-icon-ipad-retina.png" rel="apple-touch-icon" sizes="167x167" />

    <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
    <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
    <link href="/manifest.json" rel="manifest" />
  </>
);
