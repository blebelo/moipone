param(
    [string]$DbHost = "dpg-d4ub056uk2gs738ntk50-a.oregon-postgres.render.com",
    [int]$Port = 5432,
    [string]$Database = "moipone_ps",
    [string]$Username = "moipone_ps_user",
    [string]$Password = "UNhtPfLWUJFkGJzNzKqBrJI4yuCJt9o4"
)

# Set password as environment variable for psql
$env:PGPASSWORD = $Password

# SQL script to drop everything in public schema
$sql = @'
DO
$$
DECLARE
    r RECORD;
BEGIN
    -- Drop tables
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP TABLE IF EXISTS public.' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP;

    -- Drop sequences
    FOR r IN (SELECT sequencename FROM pg_sequences WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP SEQUENCE IF EXISTS public.' || quote_ident(r.sequencename) || ' CASCADE';
    END LOOP;

    -- Drop views
    FOR r IN (SELECT table_name FROM information_schema.views WHERE table_schema = 'public') LOOP
        EXECUTE 'DROP VIEW IF EXISTS public.' || quote_ident(r.table_name) || ' CASCADE';
    END LOOP;
END
$$;
'@

# Run the SQL script using psql
psql -h $DbHost -p $Port -U $Username -d $Database -c $sql

# Clear password from environment
Remove-Item Env:PGPASSWORD
