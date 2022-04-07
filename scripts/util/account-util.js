'use strict';

// modules
const pawjsErrorTrap = require('./pawjs-error-trap-util.js');

const backgroundUtil = require('./background-util.js');
// constants

// variables

// functions
const setAccountDataFromSeed = async (rpcUrl, seed, accountData) => {
  pawjsErrorTrap.setBananodeApiUrl(rpcUrl);
  let hasMoreHistoryOrPending = true;
  let seedIx = 0;
  accountData.length = 0;
  while (hasMoreHistoryOrPending) {
    backgroundUtil.updatePleaseWaitStatus(`getting account data at seed index ${seedIx}.`);
    // console.log('setAccountDataFromSeed', seedIx);
    const accountDataElt = {};
    accountDataElt.seedIx = seedIx;
    accountDataElt.privateKey = await pawjsErrorTrap.getPrivateKey(seed, accountDataElt.seedIx);
    if (accountDataElt.privateKey) {
      accountDataElt.publicKey = await pawjsErrorTrap.getPublicKey(accountDataElt.privateKey);
      accountDataElt.account = pawjsErrorTrap.getAccount(accountDataElt.publicKey);
      accountData.push(accountDataElt);
      const accountHistory = await pawjsErrorTrap.getAccountHistory(accountDataElt.account, 1);
      const accountPending = await pawjsErrorTrap.getAccountsPending([accountDataElt.account], 1);
      accountDataElt.hasPending = false;
      if (accountPending) {
        if (accountPending.blocks) {
          const accountsPendingKeys = [...Object.keys(accountPending.blocks)];
          accountsPendingKeys.forEach((accountsPendingKey) => {
            const hashMap = accountPending.blocks[accountsPendingKey];
            if (hashMap) {
              const hashes = [...Object.keys(hashMap)];
              if (hashes.length > 0) {
                accountDataElt.hasPending = true;
              }
            }
          });
        }
      }
      if ((accountHistory) && (accountHistory.history)) {
        accountDataElt.hasHistory = true;
      } else {
        accountDataElt.hasHistory = false;
      }
      if (!accountDataElt.hasHistory) {
        if (!accountDataElt.hasPending) {
          hasMoreHistoryOrPending = false;
        }
      }
      seedIx++;
    } else {
      hasMoreHistoryOrPending = false;
    }
  }
};

// exports
exports.setAccountDataFromSeed = setAccountDataFromSeed;
