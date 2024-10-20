CREATE TABLE `time-me-daddy_projects` (
	`id` text(256) PRIMARY KEY NOT NULL,
	`owner_id` text(256),
	`org_id` text(256),
	`name` text(256),
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `time-me-daddy_tasks` (
	`owner_id` text(256),
	`id` text(256) PRIMARY KEY NOT NULL,
	`project_id` text(256),
	`name` text(256),
	`description` text(256),
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`project_id`) REFERENCES `time-me-daddy_projects`(`id`) ON UPDATE no action ON DELETE no action
);
