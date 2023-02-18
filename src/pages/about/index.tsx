import { Flavors } from '@next/font/google';
import React, { useEffect, useState } from 'react';
import Select from "react-select";

const AboutUs: React.FC = () => {
  const [object, setObject] = useState<any>({ name: 'navbar', company: 'abc', country: 'sweden',language:'swedish',city:'STK' });
  const [countries, setCountries] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [languages, setLanguage] = useState<any[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<any[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<any[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<any[]>([]);


  const findSelectedOption = (options: any[], label: string) => {
    return options.find(option => option.label === label);
  };
  
  useEffect(() => {
    try{
      setCountries([{ label: 'sweden', value: 'SE',id:2 }, { label: 'Norway', value: 'NR' ,id:4}])
      setCompanies([{ label: 'abc', value: 'stockholm' ,id:3}, { label: 'BC', value: 'oslo',id:1 }]);
      setLanguage([{ label: 'english', value: 'eng' ,id:3}, { label: 'swedish', value: 'swedish',id:1 }]);
    } catch(error) {
      console.log(error)
    }
  }, []);
  
  useEffect(() => {
    setSelectedCompanies(findSelectedOption(companies, object.company));
    setSelectedCountries(findSelectedOption(countries, object.country));
    setSelectedLanguages(findSelectedOption(languages, object.language));

  }, [countries, companies, languages, object]);

  useEffect(()=>{
    const brand= {name:'tibbat',country:'BD', flavours:[{name:'rd',fruit_id:2, fruit_from:'north'},{name:'fr',fruit_id:5, fruit_from:'south'},{name:'te',fruit_id:8, fruit_from:'west'}]}
    const fruit ={id:2,name:'jam', place:'east'}
    const isFruit = brand.flavours.some((flavour:any)=> flavour.fruit_id === fruit.id )? fruit:'no match found' 
    console.log(isFruit)
  },[])

  const handleChange=(e:any)=>{
    const {name,value}=e.target
    setObject({...object,[name]:value})
  }

  return (
    <>
    <div className="p-10 bg-green-500  text-slate-900">
        <input type="text" className='form-control' name='name' value={object.name} onChange={handleChange}/>
      </div>
      <div className="p-10 bg-green-500  text-slate-900">
        <input type="text" className='form-control' name='city' value={object.city} onChange={handleChange}/>
      </div>
      <div className="p-10 bg-green-500  text-slate-900">
        <Select
          name="company"
          value={selectedCompanies}
          options={companies}
          onChange={(selectedOption) => setSelectedCompanies(selectedOption)}
        />
      </div>

      <div className="p-10 bg-green-500 text-slate-900">
        <Select
          name="country"
          value={selectedCountries}
          options={countries}
          onChange={(selectedOption) => setSelectedCountries(selectedOption)}
         
        />
      </div>
      <div className="p-10 bg-green-500 text-slate-900">
        <Select
          name="language"
          value={selectedLanguages}
          options={languages}
          onChange={(selectedOption) => setSelectedLanguages(selectedOption)}
         
        />
      </div>
    </>
  );

};

export default AboutUs;
