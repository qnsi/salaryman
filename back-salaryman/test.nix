with import <nixpkgs> {};
mkShell {
  buildInputs = [
    postgresql
    nodejs
  ];

  shellHook = ''
    mkdir .test-tmp
    mkdir .test-tmp/sockets
    echo "unix_socket_directories = '$PWD/.test-tmp/sockets'" >> .test-tmp/mydb/postgresql.conf
    initdb -D .test-tmp/mydb
    pg_ctl -D .test-tmp/mydb -l logfile start
    createdb salaryman-test
    DATABASE_URL="postgresql://arturkesik@localhost:5432/salaryman-test" npx prisma migrate dev
    DATABASE_URL="postgresql://arturkesik@localhost:5432/salaryman-test" PORT=3333 npx ts-node index.ts

    function end {
          echo "Shutting down the database..."
          pg_ctl -D .tmp/mydb stop
          echo "Removing directories..."
          rm -rf .tmp/
        }
    trap end EXIT
  '';
}
