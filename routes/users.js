const router = require('express').Router();
const { validateUserId, validateUpdateProfile, validateUpdateAvatar } = require('../middlewares/validation');
const {
  getUsers,
  getUser,
  getMe,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMe);
router.get('/:userId', validateUserId, getUser);
router.patch('/me', validateUpdateProfile, updateProfile);
router.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = router;
