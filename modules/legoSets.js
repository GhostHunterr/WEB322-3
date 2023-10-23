// /********************************************************************************
//  *  WEB322 – Assignment 03
//  *
//  *  I declare that this assignment is my own work in accordance with Seneca's
//  *  Academic Integrity Policy:
//  *
//  *  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
//  *
//  *  Name: Farhan Sarang Student ID: 172963217 Date: 29/09/10
//  *
//  ********************************************************************************/
const setData = require("../data/setData.json");
const themeData = require("../data/themeData.json");

function initialize() {
  return new Promise((resolve, reject) => {
    sets = setData.map((set) => ({
      ...set,
      theme: themeData.find((theme) => theme.id === set.theme_id).name,
    }));
    resolve();
  });
}

function getAllSets() {
  return Promise.resolve(sets);
}

function getSetByNum(setNum) {
  const set = sets.find((set) => set.set_num === setNum);
  if (set) {
    return Promise.resolve(set);
  } else {
    return Promise.reject("Set not found");
  }
}

function getSetsByTheme(theme) {
  const lowerCaseTheme = theme.toLowerCase();
  const matchingSets = sets.filter((set) =>
    set.theme.toLowerCase().includes(lowerCaseTheme)
  );
  if (matchingSets.length > 0) {
    return Promise.resolve(matchingSets);
  } else {
    return Promise.reject("Sets not found for the specified theme");
  }
}

module.exports = {
  initialize,
  getAllSets,
  getSetByNum,
  getSetsByTheme,
};
