import React from 'react'
import {useState, useEffect} from 'react'
import {useForm} from 'react-hook-form'

const HookForm = () => {
  const {register, handleSubmit} = useForm();
  const [city, setCity] = useState('');

  const getCity = async () => {
    fetch('./province.json')
    .then(response => response.json())
    .then(data => {
      Object.values(data).forEach(element => {
        const new_option = document.createElement("option");
        new_option.value = element.name_with_type;
        new_option.textContent = element.name_with_type;
        document.getElementById("city").appendChild(new_option);
      });
    })
    .catch(error => {
      console.error('Error fetching city data:', error);
    });
  }
  getCity();

  useEffect(() => {
    console.log("balls");
    fetch('./ward.json')
    .then(response => response.json())
    .then(data => {
      document.getElementById("ward").innerHTML = "";
      Object.values(data).forEach(element => {
        if(!element.path_with_type.includes(city)) {
          return;
        }
        const new_option = document.createElement("option");
        new_option.value = element.name_with_type;
        new_option.textContent = element.name_with_type;
        document.getElementById("ward").appendChild(new_option);
      });
    }
    ).catch(error => {console.log(error)});
  }, [city]);

  const onSubmit = () => alert("nice");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className = "flex flex-col w-[50vw] h-[600px] bg-white justify-around text-left">
      <label className = "-mb-8 text-black" htmlFor="house-number">House Number</label>
      <input {...register("house-number", {required: "House number can't be empty!"})} placeholder="Enter your house number..." id = "house-number" className = "p-4 rounded-md h-[10%] border-2 border-black"/>

      <label className = "-mb-8 text-black" htmlFor="street">Street</label>
      <input {...register("street", {required: "House number can't be empty!"})} placeholder='Enter your street...' id = "street" className = "p-4 rounded-md h-[10%] border-2 border-black"/>

      <label className = "-mb-8 text-black" htmlFor="city">City</label>
      <select {...register("city")} onChange = {e => (setCity(e.target.value))} id = "city" className = "p-4 rounded-md h-[10%] border-2 border-black"/>

      <label className = "-mb-8 text-black" htmlFor="ward">Ward</label>
      <select {...register("ward")} id = "ward" className = "p-4 rounded-md h-[10%] border-2 border-black"/>

      <button className = "h-[10%] bg-blue-500 text-white px-4 py-2 rounded mt-4" type="submit">Submit</button>
    </form>
  )
}

export default HookForm