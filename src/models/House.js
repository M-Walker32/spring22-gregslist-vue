export class House {
  constructor(data = {}){
    this.id = data._id
    this.bedrooms = data.bedrooms
    this.bathrooms = data.bathrooms
    this.levels = data.levels
    this.year = data.year
    this.imgUrl = data.imgUrl
    this.price = data.price
    this.description = data.description
  }
}