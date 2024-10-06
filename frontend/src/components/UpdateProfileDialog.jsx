import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { Loader } from 'lucide-react'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading,setLoading] = useState(false);


    const {user}= useSelector(store=>store.auth);
    const [input,setInput] = useState({
        fullname:user?.fullname,
        email:user?.email,
        phoneNumber:user?.phoneNumber,
        bio:user?.profile?.bio,
        skills:user?.profile?.skills?.map(skill=>skill),
        file:user?.profile?.resume
    });

    const dispatch = useDispatch();
    const changeEventHandler = (e)=>{
        setInput({...input,[e.target.name]:e.target.value});
    }

    const fileChangeHandle = (e)=>{
        const file = e.target.files?.[0];
        setInput({...input,file})
    }

    const submitHandler = async (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname",input.fullname);
        formData.append("email",input.email);
        formData.append("phoneNumber",input.phoneNumber);
        formData.append("bio",input.bio);
        formData.append("skills",input.skills);
        
        console.log(input)
        if(input.file){
            formData.append("file",input.file);
        }

        try{

            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`,formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                },
                withCredentials:true
            });
            if(res.data.success){
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        }catch(error){
            console.log(error);
            toast.error(error.response.data.message);
        }finally{
            setLoading(false);
        }
        setOpen(false);
    }
    return (
        <div>
            <Dialog open={open}>
                
                <DialogContent className='sm:max-w-[425px]' onInteractOutside={()=>{setTimeout(()=>{setOpen(false);},125);}}>
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className="grid gap-4 py-4">
                            <div className='grid grid-cols-4 items-center gap-4'>

                                <Label htmlFor='fullname' className=''>Full Name</Label>
                                <Input onChange={changeEventHandler} type='text' id='fullname' name='fullname' placeholder={user?.fullname} value={input.fullname} className='col-span-3' />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>

                                <Label htmlFor='email' className=''>Email</Label>
                                <Input onChange={changeEventHandler} type='email' id='email' name='email' placeholder={user?.email} value={input.email} className='col-span-3' />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>

                                <Label htmlFor='phoneNumber' className=''>Phone-Number</Label>
                                <Input onChange={changeEventHandler} id='phoneNumber' name='phoneNumber' value={input.phoneNumber} placeholder={user?.phoneNumber} className='col-span-3' />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>

                                <Label htmlFor='bio' className=''>Bio</Label>
                                <Input onChange={changeEventHandler} id='bio' name='bio' placeholder={user?.bio} value={input.bio} className='col-span-3' />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>

                                <Label htmlFor='skills' className=''>Skills</Label>
                                <Input onChange={changeEventHandler} id='skills' name='skills' value={input.skills} className='col-span-3' />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>

                                <Label htmlFor='file' className=''>Resume</Label>
                                <Input id='file' onChange={fileChangeHandle} name='file' type='file'  accept='application/pdf' className='col-span-3' />
                            </div>
                        </div>
                        <DialogFooter>
                            {
                                loading ? <Button className='w-full my-4'><Loader className='mr-2 h-4 animate-spin'/>Please Wait</Button> : <Button type="submit" className='w-full my-4'>Update</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog
