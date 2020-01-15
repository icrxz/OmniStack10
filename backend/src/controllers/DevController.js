const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('./utils/parseStringAsArray')

module.exports = {
    async store(request, response){
        const { github_username, techs, latitude, longitude } = request.body;
    
        let respMessage;
        let dev = await Dev.findOne({github_username});

        if(!dev){

            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        
            const {name = login, avatar_url, bio} = apiResponse.data;
        
            const techsArray = parseStringAsArray(techs);
        
            const location = {  type: 'Point', 
                                coordinates: [longitude, latitude] 
                            };
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });

            respMessage = "Desenvolvedor cadastrado!";
        }
        else{
            respMessage = "Desenvolvedor já está cadastrado na base de dados!";
        }
    
        return response.json({  message: respMessage,
                                user:  dev
                            });
    },

    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    }
};

