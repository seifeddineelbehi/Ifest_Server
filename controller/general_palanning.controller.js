const GeneralPlanning = require("../models/general_planning.model");
const EventPlaning = require("../models/event_planing.model");
const moment = require('moment');


function getWeekNumber(date) {
    let onejan = new Date(date.getFullYear(), 0, 1);
    return Math.ceil((((date - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}

function getWeekStart(week) {
    let start = new Date();
    start.setDate(start.getDate() - start.getDay() + 1);
    start.setMonth(0);
    start.setDate(start.getDate() + (week - 1) * 7);
    return start.toLocaleDateString();
}

function getWeekEnd(week) {
    let end = new Date();
    end.setDate(end.getDate() - end.getDay() + 1);
    end.setMonth(0);
    end.setDate(end.getDate() + week * 7);
    return end.toLocaleDateString();
}

function parseDate(dateString) {
    let dateParts = dateString.split(/[-\/]/);

    let year = dateParts[2];
    let month = dateParts[1] - 1;
    let day = dateParts[0];

    return new Date(year, month, day);
}
module.exports = {

    addGeneralPlanning: async (req, res) => {
        

        const dateString = req.body.date;

        let date = parseDate(dateString);
        console.log('new date : ' + date)
        try {
            if (req.user.username != null) {
                const general = new GeneralPlanning({ date });
                var planing = req.body.planing;
                if ( planing != null && planing.length>0){
                    general.planing.push(...planing);
                }else {
                    general.planing = []
                }
                
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

        let date = new Date();
        let currentDay = date.getDay();
        let startOfWeek = new Date(date.getTime() - (currentDay * 24 * 60 * 60 * 1000));
        let endOfWeek = new Date(startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000);
        console.log("Start of week: " + startOfWeek.toLocaleDateString());
        console.log("End of week: " + endOfWeek.toLocaleDateString());

        try {
            var listGeneralPlanning = await GeneralPlanning.find();




            var listFiltred = []

            for (let index = 0; index < listGeneralPlanning.length; index++) {
                const element = listGeneralPlanning[index];
                let date = element.date.toLocaleDateString();
                console.log('date : ' + date)
                console.log('toLocaleDateString : ' + element.date.toLocaleDateString())
                if (date >= startOfWeek.toLocaleDateString() && date < endOfWeek.toLocaleDateString()) {
                    listFiltred.push(element)
                }
            }
            res.status(200).send({
                success: true,
                listGeneralPlanning: listFiltred,
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