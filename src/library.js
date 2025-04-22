import product from './features/product';

const ecommerceLib = async () => {
    const config = await fetch('/siteConfig.json').then(res => res.json());
    console.log('Loaded config from siteConfig.json:', config);

  // initialize other features based on config
  //product(); // just an example if product needs config
};

export default ecommerceLib;

ecommerceLib();