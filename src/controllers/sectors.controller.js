import { Sector } from "../models/Sector.model.js";

export const getSectors = async (req, res) => {

    try{

        const sectors = await Sector.findAll();

        res.json(sectors);


    }
    catch(error){

        return res.status(500).json({message: 'Something goes wrong.'})

    }

}

export const getSector = async (req, res) => {

    try{

        const { id } = req.params;
    
        const sector = await Sector.findAll({
            where: {
                id
            }
        })
    
        if(sector.length <= 0){
    
            return res.status(400).json({message: 'Sector not found'})
    
        }
    
        res.json(sector[0]);


    }
    catch(error){

        return res.status(500).json({messages: 'Something goes wrong.'})

    }

}

export const createSector = async (req, res) => {

    try{

        const { nombre, descripcion } = req.body;

        const sector = await Sector.create({
            nombre,
            descripcion
        });

        res.status(201).json({ message: 'Sector created!'});


    }
    catch(error){


        return res.status(404).json({message: "Something goes wrong."})

    }

}

export const updateSector = async (req, res) => {

    try{

        const { id } = req.params;

        const { nombre, descripcion } = req.body;

        const sectorUpdated = await Sector.update(
            {nombre, descripcion},
            {
                where: {
                    id,
                }
            }
        );

        if(sectorUpdated[0] === 0){

            return res.status(404).json({message: 'Sector not found.'})

        }

        const sector = await Sector.findOne({
            where: {
                id
            }
        })

        res.json(sector);

    }
    catch(error){

        return res.status(500).json({messages: 'Something goes wrong.'})

    }

}

export const deleteSector = async (req, res) => {

    try{

        const { id } = req.params;

        const sectorDeleted = await Sector.destroy({
            where: {
                id
            }
        }); 

        if(sectorDeleted === 0){

            return res.status(404).json({message: 'Sector not found.'});

        }

        res.status(204).json({message: 'Sector deleted.'});

    }
    catch(error){

        return res.status(500).json({ message: "Something goes wrong."});

    }

}