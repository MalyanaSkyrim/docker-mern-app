import PouchDB from "pouchdb";

class DB {
  constructor(localdb, remotedb) {
    this.db = new PouchDB(localdb);
    this.remoteDB = new PouchDB(remotedb);
    this.db.sync(this.remoteDB, {
      live: true,
      retry: true
    });

    this.db
      .changes({
        since: "now",
        live: true,
        include_docs: true
      })
      .on("change", change => this.changeCB(change))
      .on("complete", function(info) {})
      .on("error", function(err) {
        console.log(err);
      });
  }

  async getAllPosts() {
    const posts = [];
    const result = await this.db.allDocs({ include_docs: true });
    result.rows.forEach(item => posts.push(item.doc));
    return posts;
  }

  async createPost(post) {
    await this.db.post(post);
    return "Post is created successfully";
  }

  async updatePost(post) {
    await this.db.put(post);
    return "Post is updated successfully";
  }

  async deletePost(post) {
    await this.db.remove(post);
    return "Post is deleted successfully";
  }
}

export default new DB("posts-db", "http://admin:1234@127.0.0.1:5984/posts-db");
