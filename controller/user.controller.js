const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const projectId = ["Env368", "Env368", "Eng367", "Env390", "Eng365",
    "Lif379", "Eng374", "Phy371", "Eng372", "Eng362",
    "Lif375", "Soc366", "Env360", "Phy386", "Lif384",
    "Mat383", "Phy385", "Mat387", "Eng273", "Eng276",
    "Env275", "Eng277", "Eng403", "Com308", "Com331",
    "Lif382", "Eng329", "Soc377", "Com396", "Eng393",
    "Com392", "Eng282", "Mat283", "Env284", "Eng405",
    "Lif370", "Env340", "Eng416", "Lif411", "Eng453",
    "Com445", "Env444", "Soc436", "Com410", "Env348",
    "Eng345", "Env335", "Eng446", "Soc336", "Lif431",
    "Eng388", "Env419", "Com352", "Eng430", "Eng449",
    "Eng432", "Bus349", "Eng428", "Mul354", "Env427",
    "Eng413", "Mat342", "Soc420", "Eng426", "Eng422",
    "Lif441", "Env334", "Env338", "Eng421", "Eng389",
    "Eng344", "Eng418", "Env350", "Eng429", "Eng423",
    "Eng409", "Eng456", "Bus450", "Eng414", "Eng346",
    "Env440", "Eng337", "Eng452", "Lif434", "Phy435",
    "Com425", "Eng417", "Bus351", "Env353", "Env310",
    "Soc296", "Mat288", "Env332", "Eng333", "Eng298",
    "Phy293", "Mat319", "Com355", "Phy313", "Lif302",
    "Eng330", "Eng328", "Env325", "Phy291", "Phy290",
    "Lif299", "Eng305", "Lif321", "Com314", "Eng323",
    "Eng297", "Lif322", "Env292", "Eng320", "Eng303",
    "Eng304", "Eng324", "Eng311", "Eng289", "Lif294",
    "Eng326", "Phy309", "Mat300", "Phy295", "Env312",
    "Com327", "Eng356", "Eng306", "Env318", "Soc358",
    "Eng301", "Soc317", "Eng315", "Soc361", "Soc359",
    "Eng395", "Env398", "Phy394", "Soc399", "Phy397",
    "Phy442", "Lif279", "Eng405", "Lif280", "Env378",
    "Com278"
]
module.exports = {
    signUpUser: async (req, res) => {
        console.log(req.body)
        const isUserFound = await User.findOne({ email: req.body.email })
        if (req.body.projectId != null) {
            var test = false
            for (let i = 0; i < projectId.length; i++) {
                if (projectId[i] == req.body.projectId) {
                    test = true
                }
            }
            if (!test) {
                return res.status(401).json({ created: false, message: "ProjectId Doesn't exist" });
            }
        }

        if (isUserFound) {
            return res.status(402).json({ created: false, message: "Email already exists" })
        }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            ...req.body,
            password: hashedPassword
        });
        await user.save();
        res.status(200).json(user)
    },

    signInUser: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email })
            if (!user) {
                return res.status(402).json({ created: false, message: "Email doesn't exist" })
            }
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            if (validPassword) {
                return res.status(200).json(user)
            }
            else
                return res.status(401).json({ created: false, message: "Password wrong" })
        } catch (err) {
            return res.json(null)
        }
    },

    updateProfile: async (req, res) => {
        console.log(req.body.firstName)
        console.log(req.body.id)
        const user = await User.findOneAndUpdate(
            { _id: req.body.id },
            {
                $set: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    birthDate: req.body.birthDate,
                    address: req.body.address,
                    phoneNumber: req.body.phoneNumber,
                },
            }
        );
        res.status(200).send(user);
    }

}