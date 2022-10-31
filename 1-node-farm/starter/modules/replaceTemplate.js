module.exports = (templateHtml, productItem) => {
  let text = templateHtml.replace(/{%PRODUCT_ID%}/gi, productItem.id);
  text = text.replace(/{%PRODUCT_NAME%}/g, productItem.productName);
  text = text.replace(/{%PRODUCT_IMAGE%}/g, productItem.image);
  text = text.replace(/{%PRODUCT_ORIGIN%}/g, productItem.from);
  text = text.replace(/{%PRODUCT_NUTRIENTS%}/g, productItem.nutrients);
  text = text.replace(/{%PRODUCT_QUANTITY%}/g, productItem.quantity);
  text = text.replace(/{%PRODUCT_PRICE%}/g, productItem.price);
  text = text.replace(/{%PRODUCT_DESCRIPTION%}/g, productItem.description);

  if (!productItem.organic) text = text.replace(/{%PRODUCT_IS_ORGANIC%}/g, "not-organic");

  return text;
};
