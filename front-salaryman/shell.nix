with import <nixpkgs> {};
mkShell {
  buildInputs = [
    nodejs
  ];
  shellHook = ''
    npm start
  '';
}
