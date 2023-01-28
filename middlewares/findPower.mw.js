const {Hero, Power} = require('../models/index');


module.exports.findPower = async(req, res, next) => {
    try {
        const {body: {powerNames}} = req;
        console.log(powerNames);  // тут строка с силами, нужно сделать массив из них
    
        req.powerNames = []; // в объекте req создаем поле powerNames, потом туда пушим силы, 
                             // которые пришли в запросе, чтоб передать их некстом контроллеру
        if(powerNames) {     // проверяем пришли ли вообщев запросе powerNames
            const array = powerNames.split(',');
            console.log(array);
            for (let i=0; i<(array.length); i++) {
                const power = await Power.findOne({where: {powerName: array[i]}});
                
                if (power !== null) { // если такая сила есть в таблице
                    console.log('такая суперсила есть в таблице');
                    req.powerNames.push(power);
                    
                } else { // если такой суперсилы еще нет в таблице, то создаем ее
                    console.log('создаем суперсилу в таблице');
                    const power = await Power.create({powerName: array[i]});
                    req.powerNames.push(power);
                }
            }
        }
        next();
    } catch (error) {
        next(error)
    }
}













