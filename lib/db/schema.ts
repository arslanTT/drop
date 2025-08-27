import { relations } from "drizzle-orm";
import {
  integer,
  text,
  uuid,
  boolean,
  timestamp,
  pgTable,
} from "drizzle-orm/pg-core";

export const files = pgTable("files", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  path: text("path").notNull(),
  size: integer("size").notNull(),
  type: text("type").notNull(), //folder
  //storage information
  fileUrl: text("file_url").notNull(), //url to access file
  thumbnailUrl: text("thumbnail_url"),
  //ownerShip
  userId: text("user_id").notNull(),
  parentId: text("parent_id"), // parent folder id(null for root items)
  //file / folder flags
  isFolder: boolean("is_folder").default(false).notNull(),
  isStarred: boolean("is_starred").default(false).notNull(),
  isTrash: boolean("is_trash").default(false).notNull(),

  //timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/*
parent: Each file/folder can have only one parent folder
children: Each folder can have many children files/folders 
*/
export const fileRelations = relations(files, ({ one, many }) => ({
  parent: one(files, {
    fields: [files.parentId],
    references: [files.id],
  }),
  children: many(files),
}));

//type  definations

export const File = typeof files.$inferSelect;
export const NewFile = typeof files.$inferInsert;
