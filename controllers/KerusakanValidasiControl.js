import User from "../models/UserModel.js";
import { Op } from "sequelize";
import DataSekolah from "../models/DataSekolahModel.js";
import Kerusakan from "../models/KerusakanModel.js";

export const GetValidasi = async(req, res) =>{
    try {
        let response;
        if(req.role === "admin"){
            response = await Kerusakan.findAll({
                attributes: ['uuid', 'judul', 'desc','validasi', 'keterangan','image_1', 'image_2', 'image_3', 'image_4','url_1', 'url_2', 'url_3', 'url_4'],
                include: [{
                    model: User,
                    attributes: ['name', 'email'],
                    include: [{
                        model: DataSekolah,
                        attributes: ['nameScholl', 'npsn','pengelolaan','tingkatan', 'alamat', 'noHp', 'nameKs']
                    }]
                }]
            });
        } else {
            response = await Kerusakan.findAll({
                attributes: ['uuid', 'judul', 'desc','validasi', 'keterangan','image_1', 'image_2', 'image_3', 'image_4','url_1', 'url_2', 'url_3', 'url_4'],
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
        const validasi = await Kerusakan.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!validasi) return res.status(404).json({ msg: "Data tidak ditemukan!" });
        let response;
        if (req.role === "admin") {
            response = await Kerusakan.findOne({
                attributes: ['uuid', 'judul', 'desc','validasi', 'keterangan','image_1', 'image_2', 'image_3', 'image_4','url_1', 'url_2', 'url_3', 'url_4'],
                where: {
                    id: validasi.id
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email'],
                    include: [{
                        model: DataSekolah,
                        attributes: ['nameScholl','npsn', 'pengelolaan','tingkatan', 'alamat', 'noHp', 'nameKs']
                    }]
                }]
            });
        } else {
            response = await Kerusakan.findOne({
                attributes: ['uuid', 'judul', 'desc','validasi', 'keterangan','image_1', 'image_2', 'image_3', 'image_4','url_1', 'url_2', 'url_3', 'url_4'],
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
        const validasi = await Kerusakan.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if(!validasi) return res.status(4004).json({msg: "Data Sekolah tidak ditemukan"});
        const {valid, ktr } = req.body;
        
        if(req.role === "admin"){
            await Kerusakan.update({
                validasi: valid,
                keterangan: ktr
            },
            {
                where: {
                    id: validasi.id
                }
            });
        } else{
            if(req.role ==="user" !== validasi.userId) return res.status(403).json({msg: "Akses Terlarang"});
            await Kerusakan.update({
                validasi: valid,
                keterangan: ktr
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

