import React, { useState } from 'react';
import Searchbox from './SearchBox';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';

import {
    InstantSearch,
    Hits,
    Highlight,
    RefinementList,
    Pagination,
} from 'react-instantsearch-dom';

interface IIndex {
    indexName: string;
}
interface Hit {
    id: string;
    name: string;
    description: string;
}

const searchClient = instantMeiliSearch(
    'http://localhost:7700',
    '',
);

const SwiftSearch = ({ indexName }: IIndex, children: any) => (
    <InstantSearch searchClient={searchClient} indexName={indexName}>
        <Searchbox />
        {/* <ClearRefinements />
        <RefinementList attribute="" />
        <Hits />
        <Pagination />
        {children} */}
    </InstantSearch>
);

export default SwiftSearch;


