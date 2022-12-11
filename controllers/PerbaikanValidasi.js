import User from "../models/UserModel.js";
import { Op } from "sequelize";
import DataSekolah from "../models/DataSekolahModel.js";
import Perbaikan from "../models/PerbaikanModel.js";

export const GetValidasi = async(req, res) =>{
    try {
        let response;
        if(req.role === "admin"){
            response = await Perbaikan.findAll({
                attributes: ['judulper', 'descper', 'validasiper', 'keteranganper'],
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
                attributes: ['judulper', 'descper', 'validasiper', 'keteranganper'],
                where: {
                    userId : req.userId
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
        }
        res.status(200).json(response);
    } catch (error){
        res.status(500).json({ msg: error.message});
    }
}

export const GetValidasiById = async(req, res) => {
    try {
        const validasi = await Perbaikan.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!validasi) return res.status(404).json({ msg: "Data tidak ditemukan!" });
        let response;
        if (req.role === "admin") {
            response = await Perbaikan.findOne({
                attributes: ['judulper', 'descper', 'validasiper', 'keteranganper'],
                where: {
                    id: validasi.id
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
                attributes: ['judulper', 'descper', 'validasiper', 'keteranganper'],
                where: {
                    [Op.and]: [{ id: validasi.id }, { userId: req.userId }]
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

export const UpdateValidasi = async(req, res) =>{
    try{
        const validasi = await Perbaikan.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if(!validasi) return res.status(4004).json({msg: "Data Sekolah tidak ditemukan"});
        const {validper, ktrper } = req.body;
        
        if(req.role === "admin"){
            await Perbaikan.update({
                validasiper: validper,
                keteranganper: ktrper
            },
            {
                where: {
                    id: validasi.id
                }
            });
        } else{
            if(req.role ==="user" !== validasi.userId) return res.status(403).json({msg: "Akses Terlarang"});
            await Perbaikan.update({
                validasiper: validper,
                keteranganper: ktrper
            }, {
                where: {
                    [Op.and]: [{id: validasi.id}, {userId: req.userId}]
                }
            })
        }
        res.status(200).json({msg: "data sekolah update"});
    } catch(error){
        res.status(500).json({msg: error.message});
    }
}

