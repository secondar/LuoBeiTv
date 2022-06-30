import db from "@/utils/dataStorePlayList"
const state = {
};
const mutations = {

};
const actions = {
  Add({ commit }, Data) {
    return new Promise((resolve, reject) => {
      db.insert(Data, function (err, doc) {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  },
  Select({ commit }, Where) {
    return new Promise((resolve, reject) => {
      db.find(Where, (err, docs) => {
        if (err) {
          reject(err)
        } else {
          resolve(docs)
        }
      });
    })
  },
  Edit({ commit }, Data) { //Data 徐包含 Where 和 Data
    return new Promise((resolve, reject) => {
      db.update(Data.Where, Data.Data, (err, docs) => {
        if (err) {
          reject(err)
        } else {
          resolve(docs)
        }
      });
    })
  },
  Delete({ commit }, Where) {
    return new Promise((resolve, reject) => {
      db.remove(Where, (err, docs) => {
        if (err) {
          reject(err)
        } else {
          resolve(docs)
        }
      });
    })
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
