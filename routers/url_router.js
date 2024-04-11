import express from 'express';
import url_controller from '../controllers/url_controller.js';

const router  = express.Router();

router.get('/', async (req, res) => {
    return res.status(200).send('URL Shortener API v1, by Charles Loxton');
});

router.post('/short', url_controller.shorten_url); 
router.get('/:url', url_controller.url_redirect);

export default router;
