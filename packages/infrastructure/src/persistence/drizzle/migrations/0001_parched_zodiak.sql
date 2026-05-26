CREATE TYPE "public"."rol_usuario" AS ENUM('administrador', 'miembro');--> statement-breakpoint
CREATE TABLE "sesion" (
	"id" uuid PRIMARY KEY NOT NULL,
	"token_hash" text NOT NULL,
	"usuario_id" uuid NOT NULL,
	"usuario_real_id" uuid NOT NULL,
	"creado_en" timestamp with time zone NOT NULL,
	"actualizado_en" timestamp with time zone NOT NULL,
	"expira_en" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "usuario" (
	"id" uuid PRIMARY KEY NOT NULL,
	"persona_id" uuid NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"rol" "rol_usuario" NOT NULL,
	"creado_en" timestamp with time zone NOT NULL,
	"actualizado_en" timestamp with time zone NOT NULL,
	CONSTRAINT "usuario_persona_id_unique" UNIQUE("persona_id")
);
--> statement-breakpoint
ALTER TABLE "sesion" ADD CONSTRAINT "sesion_usuario_id_usuario_id_fk" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuario"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sesion" ADD CONSTRAINT "sesion_usuario_real_id_usuario_id_fk" FOREIGN KEY ("usuario_real_id") REFERENCES "public"."usuario"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_persona_id_persona_id_fk" FOREIGN KEY ("persona_id") REFERENCES "public"."persona"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "sesion_token_hash_unique" ON "sesion" USING btree ("token_hash");--> statement-breakpoint
CREATE UNIQUE INDEX "usuario_email_unique" ON "usuario" USING btree ("email");