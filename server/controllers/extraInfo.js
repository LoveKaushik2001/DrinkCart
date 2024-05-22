import ExtraInfo from "../models/extraInfo.js";

export const updateExtraInfo = async (req, res) => {
  const { id, extraData } = req.body;
  const { coords, timeStamp } = extraData;
  const condition = { customerId: id };
  const update =
    timeStamp?.length && coords
      ? { coords: coords, timeStamp: timeStamp, hasAnyData: true }
      : timeStamp?.length
      ? { timeStamp: timeStamp, hasAnyData: true }
      : { coords: coords, hasAnyData: true };
  try {
    const result = await ExtraInfo.findOneAndUpdate(condition, update);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const initExtraInfo = async (req, res) => {
  const data = req.body;
  try {
    const result = await ExtraInfo.insertMany(data);
    res.status(201).json(result);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getExtraInfo = async (req, res) => {
  try {
    const result = await ExtraInfo.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
