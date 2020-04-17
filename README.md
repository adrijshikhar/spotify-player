# spotify-player

1. Clone the repo
2. Install nvm - Node Version Manager
    * `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash`
    * `export NVM_DIR="${XDG_CONFIG_HOME/:-$HOME/.}nvm" [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"`
    * run `command -v nvm` to check to installation
    * if not then, create a file with `touch ~/.bash_profile` and run the install script again
    * For more refer <https://github.com/nvm-sh/nvm#installation-and-update>
    * after installing nvm run `nvm install node && nvm use node`
3. Copy `config/sample.config.js` to `config/config.js` and fill the required entries
4. Run  `npm install`
5. Run `npm start -s`  and `node server/app.js` for development build

### visit <https://localhost:8000/>
