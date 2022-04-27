import { AppState } from "../AppState.js";
import { House } from "../models/House.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService"


class HousesService{
  // get all houses
  async getHouses(){
    const res = await api.get('api/houses')
    logger.log(res)
    AppState.houses = res.data.map(h => new House(h))
  }

  // get by Id
  async getHouseById(id){
    const res = await api.get('api/houses/'+ id)
    AppState.house = new House(res.data)
  }
  // delete
  async deleteHouse(id){
    await api.delete('api/houses/'+ id)
  }
  // create
async createHouse(newHouse) {
  const res = await api.post('api/houses', newHouse)
  AppState.houses.push(new House (res.data))
  return res.data
}
  // edit
  async editHouse(editedHouse){
    const res = await api.put('api/houses/'+ editedHouse.id, editedHouse)
    AppState.house = new House(res.data)
  }
}

export const housesService = new HousesService()