import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const tripStates = sqliteTable('trip_states', { userId: text('user_id').primaryKey(), payload: text('payload').notNull(), revision: integer('revision').notNull().default(0), updatedAt: text('updated_at').notNull() });
