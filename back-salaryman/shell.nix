with import <nixpkgs> {};
mkShell {
  buildInputs = [
    postgresql
    nodejs
  ];

  shellHook = ''
    mkdir .tmp
    mkdir .tmp/sockets
    echo "unix_socket_directories = '$PWD/.tmp/sockets'" >> .tmp/mydb/postgresql.conf
    initdb -D .tmp/mydb
    pg_ctl -D .tmp/mydb -l logfile start
    createdb salaryman
    npx prisma migrate dev
    npm start

    function end {
          echo "Shutting down the database..."
          pg_ctl -D .tmp/mydb stop
          echo "Removing directories..."
          rm -rf .tmp/
        }
    trap end EXIT
  '';
}
