import db from "@/utils/lastPlayInfo"
const state = {
};
const mutations = {

};
const actions = {
  Add({ commit }, Data) {
    return new Promise((resolve, reject) => {
      Data._id = "0"
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
  Delete({ commit }) {
    return new Promise((resolve, reject) => {
      db.remove({ _id: "0" }, (err, docs) => {
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
