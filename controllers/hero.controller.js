const {Hero, Power, Image} = require('../models/index');
const NotFoundError = require('../errors/NotFoundError');


module.exports.createHero = async(req, res, next) => {
    try {
        const {powerNames, body} = req;
        const createdHero = await Hero.create(body, {
            attributes: {
                exclude: ['powerNames']
            }
        });
        if (req.powerNames) {
            for (i=0; i < powerNames.length; i++) {
                const result = await createdHero.addPowers(powerNames[i]);
            }
        }
        if (req.files) {
            for (let i=0; i < req.files.length; i++) {
                const image = await createdHero.createImage({imagePath: req.files[i].filename});
            }
        }
        res.status(200).send(createdHero);
    } catch (error) {
        next(error)
    }
}

module.exports.getOneHero = async(req, res, next) => {
    try {
        const {params: {heroId}} = req;
        const hero = await Hero.findByPk(heroId)
        if (!hero) {
            throw new NotFoundError ('hero not found');
        }
        res.status(200).send(hero);
    } catch(error) {
        next(error);
    }
}

module.exports.getHeroWithPowers = async(req, res, next) => {
    try {
        const {params: {heroId}} = req;
        const hero = await Hero.findByPk(heroId)
        if (!hero) {
            throw new NotFoundError ('hero not found');
        }
        const result = await hero.getPowers();
        res.status(200).send({hero: hero, hisPowers: result});
    } catch(error) {
        next(error);
    }
}

module.exports.getAllHeroes = async(req, res, next) => {
    try {
        const {pagination} = req;
        const allHeroes = await Hero.findAll({
            ...pagination
        });
        console.log(allHeroes);
        res.status(200).send(allHeroes);
    } catch (error) {
        next(error)
    }
}

module.exports.deleteHero = async(req, res, next) => {
    try {
        const {params: {heroId}} = req;
        const hero = await Hero.findByPk(heroId);
    
        const deletedHero = await hero.destroy(
            {
            where: {
                id: heroId
            }
        }
        )
        if (deletedHero) {    
            res.status(200).send({data: 1});
        } else {
            res.status(404).send('There is no such hero');
        }   
    } catch (error) {
        next(error)
    }
}

module.exports.updateHero = async(req, res, next) => {
    try {
        const {body, params: {heroId}} = req;
        const [rowCount, [updatedHero]]  = await Hero.update(body, {
            where: {
                id: heroId
            },
            attributes: {
                exclude: ['powerNames']
            },
            returning: true
        });
        console.log(req.files);
        if (req.files) {
            for (let i=0; i < req.files.length; i++) {
                const image = await updatedHero.createImage({imagePath: req.files[i].filename});
            }
        }
        
        if (req.powerNames) {
            for (i=0; i < req.powerNames.length; i++) {
                const result = await updatedHero.addPowers(req.powerNames[i]);
            }
        } 
        
        res.status(200).send(updatedHero);
    } catch (error) {
        next(error)
    }
}




