import React from 'react';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
// Import in the React Components that are used in the application.
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  Configure,
  Stats,
  SortBy,
  Pagination,
  RefinementList,
  ClearRefinements,
  HierarchicalMenu,
  RangeInput,
  CurrentRefinements
} from 'react-instantsearch';

// Configure the instance and access key.
const searchClient = algoliasearch('D1T6069SVF', 'ELECTRONICS');

// Render the product results grid.
function Hit({ hit }){
  return (
  <a class="hit-link" href="/">
    <article class="hit">
      <div>
          <header class="hit-image-container">
              <img class='hit-image' src={hit.image} alt={hit.name} />
          </header>
      </div>
      <p class="hit-category">{hit.categories[0]}</p>
      <h3 class='hit-content'>
        <Highlight attribute="name" hit={hit} />
      </h3>
      <p class='hit-price'>${hit.price}</p>
      <div class="add2cart">
        <button class="add-to-cart">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2 10h13l2-6H6"></path>
            </svg>
            Add to Cart
        </button>
      </div>
    </article>
  </a>
  )
}

// Configure the React InstantSearch Application
function App () {
    return (
      // Configure the InstantSearch Component.
      <InstantSearch searchClient ={searchClient} indexName="products"> {/* Specify the index name. */}
  
        <Configure hitsPerPage={12} /> {/* Configure the numbrer of hits per page. */}
        
        <header class="header">
          <a href='/'><img class="logoImg" src="ElectronicStore.png" /></a>
          <SearchBox placeholder='Search for Products ...'/>
        </header>
        <main>
          <div class='sidebar'>
            <div class='filter-header'>
              <ClearRefinements />
            </div>
            <div class='filter-box'>
                <h1 class='filter-label'>Category</h1>
                <HierarchicalMenu label='Category' limit={5} showMore={true} attributes={['hierarchicalCategories.lvl0', 'hierarchicalCategories.lvl1', 'hierarchicalCategories.lvl2', 'hierarchicalCategories.lvl3']} />
                
                <h1 class='filter-label'>Brand</h1>
                <RefinementList label='Brand' attribute="brand" searchable = {true} showMore = {true} limit = {5} />

                <h1 class='filter-label'>Price</h1>
                <RangeInput attribute="price" precision={2} />

                <h1 class='filter-label'>Type</h1>
                <RefinementList attribute="type" showMore = {true} limit = {5} />

            </div>
          </div>
          <div class='results'>
            <div class='filters-selected'>
              <CurrentRefinements />
            </div>
            <div class='info'>
              <Stats />
              <SortBy items={[
                { label: 'Featured', value: 'products' },
                { label: 'Price - Low to High', value: 'products_price_asc' },
                { label: 'Price - High to Low', value: 'products_price_dsc' },
              ]}
              />
            </div>
            <Hits hitComponent={Hit} />
            <div class='page-nav'>
              <Pagination />
            </div>
          </div>

        </main>

      </InstantSearch>
    );
}

export default App;

