const Jobs = require('../models/Job');
const { NotFoundError, BadRequestError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const getAllJobs = async (req, res) => {
  const jobs = await Jobs.find({createdBy: req.user.userId}).sort('createdAt')
  res.status(StatusCodes.OK).json({jobs, count: jobs.length})
};

const getJob = async (req, res) => {
  res.send('get SINGLE JOB');
};

/**
 * @param req => {body: {company, position}}
 * @param res
 * */
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId
  const job = await Jobs.create(req.body);
  res.status(StatusCodes.CREATED).send(job);
};

const updateJob = async (req, res) => {
  res.send('update job');
};

const deleteJob = async (req, res) => {
  res.send('deleteJob');
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
