import { schema } from 'normalizr';

export const listing = new schema.Entity('listings');

export const listingCollection = [ listing ];
