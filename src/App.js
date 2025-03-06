import React from 'react';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
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
  CurrentRefinements
} from 'react-instantsearch';

const searchClient = algoliasearch('D1T6069SVF', '2c559a44bcc5c5d8ae4eed1293958f98');

function Hit({ hit }){
  return (
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
  </article>
  )
}


function App () {
    return (
      <InstantSearch searchClient ={searchClient} indexName="products">

        <Configure hitsPerPage={12} />
        
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

