/*
 * B2 — The error handler never fires
 *
 * (a) The bug in one line: 
 * Missing check for res.ok - fetch does not reject on HTTP errors like 404
 *
 * (b) Root cause — why does fetch behave this way? 
 * fetch only rejects on network failures. for HTTP errors(404 , 500) it still resolves with res.ok =false
 * so try/ catch is never used until we manually throw an error when(data is not ok-!response) !res.ok
 */

// ---- original (buggy) ------------------------------------------------
// async function getProduct(id) {
//   try {
//     const res = await fetch(`https://dummyjson.com/products/${id}`);
//     const data = await res.json();
//     return data;
//   } catch {
//     console.log('Product not found');
//   }
// }

// ---- your fix (must throw a custom error class, not a string) ----------

  class ProductNotFound extends Error {
  constructor(id) {
    super(`Product ${id} not found`); //message it contains as super message.
    this.name = 'ProductNotFound';
  }
}

async function getProduct(id) {
    const res = await fetch(`https://dummyjson.com/products/${id}`);

    if (!res.ok) {
      throw new ProductNotFound(id);
    }

    const data = await res.json();
    return data;
  } 
  //getProduct(9).then(data => console.log(data)); // we get the data of a 9th id 
  getProduct(999999).catch((error) => {
    if (error instanceof ProductNotFound) {
      console.log('Product not found');
    } else {
      throw error;
    }
});
