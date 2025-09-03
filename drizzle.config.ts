import {defineConfig} from "drizzle-kit";

export default defineConfig({
    dialect:"postgresql",
    schema : './src/lib/db/schema.ts',
    out:'./drizzle', //This specifies the output directory where Drizzle Kit will save the generated migration files.

    dbCredentials:{
        url: process.env.DATABASE_URL! as string
    },
    verbose:  true,
    strict : true
})