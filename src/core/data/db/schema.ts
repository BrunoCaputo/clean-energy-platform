import { pgTable, real, text, timestamp, varchar } from 'drizzle-orm/pg-core'

import { createId } from '@/utils/create-id'

export const consumption = pgTable('consumption', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  monthCost: real('monthCost').notNull(),
  city: text('city').notNull(),
  state: varchar('state', { length: 2 }).notNull(),
  supply: text('supply', {
    enum: ['single-phase', 'two-phase', 'three-phase'],
  }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  leadId: text('lead_id')
    .references(() => lead.id)
    .notNull(),
})

export const lead = pgTable('lead', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  phone: text('phone').unique().notNull(),
  cpf: varchar('cpf', { length: 11 }).unique().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const admin = pgTable('admin', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
})
