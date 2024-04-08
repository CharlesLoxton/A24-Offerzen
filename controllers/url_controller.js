import Url from "../models/Url.js";

const shorten_url = async (req, res, next) => {
    try{
        let { original_url } = req.body;

        if (!original_url) {
            return res.status(400).send({ error: 'A URL is required.' });
        }

        // Remove all whitespace from the URL and trim it
        original_url = original_url.replace(/\s+/g, '').trim();

        // Validate the URL
        try {
            new URL(original_url);
        } catch (e) {
            return res.status(400).send({ error: 'Invalid URL format.' });
        }

        const update = { original_url };
        const options = { new: true, upsert: true, setDefaultsOnInsert: true };
    
        // Use findOneAndUpdate with upsert option to reduce database calls
        const url = await Url.findOneAndUpdate({ original_url }, update, options);

        return res.send({ 
            original_url: url.original_url, 
            short_url: `${process.env.DOMAIN}${url.short_url }`
        }); 
    }
    catch(error){
        return res.status(500).send({ error: 'Server error' });
    }
};

const url_redirect = async (req, res, next) => {
    try {

        const { url } = req.params;
        
        if(!url){
            return res.status(400).send({ error: 'A short url is required.' });
        }

        //Find the original_url via the short_url and redirect if it exists
        const shortUrl = await Url.findOne({ short_url: url.replace(/\s+/g, '').trim() });
        
        if (shortUrl) {
          return res.redirect(shortUrl.original_url);
        }

        return res.status(404).send({ error: 'URL not found' });
    } catch (error) {
        return res.status(500).send({ error: 'Server error' });
    }
};

export default {
    shorten_url,
    url_redirect
}