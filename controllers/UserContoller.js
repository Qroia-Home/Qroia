export const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        //INFO:Crypt password
        const password     = req.body.password;
        const salt         = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash,
        });

        const user = await doc.save();

        const token = jwt.sign({
            _id: user._id
        }, 'QroiaKey', {
            expiresIn: '9d',
        });

        const { passwordH, ...userData } = user._doc;

        res.json({
            succes: true,
            ...userData,
            token,
        });
    } catch (err) {
        res.json({
            message: 'Error register'
        });
    }
};

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({
            email: req.body.email
        });

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!isValidPass) {
            return res.status(404).json({
                message: 'Неверный логин или пароль'
            });
        }

        const token = jwt.sign(
            {_id: user._id},
            'QroiaCode',
            {expiresIn: '30d'}
        );

        const { passHash, ...userData } = user._doc;

        res.json({
            status: 200,
            ...userData,
            token,
        });

    } catch (err) {
        res.status(500).json({
            message: 'Не удалось войти'
        });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {
            res.status(404).json({
                message: 'Не удалось авторизоваться',
            });

            const {passHash, ...userData} = user._doc;

            res.json({
                ...userData
            });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'No access'
        });
    }
};
