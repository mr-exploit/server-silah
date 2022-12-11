import Perbaikan from "../models/PerbaikanModel.js";
import User from "../models/UserModel.js";
import DataSekolah from "../models/DataSekolahModel.js";
import { Op } from "sequelize";

export const getPerbaikan = async(req,res)=>{
    try {
        let response;
        if (req.role === "admin") {
            response = await Perbaikan.findAll({
                attributes: ['uuid', 'judulper', 'descper','validasiper', 'keteranganper'],
                order: [['updatedAt', 'DESC']],
                include: [{
                    model: User,
                    attributes: ['name', 'email'],
                    include: [{
                        model: DataSekolah,
                        attributes: ['nameScholl', 'npsn', 'pengelolaan','tingkatan', 'alamat', 'noHp', 'nameKs']
                    }]
                }]
            });
        } else {
            response = await Perbaikan.findAll({
                attributes: ['uuid', 'judulper', 'descper','validasiper', 'keteranganper'],
                where: {
                    userId: req.userId
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getPerbaikanById = async(req,res) => {
    try {
        const perbaikan = await Perbaikan.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!perbaikan) return res.status(404).json({ msg: "Data tidak ditemukan!" });
        let response;
        if (req.role === "admin") {
            response = await Perbaikan.findOne({
                attributes: ['uuid', 'judulper', 'descper','validasiper', 'keteranganper'],
                where: {
                    id: perbaikan.id
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email'],
                    include: [{
                        model: DataSekolah,
                        attributes: ['nameScholl', 'npsn', 'pengelolaan','tingkatan', 'alamat', 'noHp', 'nameKs']
                    }]
                }]
            });
        } else {
            response = await Perbaikan.findOne({
                attributes: ['uuid', 'judulper', 'descper','validasiper', 'keteranganper'],
                where: {
                    [Op.and]: [{ id: perbaikan.id }, { userId: req.userId }]
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const savePerbaikan = async(req,res) => {
    const {judul,desk} = req.body;
    try{
        await Perbaikan.create({
            judulper: judul, 
            descper: desk, 
            userId: req.userId
            });
        res.status(201).json({msg:"Perbaikan Created Successfuly"});
    } catch(error){
        console.log(error.message);
    }
}

export const updatePerbaikan = async (req,res) => {
    const perbaikan = await Perbaikan.findOne(
        {
            where:{
                uuid : req.params.id
        }
    });
    if(!perbaikan) return res.status(404).json({msg: " No Data Found"});
    const {judul,desk} = req.body;
    try {
        if(req.role === "admin"){
            await Perbaikan.update({
                judulper: judul, 
                descper: desk, 

        },{
            where: {
                id: perbaikan.id
            }
        });
        } else {
            if (req.userId !== perbaikan.userId) return res.status(403).json({ msg: "Akses Terlarang" });
                await Perbaikan.update({
                    judulper: judul, 
                    descper: desk, 

            },{
                where: {
                    id: perbaikan.id
                }
            });  
        }
        res.status(200).json({msg: "Perbaikan Updated successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deletePerbaikan = async(req,res) => {
    const perbaikan = await Perbaikan.findOne(
        {
            where:{
                uuid : req.params.id
        }
    });
    if (!perbaikan) return res.status(404).json({ msg: "Data Perbaikan tidak ditemukan!" });
    try {
        if (req.role === "admin") {
            await Perbaikan.destroy({
                where: {
                    id: perbaikan.id
                }
            });
        } else {
            if (req.userId !== perbaikan.userId) return res.status(403).json({ msg: "Akses Terlarang" });
            await Perbaikan.destroy({
                where: {
                    [Op.and]: [{ id: perbaikan.id }, { userId: req.userId }]
                },
            });
        }
        res.status(200).json({ msg: "Data Perbaikan delete successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}