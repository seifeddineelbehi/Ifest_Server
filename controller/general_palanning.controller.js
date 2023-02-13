const  GeneralPlanning  = require("../models/general_planning.model");
const  EventPlaning  = require("../models/event_planing.model");
const moment = require('moment');
module.exports = {

    addGeneralPlanning: async (req, res) => {
        var planing = req.body.planing;
        const dateString = req.body.date;
        const date = new Date(dateString);
        try {
            if (req.user.username != null) {
                const general = new GeneralPlanning({ date: date });

                var listPlanning = [];
                for (let index = 0; index < planing.length; index++) {

                    const element = planing[index];

                    const eventPlaning = new EventPlaning({ ...element });

                    await eventPlaning.save();

                    listPlanning.push(eventPlaning);
                }

                general.planing.push(...listPlanning);
                await general.save();
                res.status(200).send({
                    success: true,
                    message: "General plannig added successfully!",
                    generalPlanning: general,
                });
            } else {
                res.status(401).send({
                    success: false,
                    message: "Unauthorized!",
                });
            }
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error,
            });
        }

    },

    getGeneralPlanningByWeek: async (req, res) => {
        const startOfWeek = moment().startOf('week').toDate();
        const endOfWeek = moment().endOf('week').toDate();
        try {
            var listGeneralPlanning = await GeneralPlanning.find({ date: { $gte: startOfWeek, $lte: endOfWeek } }).populate([
                {
                    path: "planing",
                    model: "EventPlaning",
                },
            ]);
            res.status(200).send({
                success: true,
                listGeneralPlanning: listGeneralPlanning,
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error,
            });
        }

    },

    getAllGeneralPlanning: async (req, res) => {
        try {
            var listGeneralPlanning = await GeneralPlanning.find().populate([
                {
                    path: "planing",
                    model: "EventPlaning",
                },
            ]);
            res.status(200).send({
                success: true,
                listGeneralPlanning: listGeneralPlanning,
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error,
            });
        }

    },
}