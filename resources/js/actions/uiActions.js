import { CLEAR_CONTROLS, LOAD_LEAD_CONTROLS, LOAD_LISTING_CONTROLS } from './types';

export const loadListingControls = () => {
    return { type: LOAD_LISTING_CONTROLS };
};

export const loadLeadControls = () => {
    return { type: LOAD_LEAD_CONTROLS };
};

export const clearControls = () => {
    return { type: CLEAR_CONTROLS };
};
