with import <nixpkgs> {};
mkShell {
  buildInputs = [
    nodejs
  ];
  shellHook = ''
    PORT=3002 REACT_APP_BACKEND_URL="http://localhost:3333" npm start
  '';
}
