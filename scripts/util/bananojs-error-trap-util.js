'use strict';
// modules
const pawjs = require('@paw-digital/pawjs');
const pawjsHw = require('@paw-digital/pawjs-hw');

const mainConsoleLib = require('console');

// constants
const mainConsole = new mainConsoleLib.Console(process.stdout, process.stderr);
mainConsole.debug = () => {};

const ERROR_URL = 'https://pawjs.coranos.cc/api';

// variables
let url = ERROR_URL;
let app;
let useLedgerFlag = false;

// functions
const getErrorUrl = () => {
  return ERROR_URL;
};

const isErrorUrl = () => {
  return url == ERROR_URL;
};

const setApp = (_app) => {
  app = _app;
};

const setPawnodeApiUrl = (rpcUrl) => {
  if (rpcUrl) {
    url = rpcUrl;
    return pawjs.setPawnodeApiUrl(rpcUrl);
  } else {
    throw Error('rpcUrl is undefined or null.');
  }
};

const getAccountHistory = async (account, count, head, raw) => {
  try {
    if (isErrorUrl()) {
      throw Error('getAccountHistory');
    }
    return await pawjs.getAccountHistory(account, count, head, raw);
  } catch (error) {
    app.showAlert('error getting account history:' + error.message);
    return [];
  }
};

const getPrivateKey = async (seed, seedIx) => {
  try {
    if (isErrorUrl()) {
      throw Error('getPrivateKey');
    }
    // mainConsole.trace('getting account history', 'seedIx', seedIx);
    if (useLedgerFlag) {
      return await pawjsHw.getLedgerAccountSigner(seedIx);
    } else {
      return pawjs.getPrivateKey(seed, seedIx);
    }
  } catch (error) {
    // mainConsole.trace('error getting account history', 'seedIx', seedIx, error.message);
    app.showAlert('error getting account history:' + error.message);
    return undefined;
  }
};

const getPublicKey = async (privateKey) => {
  return await pawjs.getPublicKey(privateKey);
};

const getAccount = (publicKey) => {
  return pawjs.getPawAccount(publicKey);
};

const getRawStrFromPawStr = (amountPaws) => {
  return pawjs.getRawStrFromPawStr(amountPaws);
};

const getAccountsPending = async (account, count, source) => {
  try {
    if (isErrorUrl()) {
      throw Error('getAccountsPending');
    }
    return await pawjs.getAccountsPending(account, count, source);
  } catch (error) {
    app.showAlert('error getting account pending:' + error.message);
    return [];
  }
};

const getAccountPublicKey = (account) => {
  return pawjs.getAccountPublicKey(account);
};

const getCamoAccount = (camoPublicKey) => {
  return pawjs.getCamoAccount(camoPublicKey);
};

const getCamoPublicKey = (privateKey) => {
  return pawjs.getCamoPublicKey(privateKey);
};

const changePawRepresentativeForSeed = async (seed, seedIx, representative) => {
  try {
    if (isErrorUrl()) {
      throw Error('changePawRepresentativeForSeed');
    }
    return await pawjs.changePawRepresentativeForSeed(seed, seedIx, representative);
  } catch (error) {
    app.showAlert('error changing rep:' + error.message);
    return;
  }
};

const camoSendWithdrawalFromSeed = async (seed, sendFromSeedIx, sendToAccount, sendAmount) => {
  try {
    if (isErrorUrl()) {
      throw Error('camoSendWithdrawalFromSeed');
    }
    return await pawjs.camoPawSendWithdrawalFromSeed(seed, sendFromSeedIx, sendToAccount, sendAmount);
  } catch (error) {
    app.showAlert('error camo send withdrawal:' + error.message);
    return;
  }
};

const sendWithdrawalFromSeed = async (seed, sendFromSeedIx, sendToAccount, sendAmount) => {
  try {
    if (isErrorUrl()) {
      throw Error('sendWithdrawalFromSeed');
    }
    if (useLedgerFlag) {
      const config = pawjsHw.getConfig();
      pawjs.pawnodeApi.setUrl(config.pawnodeUrl);
      const accountSigner = await pawjsHw.getLedgerAccountSigner(sendFromSeedIx);
      try {
        const amountRaw = pawjs.getPawDecimalAmountAsRaw(sendAmount);
        const response = await pawjs.pawUtil.sendFromPrivateKey(pawjs.pawnodeApi, accountSigner, sendToAccount, amountRaw, config.prefix);
        console.log('paw sendpaw response', response);
        return response;
      } catch (error) {
        console.log('paw sendpaw error', error.message);
        return error.message;
      }
    } else {
      return await pawjs.sendPawWithdrawalFromSeed(seed, sendFromSeedIx, sendToAccount, sendAmount);
    }
  } catch (error) {
    app.showAlert('error send withdrawal:' + error.message);
    return;
  }
};

const getPawPartsFromRaw = (amount) => {
  return pawjs.getPawPartsFromRaw(amount);
};

const getAccountInfo = async (account, representativeFlag) => {
  try {
    if (isErrorUrl()) {
      throw Error('getAccountInfo');
    }
    return await pawjs.getAccountInfo(account, representativeFlag);
  } catch (error) {
    app.showAlert('error:' + error.message);
    const retval = {};
    retval.error = 'Error Testnet Selected';
    return retval;
  };
};

