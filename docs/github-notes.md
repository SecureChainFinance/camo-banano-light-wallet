### force only one version of camo-banano-light-wallet

rm -rf .git;
git init;
find . -exec touch {} \;
git add .;
git commit -m "Initial commit";
git remote add origin https://github.com/SecureChainFinance/camo-paw-light-wallet.git;
git push -u --force origin master;
git branch --set-upstream-to=origin/master master;
git pull;git push;
