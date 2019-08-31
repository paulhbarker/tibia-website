import { SET_PAGINATION, SET_VISIBLE } from './types';

const setPaginationFor = prefix => {
    const setPagination = data => {
        const { currentPage, totalPages } = data;
        return {
            type: prefix + SET_PAGINATION,
            payload: { currentPage, totalPages }
        };
    };

    return setPagination;
};

export const setLeadPagination = data => setPaginationFor('LEADS_')(data);

export const setListingsPagination = data => setPaginationFor('LISTINGS_')(data);
