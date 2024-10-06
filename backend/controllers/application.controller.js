import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req,res)=>{
    try{
        const userId = req.id;
        const {id:jobId} = req.params; // const jobId = req.params.id;
        if(!jobId){
            return res.status(400).json({
                message:"Job id is required.",
                success:false
            })
        };

        //Check if the user has already applied for the job
        const existingApplication = await Application.findOne({job:jobId,applicant:userId});
        if(existingApplication){
            return res.status(400).json({
                message:"You have already applied for this jobs.",
                success:false
            });
        }

        //check if the jobs exists
        const job = await Job.findById(jobId)
        if(!job){
            return res.status(404).json({
                message:"Job not found.",
                success:false
            });
        }

        //create a new application
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId
        });

        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message:"Job applied successfully",
            success:true
        })

    }catch(error){
        console.log(error);
    }
}



//Get applied job list

export const getAppliedJobs = async (req,res)=>{
    try {
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({ ////ascending 
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        }) 

        if(!application){
            return res.status(404).json({
                message:"No Applications.",
                success:false
            })
        };

        return res.status(200).json({
            application,
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}


//For admin 
//Get Applicants
export const getApplicants = async (req,res)=>{
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });

        if(!job){
            return res.status(404).json({
                message:'Job not found.',
                success:false
            })
        };

        return res.status(200).json({
            job,
            success:true
        });

    } catch (error) {
        console.log(error);
    }
}


//Update Status
export const updateStatus = async(req,res)=>{
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(404).json({
                message:'Status not found.',
                success:false
            })
        }

        //find the application by application id
        const application = await Application.findOne({_id:applicationId});

        if(!application){
            return res.status(404).json({
                message:'Application not found.',
                success:false
            })
        };

        //update status;
        application.status= status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:'Status update successfully.',
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}