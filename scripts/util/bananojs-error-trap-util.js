'use strict';
// modules
const bananojs = require('@bananocoin/bananojs');

// constants
const ERROR_URL = 'https://bananojs.coranos.cc/api';

// variables
let url = ERROR_URL;

// functions
const isErrorUrl = () => {
  return url == ERROR_URL;
};

const getAccountHistory = async (account, count, head, raw) => {
  try {
    if (isErrorUrl()) {
      throw Error('getAccountHistory');
    }
    return await bananojs.getAccountHistory(account, count, head, raw);
  } catch (error) {
    alert('error getting account history:' + error.message);
    return;
  }
};

const setBananodeApiUrl = (rpcUrl) => {
  url = rpcUrl;
  return bananojs.setBananodeApiUrl(rpcUrl);
};

const getPrivateKey = (seed, seedIx) => {
  try {
    if (isErrorUrl()) {
      throw Error('getPrivateKey');
    }
    return bananojs.getPrivateKey(seed, seedIx);
  } catch (error) {
    alert('error getting private key from seed:' + error.message);
    return;
  }
};

const getPublicKey = (privateKey) => {
  try {
    if (isErrorUrl()) {
      throw Error('getPublicKey');
    }
    return bananojs.getPublicKey(privateKey);
  } catch (error) {
    alert('error getting public key from private key:' + error.message);
    return;
  }
};

const getAccount = (publicKey) => {
  try {
    if (isErrorUrl()) {
      throw Error('getAccount');
    }
    return bananojs.getAccount(publicKey);
  } catch (error) {
    alert('error getting account from public key:' + error.message);
    return;
  }
};

const getAccountsPending = async (account, count) => {
  try {
    if (isErrorUrl()) {
      throw Error('getAccountsPending');
    }
    return await bananojs.getAccountsPending(account, count);
  } catch (error) {
    alert('error getting account pending:' + error.message);
    return;
  }
};

const getUrl = () => {
  return;
};

const getAccountPublicKey = (account) => {
  return bananojs.getAccountPublicKey(account);
};

const getCamoAccount = (camoPublicKey) => {
  return bananojs.getCamoAccount(camoPublicKey);
};

const getCamoPublicKey = (privateKey) => {
  return bananojs.getCamoPublicKey(privateKey);
};

const changeRepresentativeForSeed = async (seed, seedIx, representative) => {
  try {
    if (isErrorUrl()) {
      throw Error('changeRepresentativeForSeed');
    }
    return await bananojs.changeRepresentativeForSeed(seed, seedIx, representative);
  } catch (error) {
    alert('error:' + error.message);
    return;
  }
};

const camoSendWithdrawalFromSeed = async (seed, sendFromSeedIx, sendToAccount, sendAmount) => {
  try {
    if (isErrorUrl()) {
      throw Error('camoSendWithdrawalFromSeed');
    }
    return await bananojs.camoSendWithdrawalFromSeed(seed, sendFromSeedIx, sendToAccount, sendAmount);
  } catch (error) {
    alert('error:' + error.message);
    return;
  }
};

const sendWithdrawalFromSeed = async (seed, sendFromSeedIx, sendToAccount, sendAmount) => {
  try {
    if (isErrorUrl()) {
      throw Error('sendWithdrawalFromSeed');
    }
    return await bananojs.sendWithdrawalFromSeed(seed, sendFromSeedIx, sendToAccount, sendAmount);
  } catch (error) {
    alert('error:' + error.message);
    return;
  }
};

const getBananoPartsFromRaw = (amount) => {
  try {
    if (isErrorUrl()) {
      throw Error('getBananoPartsFromRaw');
    }
    return bananojs.getBananoPartsFromRaw(amount);
  } catch (error) {
    alert('error:' + error.message);
    return;
  }
};

const getAccountInfo = async (account, representativeFlag) => {
  try {
    if (isErrorUrl()) {
      throw Error('getAccountInfo');
    }
    return await bananojs.getAccountInfo(account, representativeFlag);
  } catch (error) {
    alert('error:' + error.message);
    return;
  };
};

const getBlockCount = async () => {
  try {
    if (isErrorUrl()) {
      throw Error('getBlockCount');
    }
    return await bananojs.getBlockCount();
  } catch (error) {
    alert('error:' + error.message);
    return;
  }
};

const getCamoAccountValidationInfo = (camoAccount) => {
  return bananojs.getCamoAccountValidationInfo(camoAccount);
};

const getAccountValidationInfo = (banAccount) => {
  return bananojs.getAccountValidationInfo(banAccount);
};

const getCamoSharedAccountData = async (seed, seedIx, sendToAccount, sharedSeedIx) => {
  try {
    if (isErrorUrl()) {
      throw Error('getCamoSharedAccountData');
    }
    return await bananojs.getCamoSharedAccountData(seed, seedIx, sendToAccount, sharedSeedIx);
  } catch (error) {
    alert('error:' + error.message);
    return;
  }
};

const camoGetAccountsPending = async (seed, seedIx, sendToAccount, sharedSeedIx, count) => {
  try {
    if (isErrorUrl()) {
      throw Error('camoGetAccountsPending');
    }
    return await bananojs.camoGetAccountsPending(seed, seedIx, sendToAccount, sharedSeedIx, count);
  } catch (error) {
    alert('error:' + error.message);
    return;
  }
};

const receiveCamoDepositsForSeed = async (seed, seedIx, sendToAccount, sharedSeedIx, hash) => {
  try {
    if (isErrorUrl()) {
      throw Error('receiveCamoDepositsForSeed');
    }
    return await bananojs.receiveCamoDepositsForSeed(seed, seedIx, sendToAccount, sharedSeedIx, hash);
  } catch (error) {
    alert('error:' + error.message);
    return;
  }
};

const receiveDepositsForSeed = async (seed, seedIx, representative, hash) => {
  try {
    if (isErrorUrl()) {
      throw Error('receiveDepositsForSeed');
    }
    return await bananojs.receiveDepositsForSeed(seed, seedIx, representative, hash);
  } catch (error) {
    alert('error:' + error.message);
    return;
  }
};

exports.setBananodeApiUrl = setBananodeApiUrl;
exports.getAccountHistory = getAccountHistory;
exports.getAccountsPending = getAccountsPending;
exports.getPrivateKey = getPrivateKey;
exports.getPublicKey = getPublicKey;
exports.getAccount = getAccount;
exports.getUrl = getUrl;
exports.getCamoAccountValidationInfo = getCamoAccountValidationInfo;
exports.getAccountValidationInfo = getAccountValidationInfo;
exports.getAccountPublicKey = getAccountPublicKey;
exports.getCamoAccount = getCamoAccount;
exports.getCamoPublicKey = getCamoPublicKey;
exports.getAccountInfo = getAccountInfo;
exports.getBlockCount = getBlockCount;