const getBlockCount = async () => {
  try {
    if (isErrorUrl()) {
      throw Error('getBlockCount');
    }
    return await pawjs.getBlockCount();
  } catch (error) {
    app.showAlert('error get block count:' + error.message);
    const retval = {};
    retval.count = -1;
    return retval;
  }
};

const getCamoAccountValidationInfo = (camoAccount) => {
  return pawjs.getCamoAccountValidationInfo(camoAccount);
};

const getAccountValidationInfo = (banAccount) => {
  return pawjs.getPawAccountValidationInfo(banAccount);
};

const getCamoSharedAccountData = async (seed, seedIx, sendToAccount, sharedSeedIx) => {
  try {
    if (isErrorUrl()) {
      throw Error('getCamoSharedAccountData');
    }
    if (useLedgerFlag) {
      app.showAlert('cannot use camo with ledger.');
    } else {
      return await pawjs.getCamoPawSharedAccountData(seed, seedIx, sendToAccount, sharedSeedIx);
    }
  } catch (error) {
    app.showAlert('error getting camo shared acount data:' + error.message);
    return;
  }
};

const camoGetAccountsPending = async (seed, seedIx, sendToAccount, sharedSeedIx, count) => {
  try {
    if (isErrorUrl()) {
      throw Error('camoGetAccountsPending');
    }
    if (useLedgerFlag) {
      app.showAlert('cannot use camo with ledger.');
    } else {
      return await pawjs.camoPawGetAccountsPending(seed, seedIx, sendToAccount, sharedSeedIx, count);
    }
  } catch (error) {
    app.showAlert('error get account pending:' + error.message);
    return;
  }
};

const receiveCamoDepositsForSeed = async (seed, seedIx, sendToAccount, sharedSeedIx, hash) => {
  try {
    if (isErrorUrl()) {
      throw Error('receiveCamoDepositsForSeed');
    }
    if (useLedgerFlag) {
      app.showAlert('cannot use camo with ledger.');
    } else {
      return await pawjs.receiveCamoPawDepositsForSeed(seed, seedIx, sendToAccount, sharedSeedIx, hash);
    }
  } catch (error) {
    app.showAlert('error receive camo deposit:' + error.message);
    return;
  }
};

const receiveDepositsForSeed = async (seed, seedIx, representative, hash) => {
  try {
    if (isErrorUrl()) {
      throw Error('receiveDepositsForSeed');
    }

    if (useLedgerFlag) {
      const accountSigner = await pawjsHw.getLedgerAccountSigner(seedIx);
      const account = accountSigner.getAccount();
      let representative = await pawjs.pawnodeApi.getAccountRepresentative(account);
      if (!(representative)) {
        representative = account;
      }
      try {
        const config = pawjsHw.getConfig();
        const response = await pawjs.depositUtil.receive(pawjs.loggingUtil, pawjs.pawnodeApi, account, accountSigner, representative, hash, config.prefix);
        console.log('paw receive response', JSON.stringify(response));
        return response;
      } catch (error) {
        console.trace( error);
      }
    } else {
      return await pawjs.receivePawDepositsForSeed(seed, seedIx, representative, hash);
    }
  } catch (error) {
    app.showAlert('error receive deposit:' + error.message);
    return;
  }
};

const getLedgerInfo = async () => {
  try {
    if (isErrorUrl()) {
      throw Error('getLedgerInfo');
    }
    return await pawjsHw.getLedgerInfo();
  } catch (error) {
    // mainConsole.trace('getLedgerInfo', error);
    app.showAlert('error getting ledger info:' + error.message);
    return;
  }
};

const setUseLedgerFlag = (_useLedgerFlag) => {
  useLedgerFlag = _useLedgerFlag;
};

exports.setUseLedgerFlag = setUseLedgerFlag;
exports.getLedgerInfo = getLedgerInfo;
exports.getRawStrFromPawStr = getRawStrFromPawStr;
exports.setPawnodeApiUrl = setPawnodeApiUrl;
exports.getAccountHistory = getAccountHistory;
exports.getAccountsPending = getAccountsPending;
exports.getPrivateKey = getPrivateKey;
exports.getPublicKey = getPublicKey;
exports.getAccount = getAccount;
exports.getErrorUrl = getErrorUrl;
exports.getCamoAccountValidationInfo = getCamoAccountValidationInfo;
exports.getAccountValidationInfo = getAccountValidationInfo;
exports.getAccountPublicKey = getAccountPublicKey;
exports.getCamoAccount = getCamoAccount;
exports.getCamoPublicKey = getCamoPublicKey;
exports.getAccountInfo = getAccountInfo;
exports.getBlockCount = getBlockCount;
exports.getPawPartsFromRaw = getPawPartsFromRaw;
exports.changePawRepresentativeForSeed = changePawRepresentativeForSeed;
exports.camoSendWithdrawalFromSeed = camoSendWithdrawalFromSeed;
exports.sendWithdrawalFromSeed = sendWithdrawalFromSeed;
exports.getCamoSharedAccountData = getCamoSharedAccountData;
exports.camoGetAccountsPending = camoGetAccountsPending;
exports.receiveCamoDepositsForSeed = receiveCamoDepositsForSeed;
exports.receiveDepositsForSeed = receiveDepositsForSeed;
exports.setApp = setApp;
