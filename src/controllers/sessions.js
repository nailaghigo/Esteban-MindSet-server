const Sessions = require('../models/Sessions');

const listSessions = (req, res) => {
  if ('_id' in req.query) {
    Sessions.find({ _id: req.query, isDeleted: false }).populate(
      'postulant',
      'firstName lastName',
    )
      .populate(
        'psychologist',
        'firstName lastName',
      )
      .then((sessions) => {
        res.status(200).json({
          message: 'List of Sessions',
          data: sessions,
        });
      })
      .catch((err) => res.status(400).json({ message: err }));
  } else {
    Sessions.find({ isDeleted: false }).populate(
      'postulant',
      'firstName lastName',
    )
      .populate(
        'psychologist',
        'firstName lastName',
      )
      .then((sessions) => {
        res.status(200).json({
          message: 'List of Sessions',
          data: sessions,
        });
      })
      .catch((err) => res.status(400).json({ message: err }));
  }
};

const createSession = (req, res) => {
  const session = new Sessions({
    postulant: req.body.postulant,
    psychologist: req.body.psychologist,
    status: req.body.status,
    date: req.body.date,
    notes: req.body.notes,
  });
  session.populate(
    'psychologist',
    'firstName lastName',
  );
  session.populate(
    'postulant',
    'firstName lastName',
  );
  session.save((err, newSession) => {
    if (err) {
      return res.status(400).json({ message: err });
    }
    return res.status(201).json({
      message: 'Session Created',
      data: newSession,
    });
  });
};

const updateSession = (req, res) => {
  Sessions.findByIdAndUpdate(
    req.params.id,
    {
      postulant: req.body.postulant,
      psychologist: req.body.psychologist,
      status: req.body.status,
      date: req.body.date,
      notes: req.body.notes,
    },
    { new: true },
    (err, updatedSession) => {
      if (err) {
        return res.status(400).json({ message: err });
      }
      if (!updatedSession) {
        return res.status(404).json({ message: `The session 'id' (${req.params.id}) given  does not exist.` });
      }
      return res.status(200).json({
        message: 'Session Updated',
        data: updatedSession,
      });
    },
  ).populate(
    'postulant',
    'firstName lastName',
  ).populate(
    'psychologist',
    'firstName lastName',
  );
};

const deleteSession = (req, res) => {
  Sessions.findByIdAndUpdate(req.params.id, {
    isDeleted: true,
  }, (err, deletedSession) => {
    if (err) {
      return res.status(400).json({ message: err });
    }
    if (!deletedSession) {
      return res.status(404).json({ message: `The session 'id' (${req.params.id}) given  does not exist.` });
    }
    return res.status(204).send();
  });
};

module.exports = {
  createSession, listSessions, updateSession, deleteSession,
};
