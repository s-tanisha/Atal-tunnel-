import { Model } from 'mongoose';
import { DATA_MODELS } from '../constants';
import modelsObejct from '../models/index';

//mongodb curd helper
class MongoDataHelper {
  static instance: MongoDataHelper = null;

  static getInstance = () => {
    if (!MongoDataHelper.instance) {
      MongoDataHelper.instance = new MongoDataHelper();
      delete MongoDataHelper.constructor;
    }
    return MongoDataHelper.instance;
  };

  /**
   * get the total document count stored in choosen collection
   * @param name
   * @param query
   * @returns
   */
  public getCount = async (name: string, query?: any) => {
    try {
      this._checkModel(name);

      if (query) {
        // gets count of the number present in the db based on the query
        const result = await this._getModel(name).find(query).countDocuments();
        return result;
      } else {
        // gets count of all the data present in the db collection
        const result = await this._getModel(name)?.countDocuments();
        return result;
      }
    } catch (error) {
      return null;
    }
  };

  /**
   * save the single data object
   * @param name
   * @param data
   * @returns
   */
  public savaData = async (name: string, data: object) => {
    try {
      this._checkModel(name);
      const Model = this._getModel(name);
      console.log(Model, 'this is the model');
      const DataObject = new Model(data);
      console.log(DataObject, 'this is the model');

      const result = await DataObject.save();
      console.log(result);
      return result;
    } catch (error) {
      console.log(error, 'this is the error in saving data');
      return null;
    }
  };

  /**
   * save the data into bulk
   * @param name
   * @param data
   * @returns
   */
  public bulkSaveData = async (name: string, data: any[]) => {
    try {
      this._checkModel(name);
      const Model = this._getModel(name);
      // inserts multiple data in the db collection at a specific time
      const result = await Model.insertMany(data);
      return result;
    } catch (error) {
      return null;
    }
  };

  /**
   * this helper is use to fetch data according to the query provided
   * @param name
   * @param query
   * @returns
   */
  public findAndQueryData = async (name: string, query: any) => {
    try {
      this._checkModel(name);
      const result = await this._getModel(name).find(query);
      return result;
    } catch (error) {
      return null;
    }
  };

  /**
   * this helper is use to fetch data according to the query provided with selected data
   * @param name
   * @param query
   * @param selectedFields
   * @returns
   */
  public findAndQueryDataWithSelectedColumns = async (
    name: string,
    query: any,
    selectedFields: string[]
  ) => {
    try {
      this._checkModel(name);

      // finds the data based on the query and selected fields provided and then joins them
      const result = await this._getModel(name)
        .find(query)
        .select(selectedFields.join(' '));

      return result;
    } catch (error) {
      return null;
    }
  };

  /**
   *  this helper is use to fetch data according to the query provided with selected data
   * @param name
   * @param query
   * @param selectedFields
   * @param pageNumber
   * @param pageSize
   * @returns
   */
  public findSelectedDataWithPagination = async (
    name: string,
    query: any,
    selectedFields: string[],
    pageNumber: number,
    pageSize: number
  ) => {
    try {
      const skipItems = (pageNumber - 1) * pageSize;

      this._checkModel(name);
      // finds the data based on the query and selected fields provided and then joins them in paginated way

      const result = await this._getModel(name)
        .find(query)
        .select(selectedFields.join(' '))
        .skip(skipItems)
        .limit(pageSize);

      return result;
    } catch (error) {
      return null;
    }
  };

  /**
   * if data found then this function will update that data otherwise insert that data
   * @param name
   * @param filter
   * @param data
   * @returns
   */
  public findOneAndUpdate = async (
    name: string,
    filter: unknown,
    data: unknown
  ) => {
    try {
      this._checkModel(name);

      // updated the data in the db collection based on the query provided
      const result = await this._getModel(name).findOneAndUpdate(filter, data, {
        upsert: true
      });
      return result;
    } catch (error) {
      return null;
    }
  };

  /**
   * this helper is use to fetch data according to the query provided and return the paginated data
   * @param name
   * @param query
   * @param pageNumber
   * @param pageSize
   * @returns
   */
  public findAndQueryDataWithPagination = async (
    name: string,
    query: any,
    pageNumber: number,
    pageSize: number
  ) => {
    const skipItems = (pageNumber - 1) * pageSize;

    try {
      this._checkModel(name);
      const result = await this._getModel(name)
        .find(query)
        .skip(skipItems)
        .limit(pageSize);

      return result;
    } catch (error) {
      return null;
    }
  };

  /**
   * this helper is use to update any single data field in a collections of mongodb
   * @param name
   * @param id
   * @param update
   * @returns
   */
  public updateData = async (name: string, id: object, update: object) => {
    try {
      this._checkModel(name);
      const result = await this._getModel(name).updateOne(id, update);
      return result;
    } catch (error) {
      return null;
    }
  };

  /**
   * this helper is use to remove  data field in a collection of mongodb
   * @param name
   * @param deleteObj
   * @returns
   */
  public deleteData = async (name: string, deleteObj: object) => {
    try {
      this._checkModel(name);
      const result = await this._getModel(name).deleteMany(deleteObj);
      return result;
    } catch (error) {
      return null;
    }
  };

  /**
   * this helper is use to remove single data field in a collection of mongodb
   * @param name
   * @param deleteObj
   * @returns
   */
  public removeSingleData = async (name: string, deleteObj: object) => {
    try {
      this._checkModel(name);
      const result = await this._getModel(name).deleteOne(deleteObj);
      return result;
    } catch (error) {
      return null;
    }
  };

  //---------------------------------internal methods -----------------------------------/
  // check if the model exist or not if not then throw error
  _checkModel = (model: string) => {
    if (!Object.keys(DATA_MODELS).includes(model))
      throw new Error('Model is not defined.');
  };

  // get the selected moongose model
  _getModel = (model: string): Model<any> => {
    switch (model) {
      // add models over here which you want to get IMPORTANT
      case DATA_MODELS.User:
        return modelsObejct.User;

      case DATA_MODELS.Bookings:
        return modelsObejct.Bookings;

      default:
        return null;
    }
  };
}

export default MongoDataHelper.getInstance();
