const API_URL = 'https://dummyjson.com/products?limit=20';
const PRICE_LIMIT = 500;

const boardEl = document.querySelector('#board');
const statusEl = document.querySelector('#status');
const summaryEl = document.querySelector('#summary');
const selectedCountEl = document.querySelector('#selected-count');
const filterEl = document.querySelector('#filter');
const retryEl = document.querySelector('#retry');

const state = {
  products: [],
  selected: new Set(),
};

/* ---------- provided helpers — no marks, do not change ---------- */

function setStatus(message) {
  statusEl.textContent = message;
  statusEl.hidden = !message;
}

function cardTemplate(product) {
  return `
    <article class="card" data-id="${product.id}">
      <h3>${product.title}</h3>
      <p>${product.category}</p>
      <strong>${product.price}</strong>
    </article>
  `;
}

function renderCards(products) {
  boardEl.innerHTML = products.map(cardTemplate).join('');
  state.selected.forEach((id) => {
    const card = boardEl.querySelector(`[data-id="${id}"]`);
    if (card) card.classList.add('selected');
  });
}

function render() {
  const visible = filterEl.checked
    ? minPrice(PRICE_LIMIT)(state.products)
    : state.products;

  renderCards(visible);
  summaryEl.textContent = summarise(visible);
  selectedCountEl.textContent = `Selected: ${state.selected.size}`;
}

/* ---------- your work starts here ---------- */

// TODO (req 2): a custom error class carrying the HTTP status
class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'ApiError';
    this.status = status;
  }
}

// TODO (req 5): curried and pure — minPrice(500)(products) returns a NEW array
const minPrice = (limit) => (products) => {
  return products.filter(p => p.price >= limit)
};

// TODO (req 3): use reduce. Return a string like:
// "12 products · avg 342.50 · top: Laptop"
function summarise(products) {
  if(products.length===0) return 
  '0 products . avg 0.00 . top : -';
  const { total, top} = products.reduce(
    (acc,p) => {
      acc.total += p.price;
      if(p.price > acc.top.price) acc.top =p;
      return acc;
    },
    {total: 0, top : products[0]}
  )
  return `${products.length} products.avg ${(total / products.length).toFixed(2)} . top: ${top.title}`
}

// TODO (req 1 + 2): loading state, res.ok check, throw ApiError,
// catch it, show a message, reveal the retry button, then render()
async function loadProducts() {
   try {
    setStatus('Loading...');
    retryEl.hidden = true;
    const res = await fetch(API_URL);
    if (!res.ok) throw new ApiError(res.statusText, res.status);
    const data = await res.json();
    state.products = data.products;
    setStatus('');
    render();
  } catch (err) {
    setStatus(`Error ${err.status || ''}: ${err.message}`);
    retryEl.hidden = false;
  }
}

// TODO (req 4): ONE delegated click listener on boardEl.
// Toggle .selected, update state.selected, keep the count in sync.

boardEl.addEventListener('click', (e) => {
  const card = e.target.closest('.card');
  if (!card) return;
  const id = Number(card.dataset.id);
  card.classList.toggle('selected');
  if (card.classList.contains('selected')) state.selected.add(id);
  else state.selected.delete(id);
  selectedCountEl.textContent = `Selected: ${state.selected.size}`;
});
filterEl.addEventListener('change', render);
retryEl.addEventListener('click', loadProducts);

loadProducts();
