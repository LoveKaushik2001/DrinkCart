import ExtraInfo from "../models/extraInfo.js";

export const updateExtraInfo = async (req, res) => {
  const { id, extraData } = req.body;
  const { coords, timeStamp, distanceFromLastPoint, origin, lastPoint } =
    extraData;
  const condition = { customerId: id };
  const update =
    timeStamp?.length && coords && distanceFromLastPoint && origin && lastPoint
      ? {
          coords: coords,
          timeStamp: timeStamp,
          distanceFromLastPoint: distanceFromLastPoint,
          origin: origin,
          lastPoint: lastPoint,
          hasAnyData: true,
        }
      : timeStamp?.length
      ? {
          timeStamp: timeStamp,
          distanceFromLastPoint: distanceFromLastPoint,
          origin: origin,
          lastPoint: lastPoint,
          hasAnyData: true,
        }
      : { coords: coords, hasAnyData: true };
  try {
    const result = await ExtraInfo.findOneAndUpdate(condition, update);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBottleCollectionCount = async (req, res) => {
  const { id, extraData } = req.body;
  const { bottlesCollected, bottlesRemaining, bottlesDelivered, routeBoy } =
    extraData;
  const condition = { customerId: id };
  const update = {
    bottlesCollected: bottlesCollected,
    bottlesRemaining: bottlesRemaining,
    bottlesDelivered: bottlesDelivered,
    routeBoy: routeBoy,
    hasAnyData: true,
  };
  try {
    const result = await ExtraInfo.findOneAndUpdate(condition, update, {
      new: true,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const initExtraInfo = async (req, res) => {
  const data = req.body;
  try {
    await ExtraInfo.deleteMany();
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
