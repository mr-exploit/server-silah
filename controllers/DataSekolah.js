import DataSekolah from "../models/DataSekolahModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getDataSekolah = async(req, res) => {
    try {
        let response;
        if (req.role === "admin") {
            response = await DataSekolah.findAll({
                attributes: ['uuid', 'nameScholl', 'npsn', 'pengelolaan','tingkatan', 'alamat', 'noHp', 'nameKs'],
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        } else {
            response = await DataSekolah.findAll({
                attributes: ['uuid', 'nameScholl', 'npsn','pengelolaan','tingkatan', 'alamat', 'noHp', 'nameKs'],
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

export const getDataSekolahById = async(req, res) => {
    try {
        const datasekolah = await DataSekolah.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!datasekolah) return res.status(404).json({ msg: "Data tidak ditemukan!" });
        let response;
        if (req.role === "admin") {
            response = await DataSekolah.findOne({
                attributes: ['uuid', 'nameScholl', 'npsn','pengelolaan','tingkatan', 'alamat', 'noHp', 'nameKs'],
                where: {
                    id: datasekolah.id
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        } else {
            response = await DataSekolah.findOne({
                attributes: ['uuid', 'nameScholl', 'npsn', 'pengelolaan','tingkatan', 'alamat', 'noHp', 'nameKs'],
                where: {
                    [Op.and]: [{ id: datasekolah.id }, { userId: req.userId }]
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

export const createDataSekolah = async(req, res) => {
    const { namescholl, Npsn, pengelola, tingkatan, alamat, nohp, kepsek } = req.body;
    try {
        await DataSekolah.create({
            nameScholl: namescholl,
            npsn: Npsn,
            pengelolaan: pengelola,
            tingkatan: tingkatan,
            alamat:  alamat,
            noHp: nohp,
            nameKs: kepsek,
            userId: req.userId
            
        });
        res.status(201).json({ msg: "Data Sekolah Created Successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const updateDataSekolah = async(req, res) => {
    try {
        const datasekolah = await DataSekolah.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!datasekolah) return res.status(404).json({ msg: "Data Sekolah tidak ditemukan!" });
        const { namescholl,Npsn, pengelola, tingkatan, alamat, nohp, kepsek } = req.body;
        if (req.role === "admin") {
            await DataSekolah.update({ 
                nameScholl: namescholl,
                npsn: Npsn,
                pengelolaan: pengelola,
                tingkatan: tingkatan,
                alamat:  alamat,
                noHp: nohp,
                nameKs: kepsek
            }, {
                where: {
                    id: datasekolah.id
                }
            });
        } else {
            if (req.userId !== datasekolah.userId) return res.status(403).json({ msg: "Akses Terlarang" });
            await DataSekolah.update({ 
                nameScholl: namescholl,
                npsn: Npsn,
                pengelolaan: pengelola,
                tingkatan: tingkatan,
                alamat:  alamat,
                noHp: nohp,
                nameKs: kepsek
                }, {
                where: {
                    [Op.and]: [{ id: datasekolah.id }, { userId: req.userId }]
                },
            });
        }
        res.status(200).json({ msg: "Data Sekolah updated successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const deleteDataSekolah = async(req, res) => {
    try {
        const datasekolah = await DataSekolah.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!datasekolah) return res.status(404).json({ msg: "Data tidak ditemukan!" });
        const { namescholl, pengelola, tingkatan, alamat, nohp, kepsek } = req.body;
        if (req.role === "admin") {
            await DataSekolah.destroy({
                where: {
                    id: datasekolah.id
                }
            });
        } else {
            if (req.userId !== datasekolah.userId) return res.status(403).json({ msg: "Akses Terlarang" });
            await DataSekolah.destroy({
                where: {
                    [Op.and]: [{ id: datasekolah.id }, { userId: req.userId }]
                },
            });
        }
        res.status(200).json({ msg: "Data Sekolah delete successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}