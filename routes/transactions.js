const {
    addExpense,
    getExpense,
    deleteExpense,
} = require("../controllers/expense");
const {
    addIncome,
    getIncomes,
    deleteIncome,
} = require("../controllers/income");
const { check } = require("express-validator");
const {validarCampos} = require('../middlewares/validar-campos')

const router = require("express").Router();

router
    .post("/add-income", addIncome)
    .get("/get-incomes/:username", getIncomes)
    .delete("/delete-income/:id", deleteIncome)
    .post("/add-expense", addExpense)
    .get("/get-expenses/:username", getExpense)
    .delete("/delete-expense/:id", deleteExpense);

const { crearUsuario, loginUsuario } = require("../controllers/auth");

router.post(
    "/new",
    [
        //Middlewares
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("email", "El email es obligatorio").isEmail(),
        check(
            "password",
            "El password debe de ser de mínimo 6 caracteres"
        ).isLength({ min: 6 }),
        validarCampos,
    ],
    crearUsuario
);

router.post(
    "/login",
    [
        //Middlewares
        check("email", "El email es obligatorio").isEmail(),
        check(
            "password",
            "El password debe de ser de mínimo 6 caracteres"
        ).isLength({ min: 6 }),
        validarCampos,
    ],
    loginUsuario
);
module.exports = router;
