const IncomeSchema= require("../models/IncomeModel")


exports.addIncome = async (req, res) => {
    const {title, amount, category, description, date, username}  = req.body
    const income = IncomeSchema({
        title,
        amount,
        category,
        description,
        date,
        username
    })

    try {
        //validations
        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'Todos los campos son requeridos'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'La cantidad debe ser un valor positivo'})
        }
        await income.save()
        res.status(200).json({message: 'Ingreso añadido'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(income)
}

exports.getIncomes = async (req, res) =>{
    console.log('Entra al ctrl');
    const {username} = req.params;

    try {
        const incomes = await IncomeSchema.find({username}).sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteIncome = async (req, res) =>{
    const {id} = req.params;
    IncomeSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Ingreso eliminado'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}