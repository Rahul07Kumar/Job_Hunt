import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {

    useGetAllCompanies();
    const [input,setInupt]= useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setSearchCompanyByText(input));
    },[input])
    return (
        <div>
            <Navbar />
            <div className="max-w-6xl mx-auto my-10 ">
                <div className='flex justify-between items-center my-5'>
                    <Input className='w-fit' onChange={(e)=>setInupt(e.target.value)} placeholder='Filter by name' />
                    <Button onClick={()=> navigate("/admin/companies/create") }>New Company</Button>
                </div>
                <CompaniesTable/>
            </div>
        </div>
    )
}

export default Companies
