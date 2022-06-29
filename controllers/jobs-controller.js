const Jobs = require('../models/Job');
const { NotFoundError, BadRequestError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const getAllJobs = async (req, res) => {
  const jobs = await Jobs.find({ createdBy: req.user.userId }).sort('createdAt');
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId }
  } = req;

  const job = await Jobs.find({ _id: jobId, createdBy: userId });
  console.log(job);
  if (!job) {
    console.log('No Job');
    throw new NotFoundError(`No job with id ${jobId}`);
  }

  res.status(StatusCodes.OK).json(job);
};

/**
 * @param req => {body: {company, position}}
 * @param res
 * */
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Jobs.create(req.body);
  res.status(StatusCodes.CREATED).send(job);
};

const updateJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
    body: { company, position }
  } = req;

  if (!company || !position) {
    throw new BadRequestError('Company or Position fields cannot be empty');
  }

  /** run Mongoose update
   *   find by _id & createdBy
   *   @param 2 {values to update}
   *   @param 3 {options}
   */

  const job = await Jobs.findByIdAndUpdate({ _id: jobId, createdBy: userId }, req.body, {
    new: true,
    runValidators: true
  });

  // throw error if not found
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }

  res.status(StatusCodes.OK).json(job);
};

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId }
  } = req;

  const job = await Jobs.findOneAndRemove({
    _id: jobId,
    createdBy: userId
  });

  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }

  res.status(StatusCodes.OK).send();
}; // end deleteJob

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob
};
