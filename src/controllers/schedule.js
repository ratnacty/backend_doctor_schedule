import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


// get All Doctor

export const getAllSchedule = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    
    const pageInt = parseInt(page, 10);
    const limitInt = parseInt(limit, 10);

    const skip = (pageInt - 1) * limitInt;

    try {
        const schedules = await prisma.schedule.findMany({
            take: limitInt,
            skip:skip,
        });

        const totalSchedule = await prisma.schedule.count();
        const totalPages = Math.ceil(totalSchedule / limitInt);

        const pagination = {
            current_page: pageInt,
            total_pages: totalPages,
            total_data: totalSchedule
        }

        res.status(200).json({
            data:({
                pagination: pagination,
                data: schedules,
            })
        })
    } catch (error) {
        console.error("Error fetching schedules:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch schedules.",
        });
        
        
    }
}




// create schedule

export const createSchedule = async (req, res) => {
    const {day,time_start, time_finish, quota, status, date } = req.body
    const doctorId = Number(req.params.id)
    const userId = req.user.id

    console.log(doctorId);

    
    if(!day || !time_start || !time_finish || !quota || typeof status !== "boolean" || !date ){
        res.status(400).json({ message: 'Missing required fields' })
        return
    }

    try{

        const formattedDate = new Date(date); 

        if (isNaN(formattedDate.getTime())) {
          return res.status(400).json({ message: "Invalid date format" });
        }

        const newSchedule = await prisma.schedule.create({
            data:{
                day,
                time_start,
                time_finish,
                quota,
                status,
                date : formattedDate,
                doctorId,
                userId
            }
        })

        res.status(200).json({message: "Schedule Created Successfully", newSchedule})
    } catch (error){
        console.log('error created Schedule', error)
        return res.status(500).json({message: "Something when wrong, failed create Schedule", error})

    }
}