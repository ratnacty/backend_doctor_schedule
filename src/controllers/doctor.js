import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


// get All Doctor

export const getAllDoctor = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    
    const pageInt = parseInt(page, 10);
    const limitInt = parseInt(limit, 10);

    const skip = (pageInt - 1) * limitInt;

    try {
        const doctors = await prisma.doctor.findMany({
            take: limitInt,
            skip:skip,
        });

        const totalDoctors = await prisma.doctor.count();
        const totalPages = Math.ceil(totalDoctors / limitInt);

        const pagination = {
            current_page: pageInt,
            total_pages: totalPages,
            total_data: totalDoctors
        }

        res.status(200).json({
            data:({
                pagination: pagination,
                data: doctors,
            })
        })
    } catch (error) {
        console.error("Error fetching doctors:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch doctors.",
        });
        
        
    }
}

// get doctor by Id

export const getDoctorById = async(req, res) => {
    const doctorId = Number(req.params.id);
    if(isNaN(doctorId)){
        res.status(400).json({message: 'Invalid Id'})
        return
    }

    try {
        const doctor = await prisma.doctor.findUnique({
            where: {id: Number(doctorId)}
        })

        if(!doctor){
            return res.status(404).json({message: "Doctor not found"})
        }

        return res.status(200).json({message: "Doctor found", doctor})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Failed fetch Doctor", error})
    }
}


// create doctor

export const createDoctor = async (req, res) => {
    const {name,category, gender, nip} = req.body
    
    if(!name || !category || !gender || !nip){
        res.status(400).json({ message: 'Missing required fields' })
        return
    }

    try{
        const newDoctor = await prisma.doctor.create({
            data:{
                name,
                category,
                gender,
                nip
            }
        })

        res.status(200).json({message: "Doctor Created Successfully", newDoctor})
    } catch (error){
        console.log('error created doctor', error)
        return res.status(500).json({message: "Something when wrong, failed create doctor", error})

    }
}