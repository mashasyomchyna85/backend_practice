const {Router} = require('express');
const HeroController = require('../controllers/hero.controller');
const {findPower} = require('../middlewares/findPower.mw');
const heroRouter = Router();
const {pagination} = require('../middlewares/pagination');
const multer = require('multer');
const path = require('path');

const imagePath = path.resolve(__dirname, '../public/images');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imagePath)
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}.${file.originalname}`)
    },
})


const upload = multer({storage});


heroRouter.post('/', upload.array('images', 3), findPower, HeroController.createHero);
heroRouter.get('/:heroId', HeroController.getHeroWithPowers);
heroRouter.get('/', pagination, HeroController.getAllHeroes);
heroRouter.patch('/:heroId',  upload.array('images', 3), findPower, HeroController.updateHero);
heroRouter.delete('/:heroId', HeroController.deleteHero);



module.exports = heroRouter;