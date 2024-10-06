import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select'
import { SelectGroup, SelectValue } from '@radix-ui/react-select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const companyArray = [];
const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    compannyID: ""
  });
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector(store => store.company)
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find((company)=> company.name.toLowerCase() === value);
    setInput({...input, companyId:selectedCompany._id});
};


  const submitHandler = async(e)=>{
    e.preventDefault();
    console.log(input);
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`,input,{
        headers:{
          'Content-Type':'application/json'
        },
        withCredentials:true
      });
      if(res.data.success){
        toast.success(res.data.message);
        navigate("/admin/jobs")
      }
      
      
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error);
    }
    finally{
      setLoading(false);
    }
  }


  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Title</Label>
              <Input type='text' name='title' value={input.title} onChange={changeEventHandler} className='focus-visible:ring-offset-0 focus-visible:right-0 my-1' />
            </div>
            <div>
              <Label>Description</Label>
              <Input type='title' name='description' value={input.description} onChange={changeEventHandler} className='focus-visible:ring-offset-0 focus-visible:right-0 my-1' />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input type='text' name='requirements' value={input.requirements} onChange={changeEventHandler} className='focus-visible:ring-offset-0 focus-visible:right-0 my-1' />
            </div>
            <div>
              <Label>Salary (LPA) </Label>
              <Input type='text' name='salary' value={input.salary} onChange={changeEventHandler} className='focus-visible:ring-offset-0 focus-visible:right-0 my-1' />
            </div>
            <div>
              <Label>Location</Label>
              <Input type='text' name='location' value={input.location} onChange={changeEventHandler} className='focus-visible:ring-offset-0 focus-visible:right-0 my-1' />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input type='text' name='jobType' value={input.jobType} onChange={changeEventHandler} className='focus-visible:ring-offset-0 focus-visible:right-0 my-1' />
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input type='text' name='experience' value={input.experience} onChange={changeEventHandler} className='focus-visible:ring-offset-0 focus-visible:right-0 my-1' />
            </div>
            <div>
              <Label>No of Positions</Label>
              <Input type='number' name='position' value={input.position} onChange={changeEventHandler} className='focus-visible:ring-offset-0 focus-visible:right-0 my-1' />
            </div>
            {
              companies.length > 0 && (
                <Select onValueChange={selectChangeHandler} >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      companies.map((company)=>{
                        return (
                          <SelectItem value={company?.name.toLowerCase()}>{company.name}</SelectItem>
                        )
                      })
                    }
                  </SelectContent>
                </Select>
              )
            }
          </div>

          {
            loading ? <Button className='w-full my-4'><Loader2 className='mr-2 h-4 animate-spin' />Please wait</Button> : <Button type="submit" className='w-full my-4'>Post New Job</Button>
          }
          {
            companies.length == 0 && <p className='text-xs text-red-600 font-bold text-center my-3'>*Please register company first , before posting job.</p>
          }
        </form>
      </div>
    </div>
  )
}

export default PostJob
