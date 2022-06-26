const getAllJobs = async (req, res) => {
    res.send(req.user);
};

const getJob = async (req, res) => {
    res.send('get SINGLE JOB');
}

const createJob = async (req, res) => {
    res.send("create job");
};

const updateJob = async (req, res) => {
    res.send("update job");
};

const deleteJob = async (req, res) => {
    res.send("deleteJob");
};

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
};
