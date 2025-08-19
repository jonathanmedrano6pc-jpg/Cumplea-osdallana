import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const visits = pgTable("visits", {
  id: serial("id").primaryKey(),
  visitedAt: timestamp("visited_at").defaultNow().notNull(),
  userAgent: text("user_agent"),
  ipAddress: text("ip_address"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertVisitSchema = createInsertSchema(visits).pick({
  userAgent: true,
  ipAddress: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertVisit = z.infer<typeof insertVisitSchema>;
export type Visit = typeof visits.$inferSelect;
