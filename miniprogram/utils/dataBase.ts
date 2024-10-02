const db = wx.cloud.database()
class MyCollection {
  collection: DB.CollectionReference
  constructor(collectionName: string) {
    this.collection = db.collection(collectionName)
  }

  add(data: DB.IDocumentData) {
    return this.collection.add({
      data
    })
  }

  remove(condition: DB.DocumentId | DB.IQueryCondition) {
    if (typeof condition === 'number' || typeof condition === 'string') {
      return this.collection.doc(condition).remove()
    } else {
      return (this.collection.where(condition) as ExtendedQuery).remove()
    }
  }

  update(condition: DB.DocumentId | DB.IQueryCondition, data: any) {
    if (typeof condition === 'number' || typeof condition === 'string') {
      return this.collection.doc(condition).update({ data })
    } else {
      return (this.collection.where(condition) as ExtendedQuery).update({ data })
    }
  }

  query(offset: number, max: number, condition: DB.DocumentId | DB.IQueryCondition) {
    if (typeof condition === 'number' || typeof condition === 'string') {
      return this.collection.doc(condition).get()
    } else {
      return this.collection.where(condition).skip(offset).limit(max).get()
    }
  }
}

export const starCollection = new MyCollection('c_star')
export const likeCollection = new MyCollection('c_like')
export const songSheetCollection = new MyCollection('c_song_sheet')