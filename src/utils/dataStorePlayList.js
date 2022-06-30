import Datastore from 'nedb';
export default new Datastore({
  autoload: true,
  // 指定数据库文件路径
  filename: './playlist.db'
})