const router = require('express').Router();

import channel from './channel';
import message from './message';

router.use('/channel', channel);
router.use('/message', message);
module.exports = router;
