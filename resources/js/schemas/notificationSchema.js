import { schema } from 'normalizr';

export const notification = new schema.Entity('notifications', {}, { idAttribute: 'notification_id' });

export const notificationCollection = [notification];
